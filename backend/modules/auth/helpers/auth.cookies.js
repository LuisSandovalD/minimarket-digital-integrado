// ========================================
// helpers/auth.cookies.js
// ========================================

/* ======================================
 * COOKIE CONFIG
 * ==================================== */

const cookieConfig = {

  httpOnly: true,

  secure:
    process.env.NODE_ENV ===
    "production",

  sameSite: "strict",

  maxAge:
    1000 *
    60 *
    60 *
    24 *
    7,

};

/* ======================================
 * SET AUTH COOKIE
 * ==================================== */

exports.setAuthCookie =
  (res, token) => {

    res.cookie(

      "access_token",

      token,

      cookieConfig

    );

  };

/* ======================================
 * CLEAR AUTH COOKIE
 * ==================================== */

exports.clearAuthCookie =
  (res) => {

    res.clearCookie(

      "access_token",

      cookieConfig

    );

  };