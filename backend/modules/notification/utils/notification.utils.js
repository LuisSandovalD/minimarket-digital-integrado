// ========================================
// modules/notification/utils/notification.utils.js
// ========================================

const { PRIORITY_ORDER } = require("../constants/notification.constants");

/**
 * Calcula las unidades netas utilizables reales en un almacén.
 * @param {Object} inventory - Fila de Prisma
 * @returns {number} Stock neto disponible
 */
function calculateAvailableStock(inventory) {
  const stock = Number(inventory.stock || 0);
  const reserved = Number(inventory.reservedStock || 0);
  const damaged = Number(inventory.damagedStock || 0);
  return stock - reserved - damaged;
}

/**
 * Ordena un arreglo de notificaciones de mayor a menor prioridad (High -> Medium -> Low).
 * @param {Array} notifications
 * @returns {Array} Arreglo ordenado
 */
function sortByPriority(notifications) {
  return [...notifications].sort((a, b) => {
    const weightA = PRIORITY_ORDER[a.priority] || 0;
    const weightB = PRIORITY_ORDER[b.priority] || 0;
    return weightB - weightA;
  });
}

/**
 * Remueve elementos duplicados basándose en su ID único generado por las reglas de negocio.
 * @param {Array} notifications
 * @returns {Array} Arreglo limpio de colisiones
 */
function removeDuplicateNotifications(notifications) {
  const uniqueMap = new Map();
  for (const item of notifications) {
    uniqueMap.set(item.id, item);
  }
  return Array.from(uniqueMap.values());
}

module.exports = {
  calculateAvailableStock,
  sortByPriority,
  removeDuplicateNotifications,
};
