// ========================================
// controllers/sale.controller.js
// ========================================

module.exports = {

  ...require("./create-sale.controller"),

  ...require("./get-sales.controller"),

  ...require("./update-sale.controller"),

  ...require("./cancel-sale.controller"),

  ...require("./register-payment.controller"),

  // 🔥 NUEVOS: Conectamos los archivos que acabamos de crear
  ...require("./get-sale-payments.controller"),
  ...require("./return-sale.controller"),

  ...require("./report-sale.controller"),

};