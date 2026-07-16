// ========================================
// services/account.service.js
// ========================================

const bcrypt = require("bcryptjs");
const repository = require("../repositories/account.repository");
const mapper = require("../utils/account.mapper");
const {
  updateProfileValidation,
  changePasswordValidation,
  deleteAccountValidation,
} = require("../validations/account.validation");

// IMPORTAMOS EL CLIENTE BASE DE CORREO
const { sendEmail } = require("../../../config/email.config");

exports.updateMyAccount = async (userId, data) => {
  updateProfileValidation(data);

  const exists = await repository.checkEmailDuplicate(userId, data.email);
  if (exists) {
    throw new Error("El correo ya está en uso");
  }

  const updated = await repository.updateProfile(userId, data);

  await repository.createAuditLog({
    action: "UPDATE",
    entityType: "USER",
    entityId: updated.id,
    description: "Actualización de perfil",
    userId: updated.id,
    companyId: updated.companyId,
    branchId: updated.branchId,
  });

  return mapper(updated);
};

/* ======================================
 * ACTUALIZAR CONTRASEÑA (Con Alerta de Seguridad)
 * ==================================== */
exports.updatePassword = async (userId, data) => {
  changePasswordValidation(data);

  const user = await repository.getByIdBasic(userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const valid = await bcrypt.compare(data.currentPassword, user.password);
  if (!valid) {
    throw new Error("Contraseña actual incorrecta");
  }

  const hashed = await bcrypt.hash(data.newPassword, 10);
  await repository.updatePassword(userId, hashed);

  await repository.createAuditLog({
    action: "UPDATE",
    entityType: "PASSWORD",
    entityId: userId,
    description: "Cambio de contraseña",
    userId: userId,
    companyId: user.companyId,
    branchId: user.branchId,
  });

  // 📬 Alerta de seguridad asíncrona
  if (user.email) {
    sendEmail({
      to: user.email,
      subject: "🚨 Alerta de Seguridad: Tu contraseña ha sido cambiada",
      html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: #dc2626;">Aviso de Seguridad</h2>
                    <p>Hola, ${user.name || "Usuario"}. Te informamos que la contraseña de tu cuenta en **ERP POS System** se ha cambiado recientemente con éxito.</p>
                    
                    <div style="background-color: #fef2f2; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #dc2626;">
                        <p style="margin: 0; color: #991b1b; font-weight: bold;">¿No fuiste tú?</p>
                        <p style="margin: 4px 0 0 0; color: #7f1d1d; font-size: 14px;">Si no solicitaste este cambio, ponte en contacto inmediato con el administrador de tu empresa o el equipo de soporte técnico para congelar tu cuenta.</p>
                    </div>

                    <p style="font-size: 13px; color: #64748b;">Fecha del evento: ${new Date().toLocaleString()}</p>
                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Seguridad de Cuentas - ERP POS System</small>
                </div>
            `,
    }).catch(err => console.error("⚠️ Error enviando alerta de cambio de clave:", err.message));
  }
};

exports.revokeSession = async (userId, sessionId) => {
  const session = await repository.getSessionByIdAndUser(userId, sessionId);
  if (!session) {
    throw new Error("Sesión no encontrada");
  }

  await repository.updateSessionStatus(sessionId, false);
};

exports.enable2FA = async (userId) => {
  await repository.update2FAStatus(userId, true);
};

exports.disable2FA = async (userId) => {
  await repository.update2FAStatus(userId, false);
};

exports.deleteMyAccount = async (userId, data) => {
  deleteAccountValidation(data);

  const user = await repository.getByIdBasic(userId);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) {
    throw new Error("Contraseña incorrecta");
  }

  await repository.softDeleteAccount(userId);
  await repository.revokeAllUserSessions(userId);

  await repository.createAuditLog({
    action: "SOFT_DELETE",
    entityType: "USER",
    entityId: userId,
    description: "Eliminación de cuenta",
    userId: userId,
    companyId: user.companyId,
    branchId: user.branchId,
  });
};

/* ======================================
 * CAMBIAR ESTADO DE 2FA (Con Notificación Informativa)
 * ==================================== */
exports.toggleTwoFactor = async (userId, enabled) => {
  const updatedUser = await repository.update2FAStatus(userId, enabled);

  await repository.createAuditLog({
    action: "UPDATE",
    entityType: "USER_2FA",
    entityId: updatedUser.id,
    description: enabled ? "2FA activado" : "2FA desactivado",
    userId: updatedUser.id,
    companyId: updatedUser.companyId,
    branchId: updatedUser.branchId,
  });

  // 📬 Alerta informativa asíncrona
  if (updatedUser.email) {
    sendEmail({
      to: updatedUser.email,
      subject: enabled ? "🔒 Verificación en dos pasos (2FA) Activada" : "⚠️ Verificación en dos pasos (2FA) Desactivada",
      html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                    <h2 style="color: ${enabled ? "#16a34a" : "#d97706"};">${enabled ? "¡Seguridad Mejorada!" : "Aviso de Seguridad"}</h2>
                    <p>Hola, ${updatedUser.name}. Te notificamos que el estado de la autenticación de doble factor (2FA) en tu cuenta ha cambiado.</p>
                    
                    <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid ${enabled ? "#16a34a" : "#d97706"};">
                        <p style="margin: 0;"><strong>Estado actual:</strong> ${enabled ? "ACTIVADO 🔒" : "DESACTIVADO ⚠️"}</p>
                        <p style="margin: 6px 0 0 0; font-size: 14px; color: #475569;">
                            ${enabled
    ? "A partir de ahora, cada vez que inicies sesión se te solicitará el código temporal de tu aplicación Authenticator o código de correo."
    : "Tu cuenta ahora es más vulnerable. Te sugerimos volver a activar el 2FA lo antes posible para proteger tu información."}
                        </p>
                    </div>

                    <br>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                    <small style="color: #94a3b8;">Seguridad de Cuentas - ERP POS System</small>
                </div>
            `,
    }).catch(err => console.error("⚠️ Error enviando alerta de estado 2FA:", err.message));
  }

  return { enabled };
};
