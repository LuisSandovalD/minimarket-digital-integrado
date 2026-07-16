const read = require("./review.repository.read");
const write = require("./review.repository.write");

module.exports = {
  ...read,
  ...write,
};
