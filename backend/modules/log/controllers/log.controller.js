const prisma = require("../../../prisma/client");

// ======================================
// GET ALL LOGS
// ======================================

exports.getLogs =
async (req, res) => {

  try {

    const logs =
      await prisma.auditLog.findMany({

        where: {

          companyId:
            req.user.companyId

        },

        include: {

          user: true,

          branch: true

        },

        orderBy: {

          createdAt:
            "desc"

        },

        take: 100

      });

    res.json({

      success: true,

      total:
        logs.length,

      logs

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};

// ======================================
// GET ERROR LOGS
// ======================================

exports.getErrors =
async (req, res) => {

  try {

    const errors =
      await prisma.auditLog.findMany({

        where: {

          companyId:
            req.user.companyId,

          OR: [

            {
              action: {
                contains: "ERROR"
              }
            },

            {
              description: {
                contains: "error"
              }
            }

          ]

        },

        include: {

          user: true,

          branch: true

        },

        orderBy: {

          createdAt:
            "desc"

        },

        take: 100

      });

    res.json({

      success: true,

      total:
        errors.length,

      errors

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};
