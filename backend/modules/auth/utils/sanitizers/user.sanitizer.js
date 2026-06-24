// ========================================
// utils/sanitizers/user.sanitizer.js
// ========================================

const sanitizeUser = (user) => {
    if (!user) return null;

    // Clonamos el objeto para no mutar el modelo original de Prisma
    const sanitized = { ...user };

    // Eliminamos credenciales y datos sensibles de control
    delete sanitized.password;
    delete sanitized.twoFactorSecret;
    delete sanitized.backupCodes;
    delete sanitized.resetPasswordCode;
    delete sanitized.resetPasswordExpires;
    delete sanitized.loginAttempts;
    delete sanitized.lockedUntil;

    return sanitized;
};

// EXPORTACIÓN UNIFICADA: Evita objetos vacíos o punteros rotos en tus controladores/servicios
module.exports = {
    sanitizeUser
};