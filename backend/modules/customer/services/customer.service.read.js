const repository = require("../repositories/customer.repository");

// ========================================
// OBTENER TODOS LOS CLIENTES
// ========================================
exports.getAll = async (companyId, query = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    city,
    isActive,
  } = query;

  return repository.getAll(companyId, {
    page: Number(page),
    limit: Number(limit),
    search: search?.trim() || undefined,
    city: city?.trim() || undefined,
    isActive:
            isActive === "true"
              ? true
              : isActive === "false"
                ? false
                : undefined,
  });
};

// OBTENER CLIENTE POR ID
exports.getById = async (id, companyId) => {
  if (Number.isNaN(id)) {
    throw new Error("ID inválido");
  }

  const customer = await repository.getById(id, companyId);

  if (!customer) {
    throw new Error("Cliente no encontrado");
  }

  return customer;
};
