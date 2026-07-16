// ========================================
// controllers/product.controller.js
// ========================================

module.exports = {

  // QUERIES

  ...require("./product-query.controller"),

  // CREATE

  ...require("./product-create.controller"),

  // UPDATE

  ...require("./product-update.controller"),

  // DELETE

  ...require("./product-delete.controller"),

  // STOCK

  ...require("./product-stock.controller"),
};
