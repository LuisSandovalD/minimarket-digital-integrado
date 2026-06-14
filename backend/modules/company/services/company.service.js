// modules/company/services/company.service.js

const repository =
  require("../repositories/company.repository");

/* ========================================
 * GET MY COMPANY
 * ====================================== */

exports.getMyCompany = async (
  companyId
) => {

  return repository.getMyCompany(
    companyId
  );

};

/* ========================================
 * GET COMPANY BY ID
 * ====================================== */

exports.getById = async (
  id
) => {

  return repository.getById(id);

};

/* ========================================
 * UPDATE COMPANY
 * ====================================== */

exports.update = async (
  id,
  data
) => {

  return repository.update(
    id,
    data
  );

};

