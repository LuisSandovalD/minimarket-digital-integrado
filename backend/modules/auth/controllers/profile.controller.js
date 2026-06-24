// ========================================
// controllers/profile.controller.js
// ========================================

// 🚀 IMPORTACIÓN CORRECTA: Usamos tu instancia extendida centralizada con auditoría automática
const prisma = require("../../../config/prisma.config"); // 👈 Ajusta los ../ si tu estructura de carpetas varía
const bcrypt = require("bcryptjs");

const profileService = require("../services/profile.service");
const { successResponse, errorResponse } = require("../responses/auth.response");

/**
 * 👤 Obtener datos del perfil del usuario autenticado
 */
const getProfile = async (req, res) => {
  try {
    const data = await profileService.getProfile(req.user.id);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * 🛑 softDeleteAccount / deleteAccount
 * Realiza la baja lógica de un usuario del ERP detonando la auditoría automatizada.
 */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Extraído de forma segura por el middleware 'auth'
    const { password } = req.body; // Recibe el objeto estructurado { password: "..." } desde el frontend

    // 1. Validación básica de entrada
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "La contraseña es mandatoria para confirmar la baja de tu perfil corporativo."
      });
    }

    // 2. Buscar al usuario activo en la base de datos a través del cliente extendido
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "El usuario solicitado no existe o ya ha sido dado de baja previamente."
      });
    }

    // 3. Verificar que la contraseña coincida con el hash almacenado
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta. No se ha podido procesar la baja de la cuenta."
      });
    }

    // 4. ¡SOFT DELETE INTEGRADO CON PRISMA EXTENSIONS!
    // Al pasar 'isDeleted: true', tu extensión registrará automáticamente la acción "SOFT_DELETE" en AuditLog.
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,       // Inhabilita la cuenta para operaciones diarias
        isDeleted: true,       // Lo oculta de las listas de personal del ERP
        isOnline: false,       // Corta la sesión visual inmediata
        deletedAt: new Date()  // Almacena marca de tiempo histórica por auditoría externa
      }
    });

    // 5. Responder utilizando tu estandarización de respuestas corporativas
    return successResponse(res, {
      message: "Tu cuenta ha sido dada de baja del sistema de Don Luchito S.A.C. con éxito.",
      userId: updatedUser.id
    });

  } catch (error) {
    console.error("❌ Error Crítico en Soft Delete:", error);
    return errorResponse(res, error);
  }
};

/**
 * ✏️ Actualizar datos del perfil
 */
const updateProfile = async (req, res) => {
  try {
    const data = await profileService.updateProfile(req.user.id, req.body);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

/**
 * 📈 Obtener estado general de la cuenta corporativa
 */
const getAccountStatus = async (req, res) => {
  try {
    const data = await profileService.getAccountStatus(req.user.id);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

// EXPORTACIÓN UNIFICADA SIN ERRORES EN FRÍO
module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getAccountStatus
};