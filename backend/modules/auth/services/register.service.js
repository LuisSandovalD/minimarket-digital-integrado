// ========================================
// services/auth/register.service.js
// ========================================

const bcrypt = require("bcryptjs");

// Importamos de manera explícita los repositorios especializados necesarios
const userRepository = require("../repositories/user.repository");
const companyRepository = require("../repositories/company.repository");
const { registerTenant } = require("../repositories/register.repository");

/**
 * REGISTRO DE UN NUEVO TENANT (EMPRESA, SUCURSAL Y USUARIO ADMINISTRADOR)
 */
const register = async ({ body }) => {

    const {
        name,
        email,
        password,
        role,
        phone,
        company,
        branch
    } = body;

    // 1. Validar unicidad del usuario mediante el repositorio de usuarios
    const existingUser = await userRepository.findUserByEmail(
        email.trim().toLowerCase()
    );

    if (existingUser) {
        throw new Error(
            "El correo electrónico ya se encuentra registrado"
        );
    }

    // 2. Validar unicidad de la empresa mediante el repositorio de empresas
    const existingCompany = await companyRepository.findCompanyByRuc(
        company.ruc
    );

    if (existingCompany) {
        throw new Error(
            "El RUC ya se encuentra registrado"
        );
    }

    // 3. Hashear la contraseña de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Ejecutar la transacción Multi-Tenant en el repositorio dedicado
    const result = await registerTenant({
        user: {
            name,
            email,
            password: hashedPassword,
            role,
            phone
        },
        company,
        branch
    });

    return {
        success: true,
        message: "Empresa creada exitosamente",
        company: result.company,
        branch: result.branch,
        user: result.user
    };
};

module.exports = {
    register
};