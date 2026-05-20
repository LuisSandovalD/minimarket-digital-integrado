// ========================================
// services/user/toggle-user-status.service.js
// ========================================

const repository =
  require("../repositories/user.repository");

// ========================================
// TOGGLE STATUS
// ========================================

const toggleUserStatus =
  async (
    id,
    companyId
  ) => {

    return repository.toggleStatus(

      id,

      companyId

    );

  };

module.exports = {

  toggleUserStatus,

};