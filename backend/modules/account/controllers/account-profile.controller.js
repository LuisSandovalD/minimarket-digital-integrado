const service = require("../services/account.service");
const { updateProfileValidation } = require("../validations/account.validation");

exports.getMyAccount = async (req, res) => {
    try {
        const user = await service.getMyAccount(req.user.id);

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("GET ACCOUNT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Error obteniendo cuenta",
        });
    }
};

exports.updateMyAccount = async (req, res) => {
    try {
        updateProfileValidation(req.body);
        const updatedUser = await service.updateMyAccount(req.user.id, req.body);

        return res.status(200).json({
            success: true,
            message: "Cuenta actualizada correctamente",
            user: updatedUser,
        });
    } catch (error) {
        console.error("UPDATE ACCOUNT ERROR:", error);

        if (error.message === "El correo ya está en uso") {
            return res.status(400).json({ success: false, message: error.message });
        }
        return res.status(500).json({
            success: false,
            message: "Error actualizando cuenta",
        });
    }
};