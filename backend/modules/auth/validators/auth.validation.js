// ========================================
// validators/auth.validation.js
// ========================================

/* ======================================
 * VALIDATE LOGIN
 * ==================================== */

exports.validateLogin =
  (body) => {

    const {
      email,
      password,
    } = body;

    if (
      !email ||
      !password
    ) {

      throw new Error(
        "Email y contraseña son requeridos"
      );

    }

  };