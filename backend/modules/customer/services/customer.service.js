const read = require("./customer.service.read");
const write = require("./customer.service.write");

module.exports = {
  ...read,
  ...write,
};
