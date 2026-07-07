const repository = require("../repositories/unit.repository"); // Apunta al index unificado del repositorio

exports.create = async (companyId, data) => {
    if (!data.name || !data.abbreviation) {
        throw new Error("El nombre y la abreviación son obligatorios");
    }

    // Lógica de negocio: Validar duplicados usando el helper del repositorio
    const exists = await repository.checkExists(data.name, data.abbreviation, companyId);

    if (exists) {
        throw new Error("La unidad ya existe");
    }

    // Retornamos la creación asegurando el companyId de la sesión
    return repository.create({
        ...data,
        companyId
    });
};

exports.update = async (id, companyId, data) => {
    if (Number.isNaN(id)) {
        throw new Error("ID inválido");
    }

    // Validamos que pertenezca a la empresa antes de actualizar
    const unit = await repository.getById(id, companyId);

    if (!unit) {
        throw new Error("Unidad no encontrada");
    }

    return repository.update(id, data);
};

exports.delete = async (id, companyId) => {
    if (Number.isNaN(id)) {
        throw new Error("ID inválido");
    }

    // Validamos pertenencia antes de aplicar el soft delete
    const unit = await repository.getById(id, companyId);

    if (!unit) {
        throw new Error("Unidad no encontrada");
    }

    return repository.delete(id);
};