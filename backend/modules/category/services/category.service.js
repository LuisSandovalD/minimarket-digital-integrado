const read = require("./category.service.read");
const write = require("./category.service.write");

module.exports = {
  ...read,
  ...write,
};