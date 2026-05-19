const path = require("path");

// ======================================
// UPLOAD IMAGE
// ======================================

exports.uploadImage =
async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message:
          "No se recibió ninguna imagen"

      });

    }

    // URL del archivo

    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({

      success: true,

      message:
        "Imagen subida correctamente",

      file: {

        originalName:
          req.file.originalname,

        filename:
          req.file.filename,

        mimetype:
          req.file.mimetype,

        size:
          req.file.size,

        url:
          fileUrl

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};
