const prisma = require("../../../prisma/client");

const countProducts = async (companyId) => {
    return prisma.product.count({
        where: {
            companyId,
            isDeleted: false
        }
    });
};

const countCustomers = async (companyId) => {
    return prisma.customer.count({
        where: {
            companyId
        }
    });
};

const countSuppliers = async (companyId) => {
    return prisma.supplier.count({
        where: {
            companyId
        }
    });
};

const countBranches = async (companyId) => {
    return prisma.branch.count({
        where: {
            companyId,
            isDeleted: false
        }
    });
};

module.exports = {
    countProducts,
    countCustomers,
    countSuppliers,
    countBranches
};