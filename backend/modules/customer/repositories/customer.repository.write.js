const prisma = require("../../../prisma/client");

const { customerSelect } = require("../includes/customer.include");


// CREAR CLIENTE
exports.create = (data) => {
    return prisma.customer.create({
        data,
        select: customerSelect,
    });
};


// ACTUALIZAR CLIENTE
exports.update = (id, data) => {
    return prisma.customer.update({
        where: {
            id,
        },
        data,
        select: customerSelect,
    });
};


// ELIMINAR CLIENTE (SOFT DELETE)
exports.delete = (id) => {
    return prisma.customer.update({
        where: {
            id,
        },
        data: {
            deletedAt: new Date(),
        },
    });
};