const configurationRepository = require("../repositories/configuration.repository");

const getConfiguration = async (companyId) => {
  if (!companyId) throw new Error("El ID de la empresa es obligatorio");

  let configuration = await configurationRepository.findByCompany(companyId);

  // Fallback de autogeneración (Estrategia defensiva Multi-tenant)
  if (!configuration) {
    configuration = await configurationRepository.createConfiguration({
      companyId: Number(companyId),
      theme: "system", // Valor inicial por defecto adaptado
      language: "es",
      currency: "PEN",
    });
  }

  return configuration;
};

const updateConfiguration = async (companyId, data) => {
  if (!companyId) throw new Error("El ID de la empresa es obligatorio");

  const exists = await configurationRepository.findByCompany(companyId);
  if (!exists) {
    throw new Error("La configuración de la empresa especificada no existe");
  }

  // Prevenir que se intente alterar el ID de la empresa mediante el body
  delete data.companyId;
  delete data.id;

  return configurationRepository.updateConfiguration(companyId, data);
};

module.exports = {
  getConfiguration,
  updateConfiguration,
};
