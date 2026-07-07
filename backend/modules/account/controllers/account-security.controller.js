const service = require("../services/account.service");
const {
    changePasswordValidation,
    twoFactorValidation,
    deleteAccountValidation,
} = require("../validations/account.validation");

exports.updatePassword = async (req, res) => {
    try {
        changePasswordValidation(req.body);
        await service.updatePassword(req.user.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada correctamente",
        });
    } catch (error) {
        console.error("UPDATE PASSWORD ERROR:", error);

        if (error.message === "Contraseña actual incorrecta" || error.message === "Usuario no encontrado") {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({
            success: false,
            message: "Error actualizando contraseña",
        });
    }
};

exports.toggleTwoFactor = async (req, res) => {
    try {
        twoFactorValidation({ enabled: req.body.enabled });
        const result = await service.toggleTwoFactor(req.user.id, req.body.enabled);

        return res.status(200).json({
            success: true,
            message: result.enabled ? "Autenticación 2FA activada" : "Autenticación 2FA desactivada",
            twoFactorEnabled: result.enabled,
        });
    } catch (error) {
        console.error("2FA ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Error actualizando 2FA",
        });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await service.getSessions(req.user.id);

        return res.status(200).json({
            success: true,
            sessions,
        });
    } catch (error) {
        console.error("GET SESSIONS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Error obteniendo sesiones",
        });
    }
};

exports.closeSession = async (req, res) => {
    try {
        const sessionId = Number(req.params.id);
        await service.revokeSession(req.user.id, sessionId); // Cambiado a revokeSession para coincidir con tu servicio

        return res.status(200).json({
            success: true,
            message: "Sesión cerrada correctamente",
        });
    } catch (error) {
        console.error("CLOSE SESSION ERROR:", error);

        if (error.message === "Sesión no encontrada") {
            return res.status(404).json({ success: false, message: error.message });
        }
        return res.status(500).json({
            success: false,
            message: "Error cerrando sesión",
        });
    }
};

exports.deleteMyAccount = async (req, res) => {
    try {
        deleteAccountValidation(req.body);
        await service.deleteMyAccount(req.user.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Cuenta eliminada correctamente",
        });
    } catch (error) {
        console.error("DELETE ACCOUNT ERROR:", error);

        if (error.message === "Contraseña incorrecta" || error.message === "Usuario no encontrado") {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({
            success: false,
            message: "Error eliminando cuenta",
        });
    }
};