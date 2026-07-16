const crud = require("./company.crud.controller");
const users = require("./company.users.controller");

module.exports = {
  ...crud,
  ...users,
};
