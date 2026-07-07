const read = require("./company.repository.read");
const write = require("./company.repository.write");

module.exports = {
  ...read,
  ...write,
};