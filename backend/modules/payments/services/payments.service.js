const read = require("./payments.service.read");
const write = require("./payments.service.write");

module.exports = {
    ...read,
    ...write,
};