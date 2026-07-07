// modules/company/controllers/company.users.controller.js

const prisma = require("../../../prisma/client");


// OBTENER USUARIOS DE LA EMPRESA
exports.getCompanyUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                companyId: req.user.companyId,

                isDeleted: false,
            },

            orderBy: {
                createdAt: "desc",
            },

            // "select" funciona para devolver solo datos seguros (no devuelve contraseñas)
            select: {
                id: true,

                name: true,

                email: true,

                role: true,

                phone: true,

                isActive: true,

                createdAt: true,
            },
        });

        res.json({
            success: true,

            data: users,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,

            message: error.message,
        });
    }
};


// OBTENER ADMINISTRADORES


// Igual que la función anterior, pero filtra para traer solo a los jefes/administradores
exports.getAdmins = async (req, res) => {
    try {
        const admins = await prisma.user.findMany({
            where: {
                companyId: req.user.companyId,

                // El filtro clave: rol de administrador
                role: "ADMIN",

                isDeleted: false,
            },

            orderBy: {
                createdAt: "desc",
            },

            select: {
                id: true,

                name: true,

                email: true,

                role: true,

                phone: true,

                isActive: true,

                createdAt: true,
            },
        });

        res.json({
            success: true,

            data: admins,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,

            message: error.message,
        });
    }
};


// OBTENER EMPLEADOS


// Filtra la lista de usuarios para traer únicamente a los empleados regulares
exports.getEmployees = async (req, res) => {
    try {
        const employees = await prisma.user.findMany({
            where: {
                companyId: req.user.companyId,

                // El filtro clave: rol de empleado
                role: "EMPLOYEE",

                isDeleted: false,
            },

            orderBy: {
                createdAt: "desc",
            },

            select: {
                id: true,

                name: true,

                email: true,

                role: true,

                phone: true,

                isActive: true,

                createdAt: true,
            },
        });

        res.json({
            success: true,

            data: employees,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,

            message: error.message,
        });
    }
};


// OBTENER MI EMPRESA
exports.getMyCompany = async (req, res) => {
    try {
        const company = await prisma.company.findFirst({
            where: {
                // Busca usando el companyId asociado al usuario logueado
                id: req.user.companyId,

                isDeleted: false,
            },
        });

        if (!company) {
            return res.status(404).json({
                success: false,

                message: "Empresa no encontrada",
            });
        }

        res.json({
            success: true,

            data: company,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,

            message: error.message,
        });
    }
};