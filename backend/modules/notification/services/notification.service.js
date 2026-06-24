// ========================================
// modules/notification/services/notification.service.js
// ========================================

const { NotificationRepository } = require("../repositories/notification.repository");
const { NOTIFICATION_TYPES, PRIORITY_MAP, PRIORITIES } = require("../constants/notification.constants");
const {
  calculateAvailableStock,
  sortByPriority,
  removeDuplicateNotifications
} = require("../utils/notification.utils");

const repository = new NotificationRepository();

class NotificationService {
  /**
   * Procesa inventarios y logs para retornar notificaciones calculadas en tiempo real
   * @param {string|number} companyId - ID de la empresa en sesión
   * @returns {Promise<Array>} Notificaciones únicas listas para UI
   */
  async getNotifications(companyId) {
    const inventories = await repository.getProductsForNotifications(companyId);
    const notifications = [];

    // 1. EVALUACIÓN DE INVENTARIOS FÍSICOS POR SUCURSAL
    for (const inventory of inventories) {
      const product = inventory.product;
      if (!product) continue;

      const availableStock = calculateAvailableStock(inventory);
      const minStockLimit = Number(product.minStock || 5);

      // ESCENARIO A: LOW_STOCK (Stock Crítico / Agotados)
      if (availableStock <= minStockLimit) {
        notifications.push(this._buildNotificationStructure({
          id: `low-${inventory.id}`,
          type: NOTIFICATION_TYPES.LOW_STOCK,
          title: `${product.name} - Stock Crítico`,
          message: availableStock <= 0 ? "Producto agotado por completo." : `Inventario bajo el mínimo (${availableStock} u. restantes)`,
          description: `El almacén de la sucursal "${inventory.branch?.name || 'Principal'}" requiere reabastecimiento urgente.`,
          inventory,
          availableStock,
          minStockLimit
        }));
      }

      // ESCENARIO B: PURCHASE_READY (Listo para Compra / Umbral sugerido de reorden)
      if (availableStock <= minStockLimit * 0.3) {
        notifications.push(this._buildNotificationStructure({
          id: `purchase-${inventory.id}`,
          type: NOTIFICATION_TYPES.PURCHASE_READY,
          title: `Generar Reorden: ${product.name}`,
          message: "Apto para consolidación en la siguiente orden de compra con proveedores.",
          description: `Sugerencia automática calculada para la sucursal "${inventory.branch?.name || 'Principal'}".`,
          inventory,
          availableStock,
          minStockLimit
        }));
      }

      // ESCENARIO C: EXPIRING_PRODUCT (Monitoreo preventivo de fechas de lotes activos)
      if (product.trackBatches && product.batches && product.batches.length > 0) {
        const TIEMPO_30_DIAS = 30 * 24 * 60 * 60 * 1000;
        const fechaLimite = new Date(Date.now() + TIEMPO_30_DIAS);

        for (const batch of product.batches) {
          if (new Date(batch.expirationDate) <= fechaLimite) {
            notifications.push(this._buildNotificationStructure({
              id: `exp-${batch.id}`,
              type: NOTIFICATION_TYPES.EXPIRING_PRODUCT,
              title: `Lote Próximo a Vencer - #${batch.batchNumber}`,
              message: `Vencimiento programado: ${new Date(batch.expirationDate).toLocaleDateString()}`,
              description: `Quedan ${batch.currentQuantity || 0} unidades en riesgo en el lote seleccionado.`,
              inventory,
              availableStock,
              minStockLimit
            }));
          }
        }
      }

      // ESCENARIO D: INVENTORY_MISMATCH (Descuadre por mermas o daños excesivos)
      if (Number(inventory.damagedStock) > Number(inventory.stock) * 0.15) {
        notifications.push(this._buildNotificationStructure({
          id: `mismatch-${inventory.id}`,
          type: NOTIFICATION_TYPES.INVENTORY_MISMATCH,
          title: `Posible Descuadre / Mermas: ${product.name}`,
          message: `Alerta física: se registran ${inventory.damagedStock} unidades en estado dañado.`,
          description: `Supera el umbral de tolerancia del negocio en "${inventory.branch?.name || 'Principal'}".`,
          inventory,
          availableStock,
          minStockLimit
        }));
      }
    }

  }

  /**
   * Helper privado para estandarizar la payload de salida homogénea
   */
  _buildNotificationStructure({ id, type, title, message, description, inventory, availableStock, minStockLimit }) {
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