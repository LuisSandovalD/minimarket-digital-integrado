const read = require("./unit.repository.read");
const write = require("./unit.repository.write");

module.exports = {
  ...read,
  ...write,
};
