// ========================================
// services/auth.service.js
// ========================================

const repository =
  require("../repositories/auth.repository");

const tokenService =
  require("./auth.token");

const userService =
  require("./user.service");

const companyService =
  require("./company.service");

const branchService =
  require("./branch.service");

const {
  validateRegister,
} = require("../validators/auth.validator");

/* ======================================
 * LOGIN
 * ==================================== */

exports.login =
  async (
    email,
    password
  ) => {

    // ==============================
    // FIND USER
    // ==============================

    const user =
      await repository.findUserByEmail(
        email
      );

    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    // ==============================
    // VALIDATE USER
    // ==============================

    if (!user.isActive) {

      throw new Error(
        "Usuario deshabilitado"
      );

    }

    // ==============================
    // VALIDATE PASSWORD
    // ==============================

    const validPassword =
      await userService.validatePassword(

        password,
        user.password

      );

    if (!validPassword) {

      throw new Error(
        "Contraseña incorrecta"
      );

    }

    // ==============================
    // UPDATE LOGIN
    // ==============================

    await repository.updateLastLogin(
      user.id
    );

    // ==============================
    // GENERATE TOKEN
    // ==============================

    const token =
      tokenService.generateToken(
        user
      );

    // ==============================
    // RESPONSE
    // ==============================

    return {

      token,

      user:
        userService.sanitizeUser(
          user
        ),

      company:
        user.company,

      branch:
        user.branch,

    };

  };

/* ======================================
 * REGISTER
 * ==================================== */

exports.register =
  async (body) => {

    const {

      name,
      email,
      password,

      role,
      phone,

      company,
      branch,

      plan = "FREE",

    } = body;

    // ==============================
    // VALIDATIONS
    // ==============================

    await validateRegister(
      body
    );

    // ==============================
    // CREATE COMPANY
    // ==============================

    const createdCompany =
      await companyService.createCompany(

        company,
        plan

      );

    // ==============================
    // CREATE BRANCH
    // ==============================

    const createdBranch =
      await branchService.createBranch(

        branch,
        createdCompany.id

      );

    // ==============================
    // HASH PASSWORD
    // ==============================

    const hashedPassword =
      await userService.hashPassword(
        password
      );

    // ==============================
    // CREATE USER
    // ==============================

    const user =
      await userService.createUser({

        name,

        email,

        password:
          hashedPassword,

        role:
          role || "ADMIN",

        phone:
          phone || null,

        isOnline: true,

        companyId:
          createdCompany.id,

        branchId:
          createdBranch
            ? createdBranch.id
            : null,

      });

    // ==============================
    // UPDATE LOGIN
    // ==============================

    await repository.updateLastLogin(
      user.id
    );

    // ==============================
    // TOKEN
    // ==============================

    const token =
      tokenService.generateToken(
        user
      );

    // ==============================
    // RESPONSE
    // ==============================

    return {

      token,

      user:
        userService.sanitizeUser(
          user
        ),

      company:
        createdCompany,

      branch:
        createdBranch,

    };

  };

/* ======================================
 * LOGOUT
 * ==================================== */

exports.logout =
  async (user) => {

    if (!user?.id) {

      throw new Error(
        "Usuario inválido"
      );

    }

    await repository.updateLogout(
      user.id
    );

    return {

      message:
        "Sesión cerrada correctamente",

    };

  };