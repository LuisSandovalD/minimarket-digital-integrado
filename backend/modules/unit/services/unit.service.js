const read = require("./unit.service.read");
const write = require("./unit.service.write");

module.exports = {
  ...read,
  ...write,
};
