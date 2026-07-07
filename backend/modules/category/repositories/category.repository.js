const read = require("./category.repository.read");
const write = require("./category.repository.write");

module.exports = {
  ...read,
  ...write,
};