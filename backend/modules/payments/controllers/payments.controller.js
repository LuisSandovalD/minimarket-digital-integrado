const crud = require("./payments.crud.controller");
const custom = require("./payments.custom.controller");
const report = require("./report-payments.controller");

module.exports = {
  ...crud,
  ...custom,
  ...report,

};
