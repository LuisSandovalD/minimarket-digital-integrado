// ========================================
// repositories/company.repository.js
// ========================================
const prisma = require("../../../prisma/client");

/* ======================================
 * FIND COMPANY BY NAME
 * ==================================== */
const findCompanyByName = async (name, tx = null) => {
  const client = tx || prisma;
  return client.company.findFirst({
    where: { name, isDeleted: false },
  });
};

/* ======================================
 * FIND COMPANY BY SLUG
 * ==================================== */
const findCompanyBySlug = async (slug, tx = null) => {
  const client = tx || prisma;
  return client.company.findUnique({ where: { slug } });
};

/* ======================================
 * FIND COMPANY BY RUC
 * ==================================== */
const findCompanyByRuc = async (ruc, tx = null) => {
  const client = tx || prisma;
  return client.company.findFirst({ where: { ruc } });
};

/* ======================================
 * CREATE COMPANY
 * ==================================== */
const createCompany = async (data, tx = null) => {
  const client = tx || prisma;
  return client.company.create({ data });
};

// EXPORTACIÓN UNIFICADA BLINDADA: Evita mutaciones y objetos vacíos en tiempo de arranque
module.exports = {
  findCompanyByName,
  findCompanyBySlug,
  findCompanyByRuc,
  createCompany
};