// ========================================
// repositories/branch.repository.js
// ========================================
const prisma = require("../../../prisma/client");

/* ======================================
 * CREATE BRANCH
 * ==================================== */
const createBranch = async (data, tx = null) => {
  const client = tx || prisma;
  return client.branch.create({ data });
};

// EXPORTACIÓN UNIFICADA BLINDADA: Cero objetos vacíos o fallos de destructuración
module.exports = {
  createBranch,
};
