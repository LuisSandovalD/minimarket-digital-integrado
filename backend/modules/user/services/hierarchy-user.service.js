// ========================================
// services/user/hierarchy-user.service.js
// ========================================

const repository =
  require("../repositories/user.repository");

// ========================================
// GET HIERARCHY
// ========================================

const getHierarchy = async (
  companyId
) => {

  return repository.findHierarchy(
    companyId
  );

};

module.exports = {

  getHierarchy,

};