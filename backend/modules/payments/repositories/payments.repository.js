const read = require("./payments.repository.read");
const write = require("./payments.repository.write");

module.exports = {
    ...read,
    ...write,
};