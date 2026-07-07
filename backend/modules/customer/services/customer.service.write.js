const repository = require("../repositories/customer.repository");


// CREAR CLIENTE
exports.create = async (data) => {
    if (!data.name) {
        throw new Error("El nombre es obligatorio");
    }

    return repository.create(data);
};


// ACTUALIZAR CLIENTE
exports.update = async (id, companyId, data) => {
    if (Number.isNaN(id)) {
        throw new Error("ID inválido");
    }

    const customer = await repository.getById(id, companyId);

    if (!customer) {
        throw new Error("Cliente no encontrado");
    }

    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.documentType !== undefined) updateData.documentType = data.documentType;
    if (data.documentNumber !== undefined) updateData.documentNumber = data.documentNumber;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.country !== undefined) updateData.country = data.country;
    if (data.postalCode !== undefined) updateData.postalCode = data.postalCode;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return repository.update(id, updateData);
};


// ELIMINAR CLIENTE
exports.delete = async (id, companyId) => {
    if (Number.isNaN(id)) {
        throw new Error("ID inválido");
    }

    const customer = await repository.getById(id, companyId);

    if (!customer) {
        throw new Error("Cliente no encontrado");
    }

    return repository.delete(id);
};