// ========================================
// services/product.service.js
// ========================================

module.exports = {

  // QUERIES

  ...require("./product-query.service"),

  // CREATE

  ...require("./product-create.service"),

  // UPDATE

  ...require("./product-update.service"),

  // DELETE

  ...require("./product-delete.service"),

  // STOCK

  ...require("./product-stock.service"),
};