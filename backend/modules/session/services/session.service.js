const prisma =
  require("../../../prisma/client");

const jwt =
  require("jsonwebtoken");

exports.createSession =
async ({
  user,
  req
}) => {

  const accessToken =
    jwt.sign(

      {
        id: user.id,
        companyId:
          user.companyId,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "15m"
      }

    );

  const refreshToken =
    jwt.sign(

      {
        id: user.id
      },

      process.env.JWT_REFRESH_SECRET,

      {
        expiresIn: "7d"
      }

    );

  const session =
    await prisma.userSession.create({

      data: {

        token:
          accessToken,

        refreshToken,

        userId:
          user.id,

        ipAddress:
          req.ip,

        userAgent:
          req.headers["user-agent"],

        expiresAt:
          new Date(
            Date.now() +
            1000 * 60 * 15
          ),

        refreshExpiresAt:
          new Date(
            Date.now() +
            1000 * 60 * 60 * 24 * 7
          )

      }

    });

  return {

    accessToken,

    refreshToken,

    session

  };

};