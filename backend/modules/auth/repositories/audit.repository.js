// ========================================
// repositories/audit.repository.js
// ========================================
const prisma = require("../../../prisma/client");

/* ======================================
 * CREATE AUDIT LOG
 * ==================================== */
const createAuditLog = async (data, tx = null) => {
  const client = tx || prisma;

  // Pasamos el objeto data limpio. Si tiene description, oldValues o newValues,
  // Prisma lo mapeará nativamente a las columnas correctas.
  return client.auditLog.create({
    data: data,
  });
};

/* ======================================
 * FIND AUDIT BY ID
 * ==================================== */
const findAuditById = async (id, tx = null) => {
  const client = tx || prisma;
  return client.auditLog.findUnique({ where: { id } });
};

/* ======================================
 * FIND AUDITS (WITH DYNAMIC FILTERS)
 * ==================================== */
const findAudits = async (filters = {}, tx = null) => {
  const client = tx || prisma;
  return client.auditLog.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });
};

module.exports = {
  createAuditLog,
  findAuditById,
  findAudits,
};
