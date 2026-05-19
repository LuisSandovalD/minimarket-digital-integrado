const prisma = require("../../../prisma/client");

// ======================================
// DATABASE STATUS
// ======================================

exports.databaseStatus =
async (req, res) => {

  try {

    // Probar conexión

    await prisma.$queryRaw`
      SELECT 1
    `;

    // Conteos generales

    const users =
      await prisma.user.count();

    const products =
      await prisma.product.count();

    const sales =
      await prisma.sale.count();

    const purchases =
      await prisma.purchase.count();

    res.json({

      success: true,

      database: {

        status:
          "ONLINE",

        users,

        products,

        sales,

        purchases

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      status:
        "OFFLINE",

      message:
        error.message

    });

  }

};

// ======================================
// OPTIMIZE DATABASE
// ======================================

exports.optimizeDatabase =
async (req, res) => {

  try {

    // PostgreSQL VACUUM ANALYZE

    await prisma.$executeRawUnsafe(
      `VACUUM ANALYZE`
    );

    res.json({

      success: true,

      message:
        "Base de datos optimizada correctamente"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};
