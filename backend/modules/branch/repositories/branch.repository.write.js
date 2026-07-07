const prisma = require("../../../prisma/client");

// ========================================
// CREAR SUCURSAL
// ========================================
exports.create = (data) => {
    return prisma.branch.create({
        data: {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            logo: data.logo,
            description: data.description,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
            companyId: Number(data.companyId), // 🛡️ Aseguramos que sea entero
        },
    });
};

// ========================================
// ACTUALIZAR SUCURSAL
// ========================================
exports.update = (id, data) => {
    // Desestructuramos para evitar cambiar accidentalmente el ID o CompanyId
    const { id: _, companyId: __, createdAt, ...updateData } = data;

    return prisma.branch.update({
        where: {
            id: Number(id), // 🛡️ Crucial: Forzamos a Number para evitar fallos de Prisma
        },
        // Al usar el spread, solo actualizamos lo que viene en el req.body
        data: {
            ...updateData,
            updatedAt: new Date(), // Prisma suele manejar esto solo, pero forzarlo está bien
        },
    });
};

// ========================================
// ELIMINAR SUCURSAL (SOFT DELETE)
// ========================================
exports.softDelete = (id) => {
    return prisma.branch.update({
        where: {
            id: Number(id), // 🛡️ Forzamos a Number
        },
        data: {
            deletedAt: new Date(),
        },
    });
};