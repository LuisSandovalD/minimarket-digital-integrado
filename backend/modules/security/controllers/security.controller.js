const bcrypt = require("bcryptjs");

const prisma =
  require("../../../prisma/client");

// ======================================
// GET SESSIONS
// ======================================

exports.getSessions =
async (req, res) => {

  try {

    // Simulación de sesiones

    res.json({

      success: true,

      sessions: [

        {

          device:
            "Windows PC",

          browser:
            "Chrome",

          ip:
            req.ip,

          current: true

        }

      ]

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// LOGOUT ALL DEVICES
// ======================================

exports.logoutAllDevices =
async (req, res) => {

  try {

    // Aquí normalmente invalidarías JWTs

    res.json({

      success: true,

      message:
        "Sesiones cerradas correctamente"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ======================================
// CHANGE PASSWORD
// ======================================

exports.changePassword =
async (req, res) => {

  try {

    const {

      currentPassword,

      newPassword

    } = req.body;

    // Buscar usuario

    const user =
      await prisma.user.findUnique({

        where: {
          id: req.user.id
        }

      });

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "Usuario no encontrado"

      });

    }

    // Validar password actual

    const valid =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!valid) {

      return res.status(400).json({

        success: false,

        message:
          "Contraseña actual incorrecta"

      });

    }

    // Hash nueva password

    const hashed =
      await bcrypt.hash(
        newPassword,
        10
      );

    // Actualizar

    await prisma.user.update({

      where: {
        id: user.id
      },

      data: {
        password: hashed
      }

    });

    res.json({

      success: true,

      message:
        "Contraseña actualizada"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
