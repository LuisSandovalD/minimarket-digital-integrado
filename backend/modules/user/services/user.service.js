// ========================================
// services/user/user.service.js
// ========================================

module.exports = {

  // GET
  ...require("./get-users.service"),

  // CREATE
  ...require("./create-user.service"),

  // UPDATE
  ...require("./update-user.service"),

  // DELETE
  ...require("./delete-user.service"),

  // RESTORE
  ...require("./restore-user.service"),

  // TOGGLE
  ...require("./toggle-user-status.service"),

  // HIERARCHY
  ...require("./hierarchy-user.service"),

};