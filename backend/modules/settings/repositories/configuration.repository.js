const prisma = require("../../../prisma/client");

const findByCompany = async (companyId) => {
  return prisma.configuration.findUnique({
    where: { companyId: Number(companyId) },
    include: {
      company: {
        select: { id: true, name: true, ruc: true, email: true, logo: true }, // Traemos el logo desde la tabla company
      },
    },
  });
};

const createConfiguration = async (data) => {
  return prisma.configuration.create({ data });
};

const updateConfiguration = async (companyId, data) => {
  // =========================================================================
  // LIMPIEZA: Extraemos 'company' para que Prisma no intente guardarlo en la
  // tabla 'configuration' (rompería porque 'company' es una relación, no una columna)
  // =========================================================================
  const { company, ...configurationData } = data;

  return prisma.configuration.update({
    where: { companyId: Number(companyId) },
    data: {
      ...configurationData,
      // Si en el formulario editaron el nombre, RUC o logo, lo actualizamos en su tabla real
      ...(company && {
        company: {
          update: {
            name: company.name,
            ruc: company.ruc,
            email: company.email,
            logo: company.logo,
          },
        },
      }),
    },
    include: {
      company: {
        select: { id: true, name: true, ruc: true, email: true, logo: true },
      },
    },
  });
};

module.exports = {
  findByCompany,
  createConfiguration,
  updateConfiguration,
};
