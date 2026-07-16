const read = require("./supplier.read.repository");
const write = require("./supplier.write.repository");
module.exports = {
  ...read,
  ...write,
};
