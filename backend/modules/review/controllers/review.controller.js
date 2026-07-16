const crud = require("./review.crud.controller");
const custom = require("./review.custom.controller");

module.exports = {
  ...crud,
  ...custom,
};
