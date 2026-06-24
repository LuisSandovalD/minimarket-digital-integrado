// ========================================
// services/user.service.js
// ========================================

const bcrypt = require("bcryptjs");

// Importación explícita de los sub-repositorios especializados necesarios
const userRepository = require("../repositories/user.repository");
const userAuthRepository = require("../repositories/user-auth.repository");

const config = require("../config/auth.config");
const { sanitizeUser: runSanitizer } = require("../utils/sanitizers/user.sanitizer");

/* ======================================
 * UTILIDADES DE CONTRASEÑA
 * ==================================== */
const hashPassword = async (password) => {
    return bcrypt.hash(password, config.SALT_ROUNDS);
};

const validatePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

/* ======================================
 * CREAR USUARIO
 * ==================================== */
const createUser = async (data) => {
    return userRepository.createUser({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        role: data.role,
        phone: data.phone,
        companyId: data.companyId,
        branchId: data.branchId,
        isActive: true,
        isDeleted: false,
        loginAttempts: 0,
        twoFactorEnabled: false,
    });
};

/* ======================================
 * BUSQUEDAS
 * ==================================== */
const findUserById = async (id) => {
    return userRepository.findUserById(id);
};

const findUserByEmail = async (email) => {
    return userRepository.findUserByEmail(email);
};

/* ======================================
 * ACTUALIZACIONES
 * ==================================== */
const updateUser = async (id, data) => {
    return userRepository.updateUser(id, data);
};

const updatePassword = async (id, password) => {
    // Generamos el hash de forma segura con la función utilitaria local
    const hashedPassword = await hashPassword(password);

    // Apuntamos al repositorio especializado en seguridad/autenticación de usuario
    return userAuthRepository.updatePassword(id, hashedPassword);
};

/* ======================================
 * SANITIZACIÓN
 * ==================================== */
const sanitizeUser = (user) => {
    return runSanitizer(user);
};

// EXPORTACIÓN UNIFICADA: Garantiza estabilidad total al desestructurar en controladores
module.exports = {
    hashPassword,
    validatePassword,
    createUser,
    findUserById,
    findUserByEmail,
    updateUser,
    updatePassword,
    sanitizeUser
};