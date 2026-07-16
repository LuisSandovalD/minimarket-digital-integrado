const read = require("./supplier.read.service");
const write = require("./supplier.write.service");
const remove = require("./supplier.delete.service");

module.exports = {
  ...read,
  ...write,
  ...remove,
};
