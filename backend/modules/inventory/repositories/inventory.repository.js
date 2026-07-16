// ========================================
// repositories/inventory.repository.js
// ========================================

module.exports = {

  // QUERIES

  ...require("./inventory-query.repository"),

  // STOCK

  ...require("./inventory-stock.repository"),

  // MOVEMENTS

  ...require("./inventory-movement.repository"),

  // HISTORY

  ...require("./inventory-history.repository"),

  // TRANSFERS

  ...require("./inventory-transfer.repository"),

  // METRICS

  ...require("./inventory-metrics.repository"),
};
