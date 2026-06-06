// ========================================
// modules/notification/services/notification.service.js
// ========================================

const {
  NotificationRepository,
} = require(
  "../repositories/notification.repository"
);

const repository =
  new NotificationRepository();

class NotificationService {

  // ========================================
  // GET NOTIFICATIONS
  // ========================================

  async getNotifications(
    companyId
  ) {

    const inventories =
      await repository.getProductsForNotifications(
        companyId
      );

    const notifications = [];

    // ========================================
    // LOOP INVENTORIES
    // ========================================

    for (const inventory of inventories) {

      const product =
        inventory.product;

      const availableStock =
        Number(inventory.stock || 0) -
        Number(inventory.reservedStock || 0) -
        Number(inventory.damagedStock || 0);

      // ========================================
      // OUT OF STOCK
      // ========================================

      if (
        availableStock <= 0
      ) {

        notifications.push({

          id:
            `out-stock-${inventory.id}`,

          type:
            "out_stock",

          priority:
            "high",

          title:
            `${product.name} sin stock`,

          message:
            "Producto agotado - necesita reposición",

          description:
            "Producto agotado",

          product: {

            id:
              product.id,

            name:
              product.name,

            sku:
              product.sku,

            stock:
              availableStock,

            minStock:
              product.minStock,

          },

          branch: {

            id:
              inventory.branch?.id,

            name:
              inventory.branch?.name,

          },

          timestamp:
            new Date().toISOString(),

          read:
            false,

          createdAt:
            new Date(),

        });

      }

      // ========================================
      // LOW STOCK
      // ========================================

      else if (

        availableStock > 0 &&

        availableStock <=
        Number(
          product.minStock || 5
        )

      ) {

        notifications.push({

          id:
            `low-stock-${inventory.id}`,

          type:
            "low_stock",

          priority:
            "medium",

          title:
            `${product.name} con stock bajo`,

          message:
            `Quedan ${availableStock} unidades (mínimo ${product.minStock || 5})`,

          description:
            `Quedan ${availableStock} unidades`,

          product: {

            id:
              product.id,

            name:
              product.name,

            sku:
              product.sku,

            stock:
              availableStock,

            minStock:
              product.minStock,

          },

          branch: {

            id:
              inventory.branch?.id,

            name:
              inventory.branch?.name,

          },

          timestamp:
            new Date().toISOString(),

          read:
            false,

          createdAt:
            new Date(),

        });

      }

    }

    // ========================================
    // PRIORITY SORT
    // ========================================

    const priorityOrder = {

      high: 3,

      medium: 2,

      low: 1,

    };

    notifications.sort(
      (a, b) =>
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
    );

    // ========================================
    // REMOVE DUPLICATES
    // ========================================

    const uniqueNotifications =
      Array.from(
        new Map(
          notifications.map(
            (notification) => [
              notification.id,
              notification,
            ]
          )
        ).values()
      );

    return uniqueNotifications;

  }

}

module.exports = {
  NotificationService,
};