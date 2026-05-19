const os = require("os");

const prisma =
  require("../../../prisma/client");

// ======================================
// SYSTEM INFO
// ======================================

exports.getSystemInfo =
async (req, res) => {

  try {

    const info = {

      platform:
        os.platform(),

      architecture:
        os.arch(),

      cpuCores:
        os.cpus().length,

      totalMemory:
        os.totalmem(),

      freeMemory:
        os.freemem(),

      uptime:
        os.uptime(),

      nodeVersion:
        process.version

    };

    res.json(info);

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// SYSTEM LOGS
// ======================================

exports.getSystemLogs =
async (req, res) => {

  try {

    const logs =
      await prisma.auditLog.findMany({

        take: 50,

        orderBy: {
          createdAt: "desc"
        },

        include: {
          user: true,
          branch: true
        }

      });

    res.json(logs);

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// CLEAR CACHE
// ======================================

exports.clearCache =
async (req, res) => {

  try {

    // Simulación

    res.json({

      success: true,

      message:
        "Cache limpiada correctamente"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
