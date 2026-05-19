// ========================================
// repositories/auth.repository.js
// ========================================

const userRepository =
  require("./user.repository");

const companyRepository =
  require("./company.repository");

const branchRepository =
  require("./branch.repository");

const sessionRepository =
  require("./session.repository");

module.exports = {

  // USER
  findUserByEmail:
    userRepository.findUserByEmail,

  findUserById:
    userRepository.findUserById,

  createUser:
    userRepository.createUser,

  // COMPANY
  findCompanyByName:
    companyRepository.findCompanyByName,

  findCompanyBySlug:
    companyRepository.findCompanyBySlug,

  createCompany:
    companyRepository.createCompany,

  // BRANCH
  createBranch:
    branchRepository.createBranch,

  // SESSION
  updateLastLogin:
    sessionRepository.updateLastLogin,

  updateLogout:
    sessionRepository.updateLogout,

};