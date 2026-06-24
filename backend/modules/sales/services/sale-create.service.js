// ========================================
// services/sale-create.service.js
// ========================================
const prisma = require("../../../prisma/client");

const {
  createSale,
  createManyDetails,
  createManyPayments,
} = require("../repositories/sale.repository");

const {
  decreaseStockByProduct,
} = require("../../inventory/repositories/inventory.repository");

const {
  generateSaleNumber,
} = require("../helpers/generate-sale-number.helper");

module.exports = {
  createSaleService: async (body, user) => {
    console.time("🚀 TOTAL_PROCESS");

    // Generamos el número correlativo de la venta afuera para evitar bloqueos
    const saleNumber = await generateSaleNumber();

    // Cálculo de montos en memoria RAM
    const subtotal = body.details.reduce(
      (acc, item) => acc + (Number(item.quantity) * Number(item.price)),
      0
    );
    const tax = parseFloat((subtotal * 0.18).toFixed(2));
    const discount = Number(body.discount || 0);
    const total = parseFloat((subtotal + tax - discount).toFixed(2));

    // Determinar el estado de la venta basándonos en el body (por defecto COMPLETED)
    const saleStatus = body.status || "COMPLETED";

    return prisma.$transaction(
      async (tx) => {

        // ========================================
        // 1. CONTROL DE CRÉDITO Y DEUDA DEL CLIENTE
        // ========================================
        if (saleStatus === "CREDIT_PENDING") {
          if (!body.customerId) {
            throw new Error("Para registrar una venta al crédito es obligatorio asociar un cliente (customerId).");
          }

          // Obtener el cliente de forma atómica dentro de la transacción
          const customer = await tx.customer.findUnique({
            where: { id: Number(body.customerId) }
          });

          if (!customer) {
            throw new Error("El cliente especificado no existe.");
          }

          if (!customer.isActive) {
            throw new Error("El cliente seleccionado se encuentra inactivo.");
          }

          // Calculamos el monto total que se irá a cuenta por cobrar (status === PENDING)
          const creditAmount = body.payments
            .filter(p => p.status === "PENDING")
            .reduce((sum, p) => sum + Number(p.amount), 0);

          // Validar si excede el límite de crédito asignado
          const potentialDebt = Number(customer.currentDebt) + creditAmount;
          if (customer.creditLimit && potentialDebt > Number(customer.creditLimit)) {
            throw new Error(`Crédito insuficiente. La operación incrementaría la deuda a ${potentialDebt}, superando el límite de ${customer.creditLimit}.`);
          }

          // Incrementar la deuda del cliente de manera atómica
          if (creditAmount > 0) {
            await tx.customer.update({
              where: { id: customer.id },
              data: { currentDebt: { increment: creditAmount } }
            });
          }
        }

        // ========================================
        // 2. CREAR REGISTRO DE VENTA (SALE)
        // ========================================
        const sale = await createSale(
          {
            saleNumber,
            companyId: Number(user.companyId),
            branchId: Number(user.branchId),
            userId: Number(user.id),
            customerId: body.customerId ? Number(body.customerId) : null,
            subtotal,
            tax,
            discount,
            total,
            notes: body.notes || null,
            status: saleStatus, // 🔥 Dinámico: "COMPLETED" o "CREDIT_PENDING"
          },
          tx
        );

        // ========================================
        // 3. REGISTRAR DETALLES (SALEDETAIL)
        // ========================================
        const details = body.details.map(item => ({
          saleId: sale.id,
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          price: Number(item.price),
          subtotal: parseFloat((Number(item.quantity) * Number(item.price)).toFixed(2)),
          discount: 0.00,
          tax: 0.00
        }));

        await createManyDetails(details, tx);

        // ========================================
        // 4. DESCARGA DE INVENTARIO (SECUENCIAL)
        // ========================================
        for (const item of body.details) {
          await decreaseStockByProduct(
            Number(item.productId),
            Number(item.quantity),
            tx
          );
        }

        // ========================================
        // 5. REGISTRAR PAGOS / CUENTAS POR COBRAR
        // ========================================
        if (Array.isArray(body.payments) && body.payments.length > 0) {
          const payments = body.payments.map(payment => {
            const isCreditInstallment = payment.status === "PENDING";

            return {
              amount: Number(payment.amount),
              remainingAmount: isCreditInstallment ? Number(payment.amount) : 0.00, // 🔥 Saldo pendiente inicial si es crédito
              status: payment.status || "COMPLETED",
              paymentMethodId: Number(payment.paymentMethodId),
              reference: payment.reference || (isCreditInstallment ? `CRÉDITO-${saleNumber}` : `INICIAL-${saleNumber}`),
              transactionId: `TX-SALE-${Math.floor(100000 + Math.random() * 900000)}`,
              notes: isCreditInstallment ? "Cuenta por cobrar generada por venta al crédito." : "Ingreso de caja por cuota inicial / pago contado.",
              paidAt: isCreditInstallment ? null : new Date(), // 🔥 No tiene fecha de pago si sigue pendiente
              dueDate: payment.dueDate ? new Date(payment.dueDate) : null // 🔥 Fecha de vencimiento asignada
            };
          });

          await createManyPayments(sale.id, payments, tx);
        }

        console.timeEnd("🚀 TOTAL_PROCESS");

        // Retornamos la respuesta limpia simulando el comprobante integrado
        return {
          ...sale,
          invoice: {
            invoiceNumber: `FACT-${saleNumber.split('-')[2] || saleNumber}`,
            type: body.invoiceType || "NOTA_VENTA",
            total: sale.total,
          },
        };
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );
  },
};