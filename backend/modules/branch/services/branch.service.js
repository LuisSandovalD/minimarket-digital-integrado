const read = require("./branch.service.read");
const write = require("./branch.service.write");

module.exports = {
  ...read,
  ...write,
};
