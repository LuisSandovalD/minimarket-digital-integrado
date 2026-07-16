const read = require("./account.service.read");
const write = require("./account.service.write");

module.exports = {
  ...read,
  ...write,
};
