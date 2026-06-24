// ========================================
// features/auth/repositories/user2FA.repository.js
// ========================================
const prisma = require("../../../prisma/client");

/**
 * Guarda el código temporal enviado por Email (MFA Clásico)
 */
const saveTwoFactorCode = async (userId, code, expiresAt, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: {
            twoFactorEmailCode: code,
            twoFactorEmailExpires: expiresAt,
        },
    });
};

/**
 * SOLUCIÓN AL BUG: Guarda el secreto Base32 temporal para Apps Autenticadoras (MFA Totp)
 * Mapea directamente al método que tu servicio está intentando invocar.
 */
const saveTempTwoFactorSecret = async (userId, secret, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: {
            // Asumiendo que tus nombres de columna en el schema.prisma son estos,
            // ajústalos si guardas el secreto TOTP en un modelo separado o columna diferente.
            twoFactorSecret: secret,
        },
    });
};

/**
 * Busca y valida si el código de email no ha expirado
 */
const findValidTwoFactorCode = async (userId, code, tx = null) => {
    const client = tx || prisma;
    return client.user.findFirst({
        where: {
            id: userId,
            twoFactorEmailCode: code,
            twoFactorEmailExpires: { gt: new Date() },
        },
        include: { company: true, branch: true, employeeProfile: true },
    });
};

/**
 * Limpia los códigos de verificación de Email
 */
const clearTwoFactorCode = async (userId, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: {
            twoFactorEmailCode: null,
            twoFactorEmailExpires: null,
        },
    });
};

/**
 * Activa formalmente el flag de Doble Factor en el usuario
 */
const enableTwoFactorAuth = async (userId, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true },
    });
};

/**
 * Desactiva el Doble Factor y limpia secretos residuales
 */
const disableTwoFactorAuth = async (userId, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: {
            twoFactorEnabled: false,
            twoFactorSecret: null, // Limpieza preventiva de seguridad
        },
    });
};

module.exports = {
    saveTwoFactorCode,
    saveTempTwoFactorSecret, // <-- Exportado para que tu servicio lo reconozca como función
    findValidTwoFactorCode,
    clearTwoFactorCode,
    enableTwoFactorAuth,
    disableTwoFactorAuth,
};