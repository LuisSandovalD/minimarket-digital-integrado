// ========================================
// services/token.service.js
// ========================================

const jwt =
  require("jsonwebtoken");

const {
  JWT_EXPIRES,
} = require("../constants/auth.constants");

/* ======================================
 * GENERATE TOKEN
 * ==================================== */

exports.generateToken =
  (user) => {

    return jwt.sign(

      {
        id:
          user.id,

        email:
          user.email,

        role:
          user.role,

        companyId:
          user.companyId,

        branchId:
          user.branchId,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          JWT_EXPIRES,
      }

    );

  };