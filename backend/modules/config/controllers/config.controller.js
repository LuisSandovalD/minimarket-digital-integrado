const prisma =
  require("../../../prisma/client");

// Obtener configuración

exports.getConfig = async (
  req,
  res
) => {

  try {

    const config =
      await prisma.configuration.findFirst({
        where: {
          companyId: req.user.companyId
        }
      });

    if (!config) {

      return res.status(404).json({
        success: false,
        message:
          "Configuración no encontrada"
      });

    }

    res.json({
      success: true,
      data: config
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// Actualizar configuración

exports.updateConfig = async (
  req,
  res
) => {

  try {

    // Buscar configuración existente

    const existingConfig =
      await prisma.configuration.findFirst({
        where: {
          companyId:
            req.user.companyId
        }
      });

    if (!existingConfig) {

      return res.status(404).json({
        success: false,
        message:
          "Configuración no encontrada"
      });

    }

    // Actualizar

    const config =
      await prisma.configuration.update({
        where: {
          id: existingConfig.id
        },
        data: {
          companyName:
            req.body.companyName,
          taxRate:
            req.body.taxRate,
          currency:
            req.body.currency,
          timezone:
            req.body.timezone,
          address:
            req.body.address,
          phone:
            req.body.phone,
          email:
            req.body.email
        }
      });

    res.json({
      success: true,
      data: config
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
