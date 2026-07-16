const read = require("./review.read.service");
const write = require("./review.write.service");

module.exports = {
  ...read,
  ...write,
};
