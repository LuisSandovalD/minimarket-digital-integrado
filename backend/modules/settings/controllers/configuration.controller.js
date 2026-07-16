const configurationService = require("../services/configuration.service");

const getConfiguration = async (req, res) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: "No autorizado: Contexto de empresa no identificado",
      });
    }

    const data = await configurationService.getConfiguration(companyId);

    return res.status(200).json({
      success: true,
      message: "Configuración de empresa recuperada con éxito",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error interno al obtener la configuración",
    });
  }
};

const updateConfiguration = async (req, res) => {
  try {
    const companyId = req.user?.companyId;
    if (!companyId) {
      return res.status(401).json({
        success: false,
        message: "No autorizado: Contexto de empresa no identificado",
      });
    }

    const data = await configurationService.updateConfiguration(companyId, req.body);

    return res.status(200).json({
      success: true,
      message: "Configuración actualizada correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error interno al actualizar la configuración",
    });
  }
};

module.exports = {
  getConfiguration,
  updateConfiguration,
};
