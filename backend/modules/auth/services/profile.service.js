// ========================================
// services/profile.service.js
// ========================================

// Desacoplamos por completo de auth.repository y de Prisma nativo.
// Apuntamos directo al repositorio especializado que ya cuenta con la consulta de estadísticas.
const userRepository = require("../repositories/user.repository");

/* ======================================
 * GET PROFILE BY ID WITH RELATIONS & STATS
 * ==================================== */
const getProfile = async (userId) => {
    if (!userId) {
        throw new Error("ID de usuario no proporcionado");
    }

    // Delegamos la consulta estructural compleja a la capa de persistencia (Repository)
    return userRepository.findUserWithRelationsAndStats(userId);
};

/* ======================================
 * UPDATE PROFILE DATA
 * ==================================== */
const updateProfile = async (userId, data) => {
    if (!userId) {
        throw new Error("ID de usuario no proporcionado");
    }

    // Filtrar campos críticos/sensibles que no deben mutar mediante la edición ordinaria del perfil
    const {
        password,
        role,
        email,
        companyId,
        branchId,
        twoFactorEnabled,
        twoFactorSecret,
        backupCodes,
        ...allowedData
    } = data;

    // Sanitización e higiene básica del input de texto admitido
    if (allowedData.name) {
        allowedData.name = allowedData.name.trim();
    }

    return userRepository.updateUser(userId, allowedData);
};

/* ======================================
 * GET ACCOUNT STATUS (REQUERIDO POR EL CONTROLADOR DE STATUS)
 * ==================================== */
const getAccountStatus = async (userId) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    return {
        isActive: user.isActive,
        isOnline: user.isOnline,
        twoFactorEnabled: user.twoFactorEnabled,
        lastLogin: user.lastLogin,
        loginAttempts: user.loginAttempts,
        isLocked: !!(user.lockedUntil && user.lockedUntil > new Date())
    };
};

// EXPORTACIÓN UNIFICADA: Todo empaquetado bajo la firma arquitectónica de la app
module.exports = {
    getProfile,
    updateProfile,
    getAccountStatus
};