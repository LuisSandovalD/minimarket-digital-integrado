// ========================================
// repositories/sale-cancel.repository.js
// ========================================

const prisma = require("../../../prisma/client");

module.exports = {

  // ========================================
  // GET DETAILS BY SALE ID
  // ========================================
  getBySaleId: async (saleId, tx = prisma) => {
    return tx.saleDetail.findMany({
      where: {
        saleId: Number(saleId),
      },
    });
  },

  // ========================================
  // CANCEL SALE
  // ========================================
  cancelSale: async (id, tx = prisma) => {
    return tx.sale.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "CANCELLED", // Mantén el mismo string que use tu Enum de Prisma ("CANCELLED" o "ANULADO")
      },
    });
  },

  // ========================================
  // REFUND / CANCEL PAYMENTS
  // ========================================
  refundPayments: async (saleId, tx = prisma) => {
    const targetSaleId = Number(saleId);

    // 1. Convertir pagos ejecutados (Efectivo/Tarjeta) en Reembolsados
    await tx.payment.updateMany({
      where: {
        saleId: targetSaleId,
        status: "COMPLETED",
      },
      data: {
        status: "REFUNDED",
      },
    });

    // 2. Convertir plazos de crédito pendientes en Cancelados/Anulados
    await tx.payment.updateMany({
      where: {
        saleId: targetSaleId,
        status: "PENDING",
      },
      data: {
        status: "CANCELLED",
      },
    });

    return true;
  },

  // ========================================
  // RESTORE STOCK (Método optimizado nativo)
  // ========================================
  restoreStock: async (details, tx = prisma) => {
    for (const detail of details) {
      await tx.product.update({
        where: {
          id: Number(detail.productId),
        },
        data: {
          stock: {
            increment: Number(detail.quantity),
          },
        },
      });
    }
  },
};