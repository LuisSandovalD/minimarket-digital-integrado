// ========================================
// services/user/delete-user.service.js
// ========================================

const repository =
  require("../repositories/user.repository");

// ========================================
// DELETE USER
// ========================================

const deleteUser = async (
  id,
  companyId
) => {

  return repository.softDelete(

    id,

    companyId

  );

};

module.exports = {

  deleteUser,

};