const service = require("../services/customer.service");


exports.getCustomers = async (req, res) => {
    try {
        const result = await service.getAll(
            req.user.companyId,
            req.query
        );

        return res.status(200).json({
            success: true,
            message: "Clientes obtenidos correctamente.",
            ...result,
        });
    } catch (error) {
        console.error("Error al obtener clientes:", error);

        return res.status(500).json({
            success: false,
            message: "Error al obtener los clientes.",
            error: error.message,
        });
    }
};


// OBTENER CLIENTE POR ID
exports.getCustomerById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        const customer = await service.getById(
            id,
            req.user.companyId
        );

        return res.json({
            success: true,
            data: customer,
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Cliente no encontrado") {
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


// CREAR CLIENTE
exports.createCustomer = async (req, res) => {
    try {
        const customer = await service.create({
            ...req.body,
            companyId: req.user.companyId,
        });

        return res.status(201).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ACTUALIZAR CLIENTE
exports.updateCustomer = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        const customer = await service.update(
            id,
            req.user.companyId,
            req.body
        );

        return res.json({
            success: true,
            data: customer,
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Cliente no encontrado") {
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


// ELIMINAR CLIENTE
exports.deleteCustomer = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID inválido",
            });
        }

        await service.delete(
            id,
            req.user.companyId
        );

        return res.json({
            success: true,
            message: "Cliente eliminado correctamente",
        });
    } catch (error) {
        console.error(error);

        if (error.message === "Cliente no encontrado") {
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