// ========================================
// services/sale-update.service.js
// ========================================

const prisma = require("../../../prisma/client");

const {
  updateSale,
  deleteDetailsBySale,
  createManyDetails,
  getBySaleId, // Asegúrate de que acepte 'tx' en su definición interna
} = require("../repositories/sale.repository");

const {
  increaseStock,
  decreaseStockByProduct,
} = require("../../inventory/repositories/inventory.repository");

module.exports = {

  // ========================================
  // UPDATE SALE (CON RECUPERACIÓN DE STOCK Y RECALCULO DE FINANZAS)
  // ========================================
  updateSaleService: async (id, body) => {
    // Manejo seguro del ID de la venta
    const saleId = Number(id);

    return prisma.$transaction(
      async (tx) => {

        // ========================================
        // 1. VERIFICAR EXISTENCIA Y ESTADO DE LA VENTA ORIGINAL
        // ========================================
        const originalSale = await tx.sale.findUnique({
          where: { id: saleId },
          include: {
            payments: true,
            details: true
          }
        });

        if (!originalSale) {
          throw new Error("La venta que intenta actualizar no existe.");
        }

        if (originalSale.status === "CANCELLED" || originalSale.status === "ANULADO") {
          throw new Error("No se puede modificar una venta que ya ha sido anulada o cancelada.");
        }

        // ========================================
        // 2. REVERTIR STOCK ANTERIOR (Dentro de la transacción 'tx')
        // ========================================
        // Usamos directamente originalSale.details extraído de forma atómica
        for (const oldItem of originalSale.details) {
          await increaseStock(
            Number(oldItem.productId),
            Number(oldItem.quantity),
            tx // 🔥 Es imperativo transferir 'tx' para evitar fugas de datos
          );
        }

        // ========================================
        // 3. CÁLCULO DE TOTALES FINANCIEROS (Modelo Base Gravable)
        // ========================================
        // Asumiendo que el precio enviado ya incluye IGV (Estándar de Comercio/POS)
        const totalBruto = body.details.reduce((acc, item) => {
          return acc + (Number(item.quantity) * Number(item.price));
        }, 0);

        const discount = Number(body.discount || 0);
        const total = parseFloat((totalBruto - discount).toFixed(2));

        // Desglose del IGV (18%) a partir del total final neto
        const subtotal = parseFloat((total / 1.18).toFixed(2));
        const tax = parseFloat((total - subtotal).toFixed(2));

        const saleStatus = body.status || originalSale.status;

        // ========================================
        // 4. CONTROL DE CUENTA CORRIENTE DE CLIENTES (CRÉDITOS)
        // ========================================
        if (originalSale.customerId) {
          // 1. Calculamos la deuda real anterior indexada como pendiente
          const oldCreditAmount = originalSale.payments
            .filter(p => p.status === "PENDING")
            .reduce((sum, p) => sum + Number(p.amount), 0);

          // 2. Calculamos la nueva propuesta de deuda
          let newCreditAmount = 0;
          if (saleStatus === "CREDIT_PENDING") {
            newCreditAmount = Array.isArray(body.payments)
              ? body.payments.filter(p => p.status === "PENDING").reduce((sum, p) => sum + Number(p.amount), 0)
              : total;
          }

          const debtDifference = parseFloat((newCreditAmount - oldCreditAmount).toFixed(2));

          if (debtDifference !== 0) {
            const customer = await tx.customer.findUnique({
              where: { id: Number(originalSale.customerId) }
            });

            if (customer) {
              const potentialDebt = Number(customer.currentDebt) + debtDifference;

              // Validar que el cliente no exceda su línea de crédito asignada
              if (customer.creditLimit && potentialDebt > Number(customer.creditLimit)) {
                throw new Error(`Crédito Excedido: La modificación elevaría la deuda a S/. ${potentialDebt.toFixed(2)}, superando el límite de S/. ${Number(customer.creditLimit).toFixed(2)}.`);
              }

              // Actualización atómica del saldo en cuenta corriente
              await tx.customer.update({
                where: { id: customer.id },
                data: { currentDebt: { increment: debtDifference } }
              });
            }
          }
        }

        // ========================================
        // 5. ACTUALIZAR CABECERA DE LA VENTA (SALE)
        // ========================================
        const updatedSale = await tx.sale.update({
          where: { id: saleId },
          data: {
            customerId: body.customerId ? Number(body.customerId) : originalSale.customerId,
            subtotal,
            tax,
            discount,
            total,
            notes: body.notes || originalSale.notes,
            status: saleStatus
          }
        });

        // ========================================
        // 6. PURGAR Y RENOVAR DESGLOSE DE ARTÍCULOS
        // ========================================
        await tx.saleDetail.deleteMany({
          where: { saleId: saleId }
        });

        const detailsData = body.details.map((item) => {
          const itemTotal = Number(item.quantity) * Number(item.price);
          const itemSubtotal = parseFloat((itemTotal / 1.18).toFixed(2));
          const itemTax = parseFloat((itemTotal - itemSubtotal).toFixed(2));

          return {
            saleId: saleId,
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            price: Number(item.price),
            subtotal: itemSubtotal,
            discount: 0.00,
            tax: itemTax
          };
        });

        await tx.saleDetail.createMany({
          data: detailsData
        });

        // ========================================
        // 7. DESCARGAR NUEVO STOCK DEL ALMACÉN
        // ========================================
        for (const item of body.details) {
          await decreaseStockByProduct(
            Number(item.productId),
            Number(item.quantity),
            tx // 🔥 Es obligatorio el uso de 'tx'
          );
        }

        // ========================================
        // 8. CONTROL DE FLUJO DE PAGOS / COMPROBANTES
        // ========================================
        if (Array.isArray(body.payments) && body.payments.length > 0) {
          // Evitamos destruir pagos ya conciliados ("COMPLETED") si no es estrictamente necesario,
          // pero para consistencia del rediseño de cuotas, limpiamos el flujo previo
          await tx.payment.deleteMany({
            where: { saleId: saleId }
          });

          const newPayments = body.payments.map(payment => {
            const isCredit = payment.status === "PENDING";
            return {
              saleId: saleId,
              amount: Number(payment.amount),
              status: payment.status || "COMPLETED",
              paymentMethod: Number(payment.paymentMethodId || 1),
              reference: payment.reference || (isCredit ? "REAJUSTE-CREDITO" : "REAJUSTE-EFECTIVO"),
              notes: payment.notes || "Pago recalculado por modificación de venta.",
              paidAt: isCredit ? null : new Date(),
              dueDate: payment.dueDate ? new Date(payment.dueDate) : null
            };
          });

          await tx.payment.createMany({
            data: newPayments
          });
        }

        return updatedSale;
      },
      {
        maxWait: 8000,  // Tiempo máximo de espera para adquirir conexión (8s)
        timeout: 15000, // Tiempo límite de ejecución de las queries bloqueantes (15s)
      }
    );
  },
};