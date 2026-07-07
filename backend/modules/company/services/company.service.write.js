const repository = require("../repositories/company.repository");

// CREAR EMPRESA
exports.create = async (data) => {
    return repository.create(data);
};

// ACTUALIZAR EMPRESA
exports.update = async (id, data) => {
    return repository.update(id, data);
};

// ELIMINAR EMPRESA (SOFT DELETE)
exports.softDelete = async (id) => {
    return repository.softDelete(id);
};