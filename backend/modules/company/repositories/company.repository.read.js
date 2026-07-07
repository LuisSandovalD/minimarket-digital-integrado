const prisma = require("../../../prisma/client");

// OBTENER TODAS LAS EMPRESAS
exports.getAll = () => {
    return prisma.company.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

// OBTENER EMPRESA POR ID
exports.getById = (id) => {
    return prisma.company.findFirst({
        where: {
            id,
            isDeleted: false,
        },
    });
};

// OBTENER EMPRESA POR SLUG
exports.getBySlug = (slug) => {
    return prisma.company.findFirst({
        where: {
            slug,
            isDeleted: false,
            isActive: true,
        },
    });
};


// OBTENER MI EMPRESA
exports.getMyCompany = (companyId) => {
    return prisma.company.findFirst({
        where: {
            id: companyId,
            isDeleted: false,
        },
    });
};

// VERIFICAR SI EXISTE EMPRESA
exports.exists = (id) => {
    return prisma.company.findFirst({
        where: {
            id,
            isDeleted: false,
        },
        select: {
            id: true,
        },
    });
};


// OBTENER USUARIOS DE LA EMPRESA
exports.getUsers = (companyId) => {
    return prisma.user.findMany({
        where: {
            companyId,
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
};

// OBTENER ADMINISTRADORES
exports.getAdmins = (companyId) => {
    return prisma.user.findMany({
        where: {
            companyId,
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
};

// OBTENER EMPLEADOS
exports.getEmployees = (companyId) => {
    return prisma.user.findMany({
        where: {
            companyId,
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
};

// OBTENER NOMBRES DE EMPRESAS (PÚBLICO)
exports.getPublicCompanies = () => {
    return prisma.company.findMany({
        where: {
            isDeleted: false,
            isActive: true,
        },
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });
};