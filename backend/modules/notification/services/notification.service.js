// ========================================
// modules/notification/services/notification.service.js
// ========================================

const {
  addDays,
  isBefore,
  isAfter,
  differenceInDays,
} = require("date-fns");

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

  async getNotifications(companyId) {

    const inventories =
      await repository
        .getProductsForNotifications(
          companyId
        );

    const today =
      new Date();

    const next30Days =
      addDays(today, 30);

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

      const expirationDate =
        product.expirationDate
          ? new Date(
              product.expirationDate
            )
          : null;

      // ========================================
      // PRODUCT EXPIRED
      // ========================================

      if (
        expirationDate &&
        isBefore(
          expirationDate,
          today
        )
      ) {

        notifications.push({

          id:
            `expired-${inventory.id}`,

          type:
            "expired",

          priority:
            "high",

          title:
            `${product.name} venció`,

          message:
            `Producto vencido desde ${expirationDate.toLocaleDateString("es-ES")}`,

          description:
            `Venció el ${expirationDate.toLocaleDateString("es-ES")}`,

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

            expirationDate:
              product.expirationDate,

          },

          branch: {

            id:
              inventory.branch?.id,

            name:
              inventory.branch?.name,

          },

          timestamp:
            expirationDate.toISOString(),

          read: false,

          createdAt:
            expirationDate,

        });

      }

      // ========================================
      // PRODUCT EXPIRING SOON
      // ========================================

      else if (
        expirationDate &&
        isAfter(
          expirationDate,
          today
        ) &&
        isBefore(
          expirationDate,
          next30Days
        )
      ) {

        const diffDays =
          differenceInDays(
            expirationDate,
            today
          );

        notifications.push({

          id:
            `expiring-${inventory.id}`,

          type:
            "expiring",

          priority:
            "medium",

          title:
            `${product.name} por vencer`,

          message:
            `Vence en ${diffDays} días (${expirationDate.toLocaleDateString("es-ES")})`,

          description:
            `Vence en ${diffDays} días`,

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

            expirationDate:
              product.expirationDate,

          },

          branch: {

            id:
              inventory.branch?.id,

            name:
              inventory.branch?.name,

          },

          timestamp:
            expirationDate.toISOString(),

          read: false,

          createdAt:
            expirationDate,

        });

      }

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
            "Producto agotado - necesita reorden",

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

          read: false,

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
            `Quedan ${availableStock} unidades (mínimo: ${product.minStock || 5})`,

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

          read: false,

          createdAt:
            new Date(),

        });

      }

    }

    // ========================================
    // SORT PRIORITY
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
            (n) => [n.id, n]
          )
        ).values()
      );

    return uniqueNotifications;

  }

}

module.exports = {
  NotificationService,
};