const repository = require("../repositories/category.repository");

exports.getAll = async (companyId, filters = {}) => {
  const { search = "", page = 1, limit = 10 } = filters;

  return repository.getAll({
    companyId,
    search,
    page,
    limit,
  });
};

exports.getById = async (id, companyId) => {
  const category = await repository.getById(id, companyId);
  if (!category) {
    throw new Error("Categoría no encontrada");
  }
  return category;
};
