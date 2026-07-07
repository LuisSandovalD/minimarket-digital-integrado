const read = require("./user.read.repository");
const write = require("./user.write.repository");

module.exports = {
  ...read,
  ...write,
};