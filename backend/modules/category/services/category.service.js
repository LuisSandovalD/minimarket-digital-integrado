// ========================================
// services/category.service.js
// ========================================

const repository =
  require("../repositories/category.repository");

// ========================================
// GET ALL
// ========================================

exports.getAll = async (
  companyId
) => {

  return repository.getAll(
    companyId
  );

};

// ========================================
// GET BY ID
// ========================================

exports.getById = async (
  id,
  companyId
) => {

  const category =
    await repository.getById(
      id,
      companyId
    );

  if (!category) {

    throw new Error(
      "Categoría no encontrada"
    );

  }

  return category;

};

// ========================================
// CREATE
// ========================================

exports.create = async ({

  name,

  description,

  parentId,

  companyId,

}) => {


  // ========================================
  // CREATE
  // ========================================

  return repository.create({

    name,

    description,

    parentId:
      parentId || null,

    companyId,

  });

};

// ========================================
// UPDATE
// ========================================

exports.update = async (
  id,
  companyId,
  data
) => {

  // ========================================
  // EXISTS
  // ========================================

  const exists =
    await repository.exists(
      id,
      companyId
    );

  if (!exists) {

    throw new Error(
      "Categoría no encontrada"
    );

  }

  // ========================================
  // PREVENT SELF PARENT
  // ========================================

  if (
    Number(data.parentId) ===
    Number(id)
  ) {

    throw new Error(
      "Una categoría no puede ser su propia categoría padre"
    );

  }

  // ========================================
  // UPDATE
  // ========================================

  return repository.update(
    id,
    {

      name:
        data.name,

      description:
        data.description,

      parentId:
        data.parentId || null,

    }
  );

};

// ========================================
// DELETE
// ========================================

exports.delete = async (
  id,
  companyId
) => {

  // ========================================
  // EXISTS
  // ========================================

  const exists =
    await repository.exists(
      id,
      companyId
    );

  if (!exists) {

    throw new Error(
      "Categoría no encontrada"
    );

  }

  // ========================================
  // VALIDATE CHILDREN
  // ========================================

  const hasChildren =
    await repository.hasChildren(
      id
    );

  if (hasChildren) {

    throw new Error(
      "La categoría tiene subcategorías asociadas"
    );

  }

  // ========================================
  // VALIDATE PRODUCTS
  // ========================================

  const hasProducts =
    await repository.hasProducts(
      id
    );

  if (hasProducts) {

    throw new Error(
      "La categoría tiene productos asociados"
    );

  }

  // ========================================
  // DELETE
  // ========================================

  return repository.softDelete(
    id
  );

};