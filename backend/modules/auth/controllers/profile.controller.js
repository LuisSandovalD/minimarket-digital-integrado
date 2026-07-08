const cloudinary = require("../../../config/cloudinary");
const prisma = require("../../../config/prisma.config");
const bcrypt = require("bcryptjs");
const profileService = require("../services/profile.service");
const { successResponse, errorResponse } = require("../responses/auth.response");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "users_avatars" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

const getProfile = async (req, res) => {
  try {
    const data = await profileService.getProfile(req.user.id);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "La contraseña es mandatoria para confirmar la baja de tu perfil corporativo."
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "El usuario solicitado no existe o ya ha sido dado de baja previamente."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta. No se ha podido procesar la baja de la cuenta."
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        isDeleted: true,
        isOnline: false,
        deletedAt: new Date()
      }
    });

    return successResponse(res, {
      message: "Tu cuenta ha sido dada de baja del sistema de Don Luchito S.A.C. con éxito.",
      userId: updatedUser.id
    });

  } catch (error) {
    console.error("❌ Error Crítico en Soft Delete:", error);
    return errorResponse(res, error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const dataToUpdate = { ...req.body };

    if (req.file) {
      dataToUpdate.avatar = await uploadToCloudinary(req.file.buffer);
    }

    const updatedUser = await profileService.updateProfile(req.user.id, dataToUpdate);

    return successResponse(res, {
      message: "Perfil corporativo actualizado con éxito.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar
      }
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getAccountStatus = async (req, res) => {
  try {
    const data = await profileService.getAccountStatus(req.user.id);
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount,
  getAccountStatus
};