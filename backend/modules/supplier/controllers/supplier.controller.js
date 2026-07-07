const crudController = require("./supplier.crud.controller");
const exportController = require("./supplier.export.controller");

module.exports = {
  ...crudController,
  ...exportController,
};