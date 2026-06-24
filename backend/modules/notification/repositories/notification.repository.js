// ========================================
// modules/notification/repositories/notification.repository.js
// ========================================

const prisma = require("../../../prisma/client");

class NotificationRepository {
  /**
   * Obtiene la foto completa de inventarios, lotes y relaciones de la empresa
   * @param {string|number} companyId - ID de la empresa del usuario en sesión
   * @returns {Promise<Array>} Listado de inventarios estructurado
   */
  async getProductsForNotifications(companyId) {
    return prisma.inventory.findMany({
      where: {
        companyId: Number(companyId),
        product: {
          isDeleted: false,
          isActive: true,
        },
      },
      select: {
        id: true,
        stock: true,
        reservedStock: true,
        damagedStock: true,
        branchId: true,
        lastUpdated: true,
        product: {
          select: {
            id: true,
            name: true,
            sku: true,
            minStock: true,
            trackBatches: true,
            batches: {
              where: {
                isActive: true,
                expirationDate: {
                  gte: new Date(),
                },
              },
              select: {
                id: true,
                batchNumber: true,
                expirationDate: true,
                currentQuantity: true,
              },
            },
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        stock: "asc",
      },
    });
  }
}

module.exports = {
  NotificationRepository,
};