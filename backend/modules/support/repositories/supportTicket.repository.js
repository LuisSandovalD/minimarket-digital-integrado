// repositories/supportTicket.repository.js

const prisma =
    require("../../../prisma/client");

const findAll = (
    companyId
) => {
    return prisma.supportTicket.findMany(
        {
            where: {
                companyId,
                deletedAt: null,
            },

            include: {
                user: true,
                assignedUser: true,
            },

            orderBy: {
                updatedAt: "desc",
            },
        }
    );
};

const findById = (
    id,
    companyId
) => {
    return prisma.supportTicket.findFirst(
        {
            where: {
                id,
                companyId,
                deletedAt: null,
            },

            include: {
                user: true,
                assignedUser: true,

                comments: {
                    include: {
                        user: true,
                    },

                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        }
    );
};

const create = (data) => {
    return prisma.supportTicket.create({
        data,
    });
};

const update = (
    id,
    data
) => {
    return prisma.supportTicket.update({
        where: {
            id,
        },

        data,
    });
};

const remove = (id) => {
    return prisma.supportTicket.update({
        where: {
            id,
        },

        data: {
            deletedAt:
                new Date(),
        },
    });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};