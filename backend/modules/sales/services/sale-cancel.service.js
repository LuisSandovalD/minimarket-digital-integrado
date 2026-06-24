// ========================================
// services/sale-cancel.service.js
// ========================================

const prisma = require("../../../prisma/client");

const {
  cancelSale,
  refundPayments,
  getBySaleId,
} = require("../repositories/sale.repository");

const {
  increaseStock,
} = require("../../inventory/repositories/inventory.repository");

module.exports = {

  // ========================================
  // CANCEL SALE (CON REVERSIÓN DE STOCK Y AJUSTE DE DEUDA)
  // ========================================

  cancelSaleService: async (id) => {
    return prisma.$transaction(
      async (tx) => {

        // ========================================
        // 1. VERIFICAR EXISTENCIA Y ESTADO DE LA VENTA
        // ========================================
        const sale = await tx.sale.findUnique({
          where: { id: Number(id) },
          include: { payments: true }
        });

        if (!sale) {
          throw new Error("La venta que intenta anular no existe.");
        }

        if (sale.status === "CANCELLED" || sale.status === "ANULADO") {
          throw new Error("Esta venta ya se encuentra anulada en el sistema.");
        }

        // ========================================
        // 2. OBTENER DETALLES Y DEVOLVER STOCK AL ALMACÉN
        // ========================================
        const details = await getBySaleId(id);

        for (const item of details) {
          await increaseStock(
            Number(item.productId),
            Number(item.quantity),
            tx
          );
        }

        // ========================================
        // 3. REVERSAR DEUDA DEL CLIENTE (SI ERA CRÉDITO)
        // ========================================
        if (sale.status === "CREDIT_PENDING" && sale.customerId) {
          // Calculamos cuánta deuda real generó esta venta originalmente
          const creditAmountToRevert = sale.payments
            .filter(p => p.status === "PENDING")
            .reduce((sum, p) => sum + Number(p.amount), 0);

          if (creditAmountToRevert > 0) {
            // Descontamos la deuda del perfil del cliente de manera atómica
            await tx.customer.update({
              where: { id: Number(sale.customerId) },
              data: {
                currentDebt: {
                  decrement: creditAmountToRevert
                }
              }
            });
          }
        }

        // ========================================
        // 4. ANULAR CABECERA DE LA VENTA
        // ========================================
        await cancelSale(
          id,
          tx
        );

        // ========================================
        // 5. REEMBOLSAR / CANCELAR LOS REGISTROS DE PAGO
        // ========================================
        await refundPayments(
          id,
          tx
        );

        return {
          success: true,
          message: "Venta anulada correctamente. Stock y cuentas corrientes actualizados."
        };
      },
      {
        maxWait: 10000,
        timeout: 20000,
      }
    );
  },
};