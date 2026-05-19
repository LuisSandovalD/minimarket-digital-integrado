// ========================================
// validators/auth.validator.js
// ========================================

const repository =
  require("../repositories/auth.repository");

/* ======================================
 * VALIDATE REGISTER
 * ==================================== */

exports.validateRegister =
  async (body) => {

    const {
      name,
      email,
      password,
      company,
    } = body;

    if (
      !name ||
      !email ||
      !password
    ) {

      throw new Error(
        "Nombre, email y password son requeridos"
      );

    }

    if (!company?.name) {

      throw new Error(
        "Nombre de empresa requerido"
      );

    }

    const existingUser =
      await repository.findUserByEmail(
        email
      );

    if (existingUser) {

      throw new Error(
        "El usuario ya existe"
      );

    }

    const existingCompany =
      await repository.findCompanyByName(
        company.name
      );

    if (existingCompany) {

      throw new Error(
        "La empresa ya existe"
      );

    }

  };