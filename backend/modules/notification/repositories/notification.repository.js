// ========================================
// modules/notification/repositories/notification.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

class NotificationRepository {

  // ========================================
  // GET PRODUCTS FOR NOTIFICATIONS
  // ========================================

  async getProductsForNotifications(
    companyId
  ) {

    return prisma.inventory.findMany({

      where: {

        companyId,

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

            category: {

              select: {

                id: true,

                name: true,

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