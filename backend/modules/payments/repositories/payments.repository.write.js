// ========================================
// PAYMENTS REPOSITORY - WRITE (COMMANDS)
// ========================================

const prisma = require("../../../prisma/client");
const paymentInclude = require("../includes/payments.include")

// ========================================
// WRITE METHODS
// ========================================

const create = async (data) => {
    return prisma.payment.create({
        data,
        include: paymentInclude,
    });
};

const update = async (id, data) => {
    return prisma.payment.update({
        where: { id },
        data,
        include: paymentInclude,
    });
};

const remove = async (id) => {
    return prisma.payment.delete({
        where: { id },
    });
};

module.exports = {
    create,
    update,
    delete: remove,
};