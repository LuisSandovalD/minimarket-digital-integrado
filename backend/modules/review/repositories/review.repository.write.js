const prisma = require("../../../prisma/client");

exports.create = async (data) => {
    return prisma.review.create({
        data,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                    email: true,
                },
            },
        },
    });
};

exports.update = async (id, data) => {
    return prisma.review.update({
        where: {
            id: Number(id),
        },
        data,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                    email: true,
                },
            },
        },
    });
};

exports.delete = async (id) => {
    return prisma.review.delete({
        where: {
            id: Number(id),
        },
    });
};