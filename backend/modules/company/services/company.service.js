const read = require("./company.service.read");
const write = require("./company.service.write");

module.exports = {
  ...read,
  ...write,
};
