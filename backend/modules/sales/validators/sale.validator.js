// ========================================
// validators/sale.validator.js
// ========================================

module.exports = {

  ...require("./create-sale.validator"),

  ...require("./update-sale.validator"),

  ...require("./cancel-sale.validator"),

  ...require("./add-sale-payment.validator"), // 🔥 Agregado: El validador para tus abonos mixtos

};
