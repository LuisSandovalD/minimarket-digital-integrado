const read = require("./user.read.service");
const write = require("./user.write.service");
module.exports = {
  ...read,
  ...write,
};
