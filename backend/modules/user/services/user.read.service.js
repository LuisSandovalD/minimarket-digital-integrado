const repository = require("../repositories/user.repository");

/**
 * Obtener usuarios con filtros y paginación
 * @param {string} companyId - ID de la empresa del usuario autenticado
 * @param {Object} queryParams - Filtros provenientes de req.query (page, limit, search, branchId, isActive)
 */
const getUsers = async (companyId, queryParams = {}) => {
  // Desestructuramos para asegurar tipos de datos correctos si fuera necesario,
  // o simplemente pasamos el objeto limpio al repositorio.
  return repository.findAll(companyId, {
    page: queryParams.page ? Number(queryParams.page) : 1,
    limit: queryParams.limit ? Number(queryParams.limit) : 10,
    search: queryParams.search || undefined,
    branchId: queryParams.branchId || undefined,
    isActive: queryParams.isActive, // El repositorio ya se encarga de parsear este booleano
    sortBy: queryParams.sortBy || "createdAt",
    sortOrder: queryParams.sortOrder || "desc",
  });
};

const getUserById = async (id, companyId) => {
  return repository.findById(id, companyId);
};

const getHierarchy = async (companyId) => {
  return repository.findHierarchy(companyId);
};

module.exports = {
  getUsers,
  getUserById,
  getHierarchy,
};
