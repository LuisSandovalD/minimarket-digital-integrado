const prisma = require("../../../prisma/client");

exports.findById = (id, companyId) => {
    return prisma.supplier.findFirst({
        where: {
            id: Number(id),
            companyId: Number(companyId),
            deletedAt: null,
        },
    });
}

exports.findByName = (name, companyId) => {
    return prisma.supplier.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
            companyId: Number(companyId),
            deletedAt: null,
        },
    });
}

exports.findByRuc = (ruc, companyId) => {
    return prisma.supplier.findFirst({
        where: {
            ruc,
            companyId: Number(companyId),
            deletedAt: null,
        },
    });
}

exports.getAll = (companyId, filters = {}) => {
    const {
        search,
        isActive,
        page = 1,
        limit = 10,
    } = filters;

    const skip = (page - 1) * limit;

    return prisma.supplier.findMany({
        where: {
            companyId: Number(companyId),
            deletedAt: null,

            ...(typeof isActive === "boolean" && {
                isActive,
            }),

            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        ruc: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        contactPerson: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        },

        skip: Number(skip),
        take: Number(limit),

        orderBy: {
            createdAt: "desc",
        },
    });
}

exports.count = (companyId, filters = {}) => {
    const {
        search,
        isActive,
    } = filters;

    return prisma.supplier.count({
        where: {
            companyId: Number(companyId),
            deletedAt: null,

            ...(typeof isActive === "boolean" && {
                isActive,
            }),

            ...(search && {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        ruc: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        contactPerson: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        },
    });
}

exports.searchSuppliers = (companyId, search) => {
    return prisma.supplier.findMany({
        where: {
            companyId: Number(companyId),
            deletedAt: null,

            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    ruc: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    contactPerson: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        },

        orderBy: {
            name: "asc",
        },

        take: 20,
    });
}
