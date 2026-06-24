// ========================================
// repositories/sale-detail.repository.js
// ========================================

const prisma = require("../../../prisma/client");

module.exports = {

  // ========================================
  // CREATE DETAILS (Inserción Masiva)
  // ========================================
  createManyDetails: async (details, tx = prisma) => {
    return tx.saleDetail.createMany({
      data: details.map(item => ({
        saleId: Number(item.saleId),
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        price: Number(item.price),
        subtotal: Number(item.subtotal),
        discount: Number(item.discount || 0),
        tax: Number(item.tax || 0),
        batchId: item.batchId ? Number(item.batchId) : null,
      })),
    });
  },

  // ========================================
  // GET DETAILS (Con soporte para Transacciones)
  // ========================================
  getBySaleId: async (saleId, tx = prisma) => {
    return tx.saleDetail.findMany({
      where: {
        saleId: Number(saleId),
      },
      include: {
        product: true, // Útil para las previsualizaciones y comprobantes
      },
    });
  },

  // ========================================
  // DELETE DETAILS (Homologado para sale-update.service)
  // ========================================
  deleteDetailsBySale: async (saleId, tx = prisma) => {
    return tx.saleDetail.deleteMany({
      where: {
        saleId: Number(saleId),
      },
    });
  },
};