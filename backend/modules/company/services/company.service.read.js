const repository = require("../repositories/company.repository");

// OBTENER TODAS LAS EMPRESAS
exports.getAll = async () => {
    return repository.getAll();
};

// OBTENER EMPRESA POR ID
exports.getById = async (id) => {
    return repository.getById(id);
};

// OBTENER EMPRESA POR SLUG
exports.getBySlug = async (slug) => {
    return repository.getBySlug(slug);
};

// OBTENER MI EMPRESA
exports.getMyCompany = async (companyId) => {
    return repository.getMyCompany(companyId);
};

// OBTENER USUARIOS DE LA EMPRESA
exports.getUsers = async (companyId) => {
    return repository.getUsers(companyId);
};

// OBTENER ADMINISTRADORES
exports.getAdmins = async (companyId) => {
    return repository.getAdmins(companyId);
};

// OBTENER EMPLEADOS
exports.getEmployees = async (companyId) => {
    return repository.getEmployees(companyId);
};

// OBTENER EMPRESAS PÚBLICAS
exports.getPublicCompanies = async () => {
    return repository.getPublicCompanies();
};