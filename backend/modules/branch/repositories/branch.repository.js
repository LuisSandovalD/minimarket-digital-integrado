const read = require("./branch.repository.read");
const write = require("./branch.repository.write");

module.exports = {
  ...read,
  ...write,
};
