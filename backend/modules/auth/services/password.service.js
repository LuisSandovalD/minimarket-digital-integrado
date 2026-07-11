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

// CONFIGURACIÓN CENTRALIZADA DE ENVÍO DE CORREOS (BREVO API)
const { sendEmail } = require("../../../config/email.config");

/* ======================================
 * SOLICITAR RECUPERACIÓN DE CONTRASEÑA
 * ==================================== */
const requestPasswordReset = async (email) => {

    const user = await userRepository.findUserByEmail(email);

    // Mitigación de Enumeración de Usuarios (Seguridad): Respondemos lo mismo exista o no el correo
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
        Date.now() + (15 * 60 * 1000) // 15 Minutos de vida útil
    );

    await userCryptoRepository.savePasswordResetCode(
        user.id,
        resetCode,
        expiresAt
    );

    // 🚀 SIN AWAIT: El proceso se delega en segundo plano inmediatamente sin retrasar el frontend
    sendEmail({
        to: user.email,
        subject: `🔄 Código de recuperación de contraseña: ${resetCode}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #2563eb; margin: 0;">Restablecer Contraseña</h2>
                    <p style="color: #64748b; font-size: 14px;">Solicitud de seguridad - ERP POS System</p>
                </div>
                
                <p>Hola, <strong>${user.name || 'Usuario'}</strong>. Recibimos una solicitud para restablecer la contraseña de tu cuenta de acceso.</p>
                <p>Ingresa el siguiente código de verificación en el formulario del sistema para proceder con el cambio:</p>
                
                <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 1px dashed #cbd5e1;">
                    <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0f172a;">${resetCode}</span>
                </div>

                <p style="font-size: 13px; color: #ef4444; font-weight: bold;">⚠️ Este código es de un solo uso y expirará automáticamente en 15 minutos.</p>
                
                <div style="background-color: #fef3c7; padding: 12px; border-left: 4px solid #d97706; border-radius: 4px; margin-top: 15px; font-size: 13px; color: #92400e;">
                    <strong>¿No solicitaste este cambio?</strong> Si tú no iniciaste esta acción, ignora este correo. Tu contraseña sigue siendo segura y nadie tiene acceso a ella.
                </div>

                <br>
                <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                <small style="color: #94a3b8;">Centro de Autenticación • ERP POS System</small>
            </div>
        `
    }).catch(error => {
        console.error("⚠️ Error en segundo plano al enviar código de recuperación vía Brevo:", error.message || error);
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
 * RESTABLECER CONTRASEÑA (Por código de olvido)
 * ==================================== */
const resetPasswordWithCode = async ({ code, newPassword }) => {

    const user = await userCryptoRepository.findResetCode(code);

    if (!user) {
        throw new Error("Operación inválida: El código expiró");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualiza la contraseña mediante el repositorio de autenticación/seguridad
    await userAuthRepository.updatePassword(user.id, hashedPassword);

    // Limpia el código usado mediante el repositorio criptográfico
    await userCryptoRepository.markResetCodeAsUsed(user.id);

    // Cierra todas las sesiones mediante el repositorio de sesiones dedicado (Seguridad absoluta)
    await sessionRepository.deactivateAllSessions(user.id);

    // 📬 Alerta de confirmación exitosa
    if (user.email) {
        sendEmail({
            to: user.email,
            subject: "✅ Tu contraseña ha sido restablecida con éxito",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #16a34a;">Contraseña Actualizada</h2>
                    <p>Hola, ${user.name}. Te informamos que tu contraseña ha sido modificada mediante el proceso de recuperación.</p>
                    <p>Como medida de protección, **hemos cerrado todas las sesiones activas** en tus teléfonos o computadoras vinculadas.</p>
                    
                    <p>Ya puedes iniciar sesión nuevamente en tu panel de control utilizando tus nuevas credenciales.</p>
                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Centro de Autenticación • ERP POS System</small>
                </div>
            `
        }).catch(err => console.error("⚠️ Error notificando éxito de recuperación:", err.message));
    }

    return {
        success: true,
        message: "Contraseña restablecida exitosamente. Inicie sesión con sus nuevas credenciales"
    };
};

/* ======================================
 * CAMBIAR CONTRASEÑA (Dentro del panel de usuario)
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

    // 📬 Alerta de seguridad por cambio manual
    if (user.email) {
        sendEmail({
            to: user.email,
            subject: "🔒 Tu contraseña de seguridad fue modificada",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #1e293b;">Confirmación de Cambio</h2>
                    <p>Hola, ${user.name}. Te notificamos que tu contraseña de acceso para **ERP POS System** se ha cambiado manualmente desde las configuraciones internas de tu perfil.</p>
                    <p>Si realizaste este cambio, no debes hacer nada más.</p>
                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Centro de Autenticación • ERP POS System</small>
                </div>
            `
        }).catch(err => console.error("⚠️ Error notificando cambio manual de clave:", err.message));
    }

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