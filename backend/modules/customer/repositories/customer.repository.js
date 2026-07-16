const read = require("./customer.repository.read");
const write = require("./customer.repository.write");

module.exports = {
  ...read,
  ...write,
};
