const configurationRepository = require(
  "../repositories/configuration.repository"
);

const getConfiguration = async (
  companyId
) => {
  let configuration =
    await configurationRepository.findByCompany(
      companyId
    );

  /*
    Crear configuración por defecto
    automáticamente si no existe
  */

  if (!configuration) {
    configuration =
      await configurationRepository.createConfiguration(
        {
          companyId,
        }
      );
  }

  return configuration;
};

const updateConfiguration = async (
  companyId,
  data
) => {
  /*
    Verificar existencia
  */

  const exists =
    await configurationRepository.findByCompany(
      companyId
    );

  if (!exists) {
    throw new Error(
      "Configuración no encontrada"
    );
  }

  return configurationRepository.updateConfiguration(
    companyId,
    data
  );
};

module.exports = {
  getConfiguration,
  updateConfiguration,
};