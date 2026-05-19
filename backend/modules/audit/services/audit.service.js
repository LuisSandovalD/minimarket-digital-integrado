const repository =
  require("../repositories/audit.repository");

// ======================================
// GET AUDITS
// ======================================

exports.getAudits =
(companyId) => {

  return repository
    .getAudits(
      companyId
    );

};

// ======================================
// GET AUDIT BY ID
// ======================================

exports.getAuditById =
(id, companyId) => {

  return repository
    .getAuditById(
      id,
      companyId
    );

};

// ======================================
// CREATE AUDIT
// ======================================

exports.createAudit =
(data) => {

  return repository
    .createAudit(
      data
    );

};

// ======================================
// DELETE AUDIT
// ======================================

exports.deleteAudit =
(id, companyId) => {

  return repository
    .deleteAudit(
      id,
      companyId
    );

};
