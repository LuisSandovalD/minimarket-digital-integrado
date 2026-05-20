// ========================================
// services/user/get-users.service.js
// ========================================

const repository =
  require("../repositories/user.repository");

// ========================================
// GET USERS
// ========================================

const getUsers = async (
  companyId
) => {

  return repository.findAll(
    companyId
  );

};

// ========================================
// GET USER BY ID
// ========================================

const getUserById = async (
  id,
  companyId
) => {

  return repository.findById(
    id,
    companyId
  );

};

module.exports = {

  getUsers,
  getUserById,

};