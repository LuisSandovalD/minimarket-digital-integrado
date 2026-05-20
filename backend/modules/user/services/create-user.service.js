// ========================================
// services/user/create-user.service.js
// ========================================

const bcrypt =
  require("bcryptjs");

const repository =
  require("../repositories/user.repository");

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

module.exports = {

  createUser,

};