const configurationService = require(
  "../services/configuration.service"
);

const getConfiguration = async (
  req,
  res
) => {
  try {
    const companyId =
      req.user.companyId;

    const data =
      await configurationService.getConfiguration(
        companyId
      );

    return res.status(200).json({
      success: true,
      message:
        "Configuración obtenida correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateConfiguration = async (
  req,
  res
) => {
  try {
    const companyId =
      req.user?.companyId;

    const data =
      await configurationService.updateConfiguration(
        companyId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Configuración actualizada correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getConfiguration,
  updateConfiguration,
};