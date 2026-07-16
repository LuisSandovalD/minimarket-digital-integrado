const crud = require("./user.crud.controller");
const security = require("./user.security.controller");
const hierarchy = require("./user.hierarchy.controller");
module.exports = {
  ...crud,
  ...security,
  ...hierarchy,
};
