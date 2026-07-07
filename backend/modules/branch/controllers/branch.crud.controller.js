const branchService = require("../services/branch.service");

// OBTENER SUCURSALES
exports.getBranches = async (req, res) => {
    try {
        const { companyId } = req.user;

        const {
            search,
            city,
            country,
            isActive,
            page,
            limit,
        } = req.query;

        const options = {
            search,
            city,
            country,
            isActive:
                isActive !== undefined
                    ? isActive === "true"
                    : undefined,
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
        };

        const data = await branchService.getBranches(companyId, options);

        return res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Error obteniendo sucursales:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor.",
        });
    }
};
// OBTENER SUCURSAL POR ID
exports.getBranchById = async (req, res) => {
    try {
        const branchId = Number(req.params.id);

        if (Number.isNaN(branchId)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        const data = await branchService.getBranchById(
            branchId,
            req.user.companyId
        );

        return res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Sucursal no encontrada") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// CREAR SUCURSAL
exports.createBranch = async (req, res) => {
    try {

        const data = {
            ...req.body,
            logo: req.file ? req.file.buffer : null,
        };

        const branch = await branchService.createBranch(
            data,
            req.user.companyId
        );

        return res.status(201).json({
            success: true,
            data: branch,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ACTUALIZAR SUCURSAL
exports.updateBranch = async (req, res) => {
    try {

        const branchId = Number(req.params.id);

        if (Number.isNaN(branchId)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        const data = {
            ...req.body,
        };

        if (req.file) {
            data.logo = req.file.buffer;
        }

        const branch = await branchService.updateBranch(
            branchId,
            data,
            req.user.companyId
        );

        return res.json({
            success: true,
            data: branch,
        });

    } catch (error) {
        console.error(error);

        if (error.message === "Sucursal no encontrada") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ELIMINAR SUCURSAL
exports.deleteBranch = async (req, res) => {
    try {
        const branchId = Number(req.params.id);

        if (Number.isNaN(branchId)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        await branchService.deleteBranch(
            branchId,
            req.user.companyId
        );

        return res.json({
            success: true,
            message: "Sucursal eliminada correctamente",
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Sucursal no encontrada") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};