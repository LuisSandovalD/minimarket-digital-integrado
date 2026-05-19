// ========================================
// controllers/inventory.controller.js
// ========================================

module.exports = {

  // QUERIES

  ...require("./inventory-query.controller"),

  // STOCK

  ...require("./inventory-stock.controller"),

  // MOVEMENTS

  ...require("./inventory-movement.controller"),

  // TRANSFERS

  ...require("./inventory-transfer.controller"),

  // HISTORY

  ...require("./inventory-history.controller"),

  // METRICS

  ...require("./inventory-metrics.controller"),
};