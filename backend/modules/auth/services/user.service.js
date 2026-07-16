// ========================================
// services/user.service.js
// ========================================

const bcrypt = require("bcryptjs");

// Importación de los sub-repositorios especializados necesarios
const userRepository = require("../repositories/user.repository");
const userAuthRepository = require("../repositories/user-auth.repository");

const config = require("../config/auth.config");
const { sanitizeUser: runSanitizer } = require("../utils/sanitizers/user.sanitizer");

// 🚀 IMPORTACIÓN DE CONFIGURACIÓN DE CORREO (Siguiendo el ejemplo de registro)
const { sendEmail } = require("../../../config/email.config");

/* ======================================
 * PLANTILLAS DE CORREO ELECTRÓNICO
 * ==================================== */
const sendNewUserWelcomeEmail = async ({ email, name }) => {
  return await sendEmail({
    to: email,
    subject: "¡Bienvenido! - Tu cuenta ha sido creada",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb;">¡Hola, ${name}!</h2>
        <p>Un administrador ha creado una cuenta para ti en la plataforma de <strong>Minimarket Digital Integrado</strong>.</p>
        <p>Ya puedes acceder al sistema utilizando tu correo electrónico institucional o registrado y la contraseña que te haya asignado tu administrador.</p>
        <p>Te recomendamos cambiar tu contraseña una vez que ingreses por primera vez.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje generado automáticamente, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

const sendPasswordChangedEmail = async ({ email, name }) => {
  return await sendEmail({
    to: email,
    subject: "Aviso de Seguridad: Contraseña Actualizada",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #dc2626;">Aviso de Seguridad</h2>
        <p>Hola, <strong>${name}</strong>.</p>
        <p>Te informamos que la contraseña de tu cuenta asociada a este correo electrónico ha sido modificada con éxito.</p>
        <p style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 10px; color: #991b1b;">
          <strong>¿No fuiste tú?</strong> Si no solicitaste este cambio, ponte en contacto con el administrador de tu empresa inmediatamente para asegurar tu cuenta.
        </p>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un mensaje generado automáticamente, por favor no respondas directamente a él.</small>
      </div>
    `,
  });
};

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
  // Guardamos el retorno de la DB exactamente igual
  const newUser = await userRepository.createUser({
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

  // 🚀 ENVÍO SEGURO DE CORREO DE CREACIÓN
  try {
    await sendNewUserWelcomeEmail({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (emailError) {
    // Bloque aislado: Evita que un error del proveedor de correos rompa el flujo de creación exitoso
    console.error("⚠️ Error asíncrono enviando correo de bienvenida al nuevo usuario:", emailError.message || emailError);
  }

  return newUser;
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
  const updatedUser = await userAuthRepository.updatePassword(id, hashedPassword);

  // 🚀 ENVÍO SEGURO DE CORREO DE CAMBIO DE CONTRASEÑA
  try {
    await sendPasswordChangedEmail({
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } catch (emailError) {
    // Bloque aislado
    console.error("⚠️ Error asíncrono enviando alerta de cambio de contraseña:", emailError.message || emailError);
  }

  return updatedUser;
};

/* ======================================
 * SANITIZACIÓN
 * ==================================== */
const sanitizeUser = (user) => {
  return runSanitizer(user);
};

// EXPORTACIÓN UNIFICADA
module.exports = {
  hashPassword,
  validatePassword,
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  updatePassword,
  sanitizeUser,
};
