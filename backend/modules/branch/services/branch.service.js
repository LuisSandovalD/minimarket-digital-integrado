const repository =
  require("../repositories/branch.repository");

const {
  generateSlug,
} = require("../../../utils/helpers");

/* ======================================
 * GET BRANCHES
 * ==================================== */

exports.getBranches =
async (companyId) => {

  return await repository.findAll(
    companyId
  );

};

/* ======================================
 * GET BRANCH BY ID
 * ==================================== */

exports.getBranchById =
async (
  id,
  companyId
) => {

  if (isNaN(id)) {

    throw new Error(
      "ID inválido"
    );

  }

  const branch =
    await repository.findById(
      id,
      companyId
    );

  if (!branch) {

    throw new Error(
      "Sucursal no encontrada"
    );

  }

  return branch;

};

/* ======================================
 * CREATE BRANCH
 * ==================================== */

exports.createBranch =
async (
  data,
  companyId
) => {

  // ====================================
  // VALIDATION
  // ====================================

  if (!data.name) {

    throw new Error(
      "El nombre es obligatorio"
    );

  }

  // ====================================
  // SLUG
  // ====================================

  const slug =
    generateSlug(
      data.name
    );

  // ====================================
  // CREATE
  // ====================================

  return await repository.create({

    name:
      data.name,

    slug,

    code:
      data.code || null,

    logo:
      data.logo || null,

    description:
      data.description || null,

    address:
      data.address || null,

    phone:
      data.phone || null,

    email:
      data.email || null,

    city:
      data.city || null,

    state:
      data.state || null,

    country:
      data.country || null,

    postalCode:
      data.postalCode || null,

    companyId,

  });

};

/* ======================================
 * UPDATE BRANCH
 * ==================================== */

exports.updateBranch =
async (
  id,
  data,
  companyId
) => {

  // ====================================
  // VALIDATE ID
  // ====================================

  if (isNaN(id)) {

    throw new Error(
      "ID inválido"
    );

  }

  // ====================================
  // FIND BRANCH
  // ====================================

  const branch =
    await repository.findById(
      id,
      companyId
    );

  if (!branch) {

    throw new Error(
      "Sucursal no encontrada"
    );

  }

  // ====================================
  // UPDATE DATA
  // ====================================

  const updateData = {};

  if (data.name !== undefined)
    updateData.name =
      data.name;

  if (data.code !== undefined)
    updateData.code =
      data.code;

  if (data.logo !== undefined)
    updateData.logo =
      data.logo;

  if (data.description !== undefined)
    updateData.description =
      data.description;

  if (data.address !== undefined)
    updateData.address =
      data.address;

  if (data.phone !== undefined)
    updateData.phone =
      data.phone;

  if (data.email !== undefined)
    updateData.email =
      data.email;

  if (data.city !== undefined)
    updateData.city =
      data.city;

  if (data.state !== undefined)
    updateData.state =
      data.state;

  if (data.country !== undefined)
    updateData.country =
      data.country;

  if (data.postalCode !== undefined)
    updateData.postalCode =
      data.postalCode;

  // ====================================
  // UPDATE SLUG IF NAME CHANGED
  // ====================================

  if (
    data.name &&
    data.name !== branch.name
  ) {

    updateData.slug =
      generateSlug(
        data.name
      );

  }

  // ====================================
  // UPDATE
  // ====================================

  return await repository.update(
    id,
    updateData
  );

};

/* ======================================
 * DELETE BRANCH
 * ==================================== */

exports.deleteBranch =
async (
  id,
  companyId
) => {

  // ====================================
  // VALIDATE ID
  // ====================================

  if (isNaN(id)) {

    throw new Error(
      "ID inválido"
    );

  }

  // ====================================
  // FIND BRANCH
  // ====================================

  const branch =
    await repository.findById(
      id,
      companyId
    );

  if (!branch) {

    throw new Error(
      "Sucursal no encontrada"
    );

  }

  // ====================================
  // SOFT DELETE
  // ====================================

  return await repository.softDelete(
    id
  );

};