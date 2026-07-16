const read = require("./account.repository.read");
const write = require("./account.repository.write");

module.exports = {
  ...read,
  ...write,
};
