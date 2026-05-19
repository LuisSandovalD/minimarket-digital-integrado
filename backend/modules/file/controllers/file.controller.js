const fs = require("fs");

const path = require("path");

const prisma =
  require("../../../prisma/client");

// ======================================
// GET FILES
// ======================================

exports.getFiles =
async (req, res) => {

  try {

    const files =
      await prisma.file.findMany({

        where: {

          companyId:
            req.user.companyId

        },

        orderBy: {

          createdAt:
            "desc"

        }

      });

    res.json({

      success: true,

      files

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
// UPLOAD FILE
// ======================================

exports.uploadFile =
async (req, res) => {

  try {

    // Este controlador asume
    // que multer ya procesó req.file

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message:
          "Archivo no enviado"

      });

    }

    const file =
      await prisma.file.create({

        data: {

          companyId:
            req.user.companyId,

          userId:
            req.user.id,

          filename:
            req.file.filename,

          originalName:
            req.file.originalname,

          mimeType:
            req.file.mimetype,

          size:
            req.file.size,

          path:
            req.file.path

        }

      });

    res.json({

      success: true,

      message:
        "Archivo subido correctamente",

      file

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
// DELETE FILE
// ======================================

exports.deleteFile =
async (req, res) => {

  try {

    const id =
      parseInt(req.params.id);

    const file =
      await prisma.file.findUnique({

        where: { id }

      });

    if (!file) {

      return res.status(404).json({

        success: false,

        message:
          "Archivo no encontrado"

      });

    }

    // Eliminar archivo físico

    if (
      fs.existsSync(file.path)
    ) {

      fs.unlinkSync(file.path);

    }

    // Eliminar de BD

    await prisma.file.delete({

      where: { id }

    });

    res.json({

      success: true,

      message:
        "Archivo eliminado"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};
