// ========================================
// services/auth/password.service.js
// ========================================

const bcrypt = require("bcryptjs");

// Sub-repositorios específicos de Usuario
const userRepository = require("../repositories/user.repository");
const userAuthRepository = require("../repositories/user-auth.repository");
const userCryptoRepository = require("../repositories/user-crypto.repository");

// Repositorio especializado para el manejo de sesiones activas
const sessionRepository = require("../repositories/session.repository");

const emailService = require("./email.service");

/* ======================================
 * SOLICITAR RECUPERACIÓN DE CONTRASEÑA
 * ==================================== */
const requestPasswordReset = async (email) => {

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        return {
            success: true,
            message: "Si el correo coincide con nuestros registros, recibirá un código de verificación"
        };
    }

    const resetCode = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const expiresAt = new Date(
        Date.now() + (15 * 60 * 1000)
    );

    await userCryptoRepository.savePasswordResetCode(
        user.id,
        resetCode,
        expiresAt
    );

    await emailService.sendPasswordResetCode({
        email,
        code: resetCode
    });

    return {
        success: true,
        message: "Si el correo coincide con nuestros registros, recibirá un código de verificación"
    };
};

/* ======================================
 * VALIDAR CÓDIGO DE RECUPERACIÓN
 * ==================================== */
const validateResetCode = async (code) => {

    const user = await userCryptoRepository.findResetCode(code);

    if (!user) {
        throw new Error("El código es inválido o ha expirado");
    }

    return {
        success: true,
        message: "Código validado con éxito"
    };
};

/* ======================================
 * RESTABLECER CONTRASEÑA
 * ==================================== */
const resetPasswordWithCode = async ({ code, newPassword }) => {

    const user = await userCryptoRepository.findResetCode(code);

    if (!user) {
        throw new Error("Operación inválida: El código expiró");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualiza la contraseña mediante el repositorio de autenticación/seguridad
    await userAuthRepository.updatePassword(
        user.id,
        hashedPassword
    );

    // Limpia el código usado mediante el repositorio criptográfico
    await userCryptoRepository.markResetCodeAsUsed(user.id);

    // Cierra todas las sesiones mediante el repositorio de sesiones dedicado
    await sessionRepository.deactivateAllSessions(user.id);

    return {
        success: true,
        message: "Contraseña restablecida exitosamente. Inicie sesión con sus nuevas credenciales"
    };
};

/* ======================================
 * CAMBIAR CONTRASEÑA
 * ==================================== */
const changeUserPassword = async ({ userId, currentPassword, newPassword }) => {

    const user = await userRepository.findUserById(userId);

    if (!user) {
        throw new Error("Usuario no localizado");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
        throw new Error("La contraseña actual ingresada es incorrecta");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userAuthRepository.updatePassword(userId, hashedPassword);

    return {
        success: true,
        message: "Contraseña cambiada exitosamente"
    };
};

module.exports = {
    requestPasswordReset,
    validateResetCode,
    resetPasswordWithCode,
    changeUserPassword
};