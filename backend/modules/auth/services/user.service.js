// ========================================
// services/user.service.js
// ========================================

const bcrypt =
  require("bcryptjs");

const repository =
  require("../repositories/auth.repository");

const {
  SALT_ROUNDS,
} = require("../constants/auth.constants");

/* ======================================
 * SANITIZE USER
 * ==================================== */

exports.sanitizeUser =
  (user) => {

    if (!user) {
      return null;
    }

    delete user.password;

    return user;

  };

/* ======================================
 * VALIDATE PASSWORD
 * ==================================== */

exports.validatePassword =
  async (
    password,
    hashedPassword
  ) => {

    return await bcrypt.compare(
      password,
      hashedPassword
    );

  };

/* ======================================
 * HASH PASSWORD
 * ==================================== */

exports.hashPassword =
  async (password) => {

    return await bcrypt.hash(
      password,
      SALT_ROUNDS
    );

  };

/* ======================================
 * CREATE USER
 * ==================================== */

exports.createUser =
  async (data) => {

    return await repository.createUser(
      data
    );

  };