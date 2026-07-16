const profile = require("./account-profile.controller");
const security = require("./account-security.controller");

module.exports = {
  ...profile,
  ...security,
};
