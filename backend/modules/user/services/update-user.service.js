// ========================================
// services/user/update-user.service.js
// ========================================

const bcrypt =
  require("bcryptjs");

const repository =
  require("../repositories/user.repository");

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

module.exports = {

  updateUser,

};