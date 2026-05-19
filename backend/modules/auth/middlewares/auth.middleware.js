const jwt =
  require("jsonwebtoken");

const prisma =
  require("../../../prisma/client");

module.exports =
async (
  req,
  res,
  next
) => {

  try {

    let token = null;

    /* ======================================
     * TOKEN DESDE HEADER
     * ==================================== */

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith(
        "Bearer "
      )
    ) {

      token =
        authHeader.split(
          " "
        )[1];

    }

    /* ======================================
     * TOKEN DESDE COOKIES
     * ==================================== */

    if (
      !token &&
      req.cookies?.access_token
    ) {

      token =
        req.cookies.access_token;

    }

    /* ======================================
     * TOKEN REQUERIDO
     * ==================================== */

    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          "Acceso no autorizado",

      });

    }

    /* ======================================
     * VERIFY TOKEN
     * ==================================== */

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    /* ======================================
     * FIND USER
     * ==================================== */

    const user =
      await prisma.user.findUnique({

        where: {
          id: decoded.id,
        },

        include: {

          company: true,

          branch: true,

        },

      });

    /* ======================================
     * INVALID USER
     * ==================================== */

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Usuario no encontrado",

      });

    }

    /* ======================================
     * USER DISABLED
     * ==================================== */

    if (
      user.isActive === false
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Usuario deshabilitado",

      });

    }

    /* ======================================
     * REQUEST DATA
     * ==================================== */

    req.user = user;

    req.company =
      user.company;

    req.branch =
      user.branch;

    req.token = token;

    next();

  } catch (error) {

    console.error(error);

    return res.status(401).json({

      success: false,

      message:
        "Token inválido o expirado",

    });

  }

};