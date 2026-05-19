// ========================================
// controllers/auth.controller.js
// ========================================

const loginController =
  require("./login.controller");

const registerController =
  require("./register.controller");

const profileController =
  require("./profile.controller");

const sessionController =
  require("./session.controller");

module.exports = {

  // LOGIN
  login:
    loginController.login,

  // REGISTER
  register:
    registerController.register,

  // PROFILE
  me:
    profileController.me,

  // SESSION
  logout:
    sessionController.logout,

};