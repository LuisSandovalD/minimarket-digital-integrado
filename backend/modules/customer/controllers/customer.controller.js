const crud = require("./customer.crud.controller");
const reports = require("./customer-report.controller");

module.exports = {
  ...crud,
  ...reports,
};