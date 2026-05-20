// ========================================
// services/user/restore-user.service.js
// ========================================

const repository =
  require("../repositories/user.repository");

// ========================================
// RESTORE USER
// ========================================

const restoreUser = async (
  id,
  companyId
) => {

  return repository.restore(

    id,

    companyId

  );

};

module.exports = {

  restoreUser,

};