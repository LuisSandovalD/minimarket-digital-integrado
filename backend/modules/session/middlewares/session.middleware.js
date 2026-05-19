const prisma =
  require("../../../prisma/client");

exports.validateSession =
async (
  req,
  res,
  next
) => {

  try {

    const token =
      req.headers.authorization
        ?.split(" ")[1];

    if (!token) {

      return res.status(401)
        .json({

          success: false,

          message:
            "Token requerido"

        });

    }

    const session =
      await prisma.userSession.findFirst({

        where: {

          token,

          isActive: true,

          expiresAt: {

            gt: new Date()

          }

        }

      });

    if (!session) {

      return res.status(401)
        .json({

          success: false,

          message:
            "Sesión inválida"

        });

    }

    next();

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};