// ========================================
// services/branch.service.js
// ========================================

// Cambiamos el concentrador auth por su propio repositorio especializado
const branchRepository = require("../repositories/branch.repository");

/* ======================================
 * CREATE BRANCH
 * ==================================== */
const createBranch = async (branch, companyId) => {
  if (!branch) {
    return null;
  }

  if (!branch.name) {
    throw new Error("El nombre de la sucursal es obligatorio");
  }

  // Ahora llamamos directamente al repositorio de sucursales
  return branchRepository.createBranch({
    name: branch.name.trim(),
    code: branch.code?.trim() || null,
    logo: branch.logo || null,
    description: branch.description || null,
    address: branch.address?.trim() || "",
    phone: branch.phone?.trim() || null,
    email: branch.email?.trim() || null,
    city: branch.city?.trim() || null,
    state: branch.state?.trim() || null,
    country: branch.country?.trim() || null,
    postalCode: branch.postalCode?.trim() || null,
    companyId,
    isActive: true,
    isDeleted: false,
  });
};

// EXPORTACIÓN UNIFICADA: Todo empaquetado bajo la misma firma arquitectónica de la app
module.exports = {
  createBranch,
};
