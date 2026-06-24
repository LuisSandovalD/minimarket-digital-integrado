// ========================================
// controllers/password.controller.js
// ========================================

// Apuntamos de manera exclusiva al servicio especializado en flujo de contraseñas modularizado
const passwordService = require("../services/password.service");
const { successResponse, errorResponse } = require("../responses/auth.response");

/* ======================================
 * FORGOT PASSWORD (SOLICITAR RECUPERACIÓN)
 * ==================================== */
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.trim()) {
            throw new Error("El correo electrónico es requerido para iniciar la recuperación");
        }

        // El servicio genera el código aleatorio, lo guarda expirable en DB y gatilla el email
        const data = await passwordService.requestPasswordReset(email.trim().toLowerCase());

        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, error);
    }
};

/* ======================================
 * VERIFY RESET CODE (VALIDAR CÓDIGO OTP)
 * ==================================== */
const verifyResetCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code || !code.trim()) {
            throw new Error("El código de verificación de recuperación es requerido");
        }

        // El servicio busca el código en DB, valida que no haya expirado y retorna confirmación
        const data = await passwordService.validateResetCode(code.trim());

        return successResponse(res, data);
    } catch (error) {
        // Retornamos un status 400 (Bad Request) si el código es inválido o expiró
        return errorResponse(res, error, 400);
    }
};

/* ======================================
 * RESET PASSWORD (RESTABLECER CON CÓDIGO VÁLIDO)
 * ==================================== */
const resetPassword = async (req, res) => {
    try {
        const { code, newPassword } = req.body;

        if (!code || !code.trim()) {
            throw new Error("El código de verificación es mandatorio");
        }
        if (!newPassword || newPassword.length < 8) {
            throw new Error("La nueva contraseña es requerida y debe tener al menos 8 caracteres");
        }

        // Procesa el cambio, hashea la nueva clave, limpia los tokens de uso único y cierra sesiones viejas
        const data = await passwordService.resetPasswordWithCode({
            code: code.trim(),
            newPassword
        });

        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, error, 400);
    }
};

/* ======================================
 * CHANGE PASSWORD (CAMBIO DENTRO DE LA SESIÓN PROTEGIDA)
 * ==================================== */
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; // Extraído por tu middleware de autenticación (auth)

        if (!currentPassword || !newPassword) {
            throw new Error("Ambas contraseñas (actual y nueva) son obligatorias");
        }
        if (newPassword.length < 8) {
            throw new Error("La nueva contraseña debe tener un mínimo de 8 caracteres");
        }

        const data = await passwordService.changeUserPassword({
            userId,
            currentPassword,
            newPassword
        });

        return successResponse(res, data);
    } catch (error) {
        return errorResponse(res, error, 400);
    }
};

// EXPORTACIÓN UNIFICADA BLINDADA: Conexión segura hacia controllers/auth.controller.js o las rutas
module.exports = {
    forgotPassword,
    verifyResetCode,
    resetPassword,
    changePassword
};