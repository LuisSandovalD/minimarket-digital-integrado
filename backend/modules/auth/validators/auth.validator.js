// ========================================
// validators/auth.validator.js
// ========================================

// Importación explícita de los repositorios especializados necesarios para las validaciones de base de datos
const userRepository = require("../repositories/user.repository");
const companyRepository = require("../repositories/company.repository");

/* ======================================
 * VALIDATE LOGIN
 * ==================================== */
const validateLogin = async (body) => {
  const { email, password } = body;

  if (!email?.trim()) {
    throw new Error("Email requerido");
  }

  if (!password) {
    throw new Error("Contraseña requerida");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Correo electrónico inválido");
  }
};

/* ======================================
 * VALIDATE REGISTER
 * ==================================== */
const validateRegister = async (body) => {
  const { name, email, password, company, branch } = body;

  // 1. USER VALIDATION (Sintáctica)
  if (!name?.trim()) throw new Error("Nombre requerido");
  if (!email?.trim()) throw new Error("Email requerido");
  if (!password) throw new Error("Contraseña requerida");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Correo electrónico inválido");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  // 2. COMPANY VALIDATION (Sintáctica)
  if (!company) throw new Error("Información de empresa requerida");
  if (!company.name?.trim()) throw new Error("Nombre de empresa requerido");

  // 3. BRANCH VALIDATION (Sintáctica)
  if (!branch) throw new Error("Información de sucursal requerida");
  if (!branch.name?.trim()) throw new Error("Nombre de sucursal requerido");
  if (!branch.address?.trim()) throw new Error("Dirección de sucursal requerida");

  // 4. DATABASE VALIDATIONS (Persistencia)
  // Consultamos directo al repositorio especializado de usuarios
  const existingUser = await userRepository.findUserByEmail(email.trim());
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  // Consultamos directo al repositorio especializado de empresas
  const existingCompany = await companyRepository.findCompanyByName(company.name.trim());
  if (existingCompany) {
    throw new Error("La empresa ya existe");
  }
};

// EXPORTACIÓN UNIFICADA: Garantiza que no devuelva un objeto vacío o undefined
module.exports = {
  validateLogin,
  validateRegister
};