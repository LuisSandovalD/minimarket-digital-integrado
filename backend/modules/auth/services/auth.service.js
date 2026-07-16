// ========================================
// services/auth/auth.service.js
// ========================================

module.exports = {

  ...require("./login.service"),

  ...require("./register.service"),

  ...require("./password.service"),

  ...require("./session.service"),

  ...require("./twofactor.service"),

  ...require("./token.service"),

};
