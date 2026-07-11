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

// IMPORTAMOS EL CLIENTE BASE DE CORREO
const { sendEmail } = require("../../../config/email.config");

module.exports = {
  createSaleService: async (body, user) => {
    console.time("🚀 TOTAL_PROCESS");

    const saleNumber = await generateSaleNumber();

    // Cálculo de montos en memoria RAM
    const subtotal = body.details.reduce(
      (acc, item) => acc + (Number(item.quantity) * Number(item.price)),
      0
    );
    const tax = parseFloat((subtotal * 0.18).toFixed(2));
    const discount = Number(body.discount || 0);
    const total = parseFloat((subtotal + tax - discount).toFixed(2));
    const saleStatus = body.status || "COMPLETED";

    // Creamos una variable para almacenar los datos del cliente necesarios para el correo
    let customerEmail = body.customerEmail || null;
    let customerName = "Cliente General";

    const transactionResult = await prisma.$transaction(
      async (tx) => {

        // ========================================
        // 1. CONTROL DE CRÉDITO Y DEUDA DEL CLIENTE
        // ========================================
        if (body.customerId) {
          const customer = await tx.customer.findUnique({
            where: { id: Number(body.customerId) }
          });

          if (!customer) {
            throw new Error("El cliente especificado no existe.");
          }

          if (!customer.isActive) {
            throw new Error("El cliente seleccionado se encuentra inactivo.");
          }

          // Rescatamos los datos informativos de la Base de Datos para el correo
          customerEmail = customer.email;
          customerName = customer.name;

          if (saleStatus === "CREDIT_PENDING") {
            const creditAmount = body.payments
              .filter(p => p.status === "PENDING")
              .reduce((sum, p) => sum + Number(p.amount), 0);

            const potentialDebt = Number(customer.currentDebt) + creditAmount;
            if (customer.creditLimit && potentialDebt > Number(customer.creditLimit)) {
              throw new Error(`Crédito insuficiente. La operación incrementaría la deuda a ${potentialDebt}, superando el límite de ${customer.creditLimit}.`);
            }

            if (creditAmount > 0) {
              await tx.customer.update({
                where: { id: customer.id },
                data: { currentDebt: { increment: creditAmount } }
              });
            }
          }
        } else if (saleStatus === "CREDIT_PENDING") {
          throw new Error("Para registrar una venta al crédito es obligatorio asociar un cliente (customerId).");
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
            status: saleStatus,
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
              remainingAmount: isCreditInstallment ? Number(payment.amount) : 0.00,
              status: payment.status || "COMPLETED",
              paymentMethodId: Number(payment.paymentMethodId),
              reference: payment.reference || (isCreditInstallment ? `CRÉDITO-${saleNumber}` : `INICIAL-${saleNumber}`),
              transactionId: `TX-SALE-${Math.floor(100000 + Math.random() * 900000)}`,
              notes: isCreditInstallment ? "Cuenta por cobrar generada por venta al crédito." : "Ingreso de caja por cuota inicial / pago contado.",
              paidAt: isCreditInstallment ? null : new Date(),
              dueDate: payment.dueDate ? new Date(payment.dueDate) : null
            };
          });

          await createManyPayments(sale.id, payments, tx);
        }

        return sale;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );

    console.timeEnd("🚀 TOTAL_PROCESS");

    const finalResponse = {
      ...transactionResult,
      invoice: {
        invoiceNumber: `FACT-${saleNumber.split('-')[2] || saleNumber}`,
        type: body.invoiceType || "NOTA_VENTA",
        total: transactionResult.total,
      },
    };

    // ========================================
    // 5.5 ENVÍO ASÍNCRONO DEL RECIBO POR EMAIL
    // ========================================
    if (customerEmail) {
      // Disparamos de forma segura fuera de la transacción de base de datos
      sendEmail({
        to: customerEmail,
        subject: `Tu comprobante de compra ${saleNumber} - ERP POS System`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #2563eb;">¡Gracias por tu compra, ${customerName}!</h2>
                <p>Te adjuntamos el resumen de tu transacción realizada con éxito:</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0;">
                    <p style="margin: 4px 0;"><strong>N° de Venta:</strong> ${saleNumber}</p>
                    <p style="margin: 4px 0;"><strong>Comprobante:</strong> ${finalResponse.invoice.type} (${finalResponse.invoice.invoiceNumber})</p>
                </div>
                <h3>Productos adquiridos:</h3>
                <ul>
                  ${body.details.map(item => `<li>Producto ID: ${item.productId} - Cantidad: ${item.quantity} x Price: $${item.price}</li>`).join('')}
                </ul>
                <h3 style="text-align: right; color: #1e293b; margin-top: 20px;">Total: <span style="color: #2563eb;">$${finalResponse.invoice.total}</span></h3>
                <br>
                <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                <small style="color: #64748b;">ERP POS System - Comprobante electrónico automatizado.</small>
            </div>
        `
      }).catch(emailError => {
        console.error("⚠️ Falló el envío de correo informativo al cliente:", emailError.message || emailError);
      });
    }

    return finalResponse;
  },
};