// ========================================
// services/user.service.js
// ========================================

const bcrypt =
  require("bcryptjs");

const repository =
  require("../repositories/user.repository");

// ========================================
// GET USERS
// ========================================

const getUsers = async (
  companyId
) => {

  return repository.findAll(
    companyId
  );

};

// ========================================
// GET USER BY ID
// ========================================

const getUserById = async (
  id,
  companyId
) => {

  return repository.findById(
    id,
    companyId
  );

};

// ========================================
// GET HIERARCHY
// ========================================

const getHierarchy = async (
  companyId
) => {

  return repository.findHierarchy(
    companyId
  );

};

// ========================================
// CREATE USER
// ========================================

const createUser = async (
  body,
  companyId
) => {

  // ====================================
  // VALIDATE PASSWORD
  // ====================================

  if (!body.password) {

    throw new Error(
      "La contraseña es requerida"
    );

  }

  // ====================================
  // HASH PASSWORD
  // ====================================

  const hashedPassword =
    await bcrypt.hash(
      body.password,
      10
    );

  // ====================================
  // CREATE USER
  // ====================================

  return repository.create({

    name:
      body.name,

    email:
      body.email,

    password:
      hashedPassword,

    phone:
      body.phone || "",

    avatar:
      body.avatar || "",

    role:
      body.role ||
      "EMPLOYEE",

    branchId:
      body.branchId || null,

    managerId:
      body.managerId || null,

    isActive:
      body.isActive ?? true,

    companyId,

  });

};

// ========================================
// UPDATE USER
// ========================================

const updateUser = async (
  id,
  companyId,
  body
) => {

  // ====================================
  // PREVENT SELF MANAGER
  // ====================================

  if (

    body.managerId &&

    parseInt(body.managerId) === id

  ) {

    throw new Error(
      "Un usuario no puede ser su propio manager"
    );

  }

  // ====================================
  // BUILD UPDATE DATA
  // ====================================

  const data = {};

  // ====================================
  // OPTIONAL FIELDS
  // ====================================

  if (body.name !== undefined) {

    data.name =
      body.name;

  }

  if (body.email !== undefined) {

    data.email =
      body.email;

  }

  if (body.phone !== undefined) {

    data.phone =
      body.phone;

  }

  if (body.avatar !== undefined) {

    data.avatar =
      body.avatar;

  }

  if (body.role !== undefined) {

    data.role =
      body.role;

  }

  if (body.branchId !== undefined) {

    data.branchId =
      body.branchId || null;

  }

  if (body.managerId !== undefined) {

    data.managerId =
      body.managerId || null;

  }

  if (body.isActive !== undefined) {

    data.isActive =
      body.isActive;

  }

  // ====================================
  // UPDATE PASSWORD
  // ====================================

  if (body.password) {

    data.password =
      await bcrypt.hash(
        body.password,
        10
      );

  }

  // ====================================
  // UPDATE USER
  // ====================================

  return repository.update(

    id,

    companyId,

    data

  );

};

// ========================================
// TOGGLE STATUS
// ========================================

const toggleUserStatus =
  async (
    id,
    companyId
  ) => {

    return repository.toggleStatus(

      id,

      companyId

    );

  };

// ========================================
// DELETE USER
// ========================================

const deleteUser = async (
  id,
  companyId
) => {

  return repository.softDelete(

    id,

    companyId

  );

};

// ========================================
// RESTORE USER
// ========================================

const restoreUser = async (
  id,
  companyId
) => {

  return repository.restore(

    id,

    companyId

  );

};

// ========================================
// EXPORTS
// ========================================

module.exports = {

  getUsers,

  getUserById,

  getHierarchy,

  createUser,

  updateUser,

  toggleUserStatus,

  deleteUser,

  restoreUser,

};