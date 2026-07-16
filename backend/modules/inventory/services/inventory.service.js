// ========================================
// services/inventory.service.js
// ========================================

module.exports = {

  // QUERIES

  ...require("./inventory-query.service"),

  // STOCK

  ...require("./inventory-stock.service"),

  // MOVEMENTS

  ...require("./inventory-movement.service"),

  // TRANSFERS

  ...require("./inventory-transfer.service"),

  // ALERTS

  ...require("./inventory-alert.service"),

  // HISTORY

  ...require("./inventory-history.service"),

  // METRICS

  ...require("./inventory-metrics.service"),

  // VALIDATIONS

  ...require("./inventory-validation.service"),
};
