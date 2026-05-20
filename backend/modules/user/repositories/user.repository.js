// ========================================
// repositories/user.repository.js
// ========================================

module.exports = {

  ...require("./user.find-all.repository"),
  ...require("./user.find-by-id.repository"),
  ...require("./user.find-hierarchy.repository"),
  ...require("./user.find-by-manager.repository"),

  ...require("./user.create.repository"),
  ...require("./user.update.repository"),
  ...require("./user.toggle-status.repository"),
  ...require("./user.soft-delete.repository"),
  ...require("./user.restore.repository"),

};