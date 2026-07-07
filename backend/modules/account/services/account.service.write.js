const bcrypt = require("bcryptjs");
const repository = require("../repositories/account.repository");
const mapper = require("../utils/account.mapper");
const {
    updateProfileValidation,
    changePasswordValidation,
    deleteAccountValidation,
} = require("../validations/account.validation");

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

    return { enabled };
};