const { NotificationRepository } = require("../repositories/notification.repository");
const { NOTIFICATION_TYPES, PRIORITY_MAP, PRIORITIES } = require("../constants/notification.constants");
const {
  calculateAvailableStock,
  sortByPriority,
  removeDuplicateNotifications
} = require("../utils/notification.utils");

const repository = new NotificationRepository();

class NotificationService {
  async getNotifications(companyId) {
    const inventories = await repository.getProductsForNotifications(companyId);

    if (!Array.isArray(inventories)) {
      console.error("❌ Inventories no es un arreglo:", inventories);
      return [];
    }

    const notifications = [];

    for (const inventory of inventories) {
      const product = inventory?.product;

      if (!product) continue;

      const availableStock = calculateAvailableStock(inventory);
      const minStockLimit = Number(product.minStock || 5);

      // LOW STOCK
      if (availableStock <= minStockLimit) {
        notifications.push(
          this._buildNotificationStructure({
            id: `low-${inventory.id}`,
            type: NOTIFICATION_TYPES.LOW_STOCK,
            title: `${product.name} - Stock Crítico`,
            message:
              availableStock <= 0
                ? "Producto agotado por completo."
                : `Inventario bajo el mínimo (${availableStock} u. restantes)`,
            description: `El almacén de la sucursal "${inventory.branch?.name || "Principal"
              }" requiere reabastecimiento urgente.`,
            inventory,
            availableStock,
            minStockLimit,
          })
        );
      }

      // PURCHASE READY
      if (availableStock <= minStockLimit * 0.3) {
        notifications.push(
          this._buildNotificationStructure({
            id: `purchase-${inventory.id}`,
            type: NOTIFICATION_TYPES.PURCHASE_READY,
            title: `Generar Reorden: ${product.name}`,
            message:
              "Apto para consolidación en la siguiente orden de compra con proveedores.",
            description: `Sugerencia automática calculada para la sucursal "${inventory.branch?.name || "Principal"
              }".`,
            inventory,
            availableStock,
            minStockLimit,
          })
        );
      }

      // PRODUCTOS POR VENCER
      if (
        product.trackBatches &&
        Array.isArray(product.batches) &&
        product.batches.length > 0
      ) {
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        const expirationLimit = new Date(Date.now() + THIRTY_DAYS);

        for (const batch of product.batches) {
          if (
            batch?.expirationDate &&
            new Date(batch.expirationDate) <= expirationLimit
          ) {
            notifications.push(
              this._buildNotificationStructure({
                id: `exp-${batch.id}`,
                type: NOTIFICATION_TYPES.EXPIRING_PRODUCT,
                title: `Lote Próximo a Vencer - #${batch.batchNumber}`,
                message: `Vencimiento programado: ${new Date(
                  batch.expirationDate
                ).toLocaleDateString()}`,
                description: `Quedan ${batch.currentQuantity || 0
                  } unidades en riesgo en el lote seleccionado.`,
                inventory,
                availableStock,
                minStockLimit,
              })
            );
          }
        }
      }

      // INVENTORY MISMATCH
      if (
        Number(inventory.damagedStock || 0) >
        Number(inventory.stock || 0) * 0.15
      ) {
        notifications.push(
          this._buildNotificationStructure({
            id: `mismatch-${inventory.id}`,
            type: NOTIFICATION_TYPES.INVENTORY_MISMATCH,
            title: `Posible Descuadre / Mermas: ${product.name}`,
            message: `Alerta física: se registran ${inventory.damagedStock || 0
              } unidades en estado dañado.`,
            description: `Supera el umbral de tolerancia del negocio en "${inventory.branch?.name || "Principal"
              }".`,
            inventory,
            availableStock,
            minStockLimit,
          })
        );
      }
    }

    const uniqueNotifications =
      removeDuplicateNotifications(notifications);

    return sortByPriority(uniqueNotifications);
  }

  _buildNotificationStructure({
    id,
    type,
    title,
    message,
    description,
    inventory,
    availableStock,
    minStockLimit,
  }) {
    return {
      id,
      type,
      priority: PRIORITY_MAP[type] || PRIORITIES.LOW,
      title,
      message,
      description,
      product: {
        id: inventory.product.id,
        name: inventory.product.name,
        sku: inventory.product.sku,
        stock: availableStock,
        minStock: minStockLimit,
      },
      branch: {
        id: inventory.branch?.id,
        name: inventory.branch?.name,
      },
      timestamp: new Date().toISOString(),
      read: false,
      createdAt: new Date(),
    };
  }
}

module.exports = { NotificationService };