// ========================================
// repositories/product.repository.js
// ========================================

module.exports = {

  // QUERIES

  ...require("./product-query.repository"),

  // SEARCH

  ...require("./product-search.repository"),

  // MUTATIONS

  ...require("./product-mutation.repository"),

  // STOCK

  ...require("./product-stock.repository"),

  ...require("./product-barcode.repository")
};