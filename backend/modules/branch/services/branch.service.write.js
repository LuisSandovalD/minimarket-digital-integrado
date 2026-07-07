// ========================================
// branch.service.js
// ========================================

const repository = require("../repositories/branch.repository");
const { generateSlug } = require("../../../utils/helpers");
const uploadImage = require("../../../utils/cloudinaryUpload");

// CREAR SUCURSAL
exports.createBranch = async (data, companyId) => {
    if (!data.name) {
        throw new Error("El nombre es obligatorio");
    }

    let logo = null;
    if (data.logo) {
        const result = await uploadImage(data.logo, "branches");
        logo = result.secure_url;
    }

    return repository.create({
        name: data.name,
        slug: generateSlug(data.name),
        code: data.code ?? null,
        logo,
        description: data.description ?? null,
        address: data.address ?? null,
        phone: data.phone ?? null,
        email: data.email ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        country: data.country ?? null,
        postalCode: data.postalCode ?? null,
        companyId: Number(companyId), // Aseguramos entero
    });
};

// ACTUALIZAR SUCURSAL
exports.updateBranch = async (id, data, companyId) => {
    const branchId = Number(id);

    // 🛡️ Corrección Crítica: Validar si la conversión a número dio un NaN real
    if (isNaN(branchId)) {
        throw new Error("ID inválido");
    }

    // Buscamos usando el ID parseado a número
    const branch = await repository.findById(branchId, Number(companyId));

    if (!branch) {
        throw new Error("Sucursal no encontrada");
    }

    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.code !== undefined) updateData.code = data.code;

    // Procesamiento del logo en Cloudinary
    if (data.logo) {
        const result = await uploadImage(data.logo, "branches");
        updateData.logo = result.secure_url;
    }

    if (data.description !== undefined) updateData.description = data.description;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.country !== undefined) updateData.country = data.country;
    if (data.postalCode !== undefined) updateData.postalCode = data.postalCode;

    if (data.name && data.name !== branch.name) {
        updateData.slug = generateSlug(data.name);
    }

    return repository.update(branchId, updateData);
};

// ELIMINAR SUCURSAL
exports.deleteBranch = async (id, companyId) => {
    const branchId = Number(id);

    // 🛡️ Corrección Crítica
    if (isNaN(branchId)) {
        throw new Error("ID inválido");
    }

    const branch = await repository.findById(branchId, Number(companyId));

    if (!branch) {
        throw new Error("Sucursal no encontrada");
    }

    return repository.softDelete(branchId);
};