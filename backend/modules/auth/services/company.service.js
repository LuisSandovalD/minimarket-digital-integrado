// ========================================
// services/company.service.js
// ========================================

// Desacoplamos de auth y apuntamos directamente a su repositorio especializado
const companyRepository = require("../repositories/company.repository");
const { generateSlug } = require("../../../utils/helpers");

const createCompany = async (company, plan = "FREE") => {
  if (!company?.name) {
    throw new Error("El nombre de la empresa es obligatorio");
  }

  const slug = generateSlug(company.name);

  // Usamos el repositorio especializado de empresas
  const existingCompany = await companyRepository.findCompanyByName(company.name);
  if (existingCompany) {
    throw new Error("La empresa ya existe");
  }

  const existingSlug = await companyRepository.findCompanyBySlug(slug);
  if (existingSlug) {
    throw new Error("Ya existe una empresa con ese slug");
  }

  return companyRepository.createCompany({
    name: company.name.trim(),
    slug,
    email: company.email || null,
    phone: company.phone || null,
    address: company.address || "",
    ruc: company.ruc || null,
    subscriptionTier: plan,
    isActive: true,
    isDeleted: false,
  });
};

// EXPORTACIÓN UNIFICADA: Garantiza que Express y los controladores lo lean correctamente
module.exports = {
  createCompany
};