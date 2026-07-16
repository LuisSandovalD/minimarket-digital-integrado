const repository = require("../repositories/category.repository");

exports.create = async ({ name, description, parentId, companyId }) => {
  return repository.create({
    name,
    description,
    parentId: parentId || null,
    companyId,
  });
};

exports.update = async (id, companyId, data) => {
  const exists = await repository.exists(id, companyId);
  if (!exists) {
    throw new Error("Categoría no encontrada");
  }

  if (Number(data.parentId) === Number(id)) {
    throw new Error("Una categoría no puede ser su propia categoría padre");
  }

  return repository.update(id, {
    name: data.name,
    description: data.description,
    parentId: data.parentId || null,
  });
};

exports.delete = async (id, companyId) => {
  const exists = await repository.exists(id, companyId);
  if (!exists) {
    throw new Error("Categoría no encontrada");
  }

  const hasChildren = await repository.hasChildren(id);
  if (hasChildren) {
    throw new Error("La categoría tiene subcategorías asociadas");
  }

  const hasProducts = await repository.hasProducts(id);
  if (hasProducts) {
    throw new Error("La categoría tiene productos asociados");
  }

  return repository.softDelete(id);
};
