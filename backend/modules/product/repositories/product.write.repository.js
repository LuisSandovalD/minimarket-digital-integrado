// ========================================
// repositories/product.write.repository.js
// ========================================

const prisma = require("../../../prisma/client");

function getDb(tx) {
    return tx || prisma;
}

// ========================================
// CREATE
// ========================================

exports.create = async (data, tx) => {
    const db = getDb(tx);

    return db.product.create({
        data,
    });
};

// ========================================
// CREATE MANY
// ========================================

exports.createMany = async (data, tx) => {
    const db = getDb(tx);

    return db.product.createMany({
        data,
    });
};

// ========================================
// UPDATE
// ========================================

exports.update = async (id, data, tx) => {
    const db = getDb(tx);

    return db.product.update({
        where: {
            id,
        },
        data,
    });
};

// ========================================
// UPDATE MANY
// ========================================

exports.updateMany = async (
    where,
    data,
    tx
) => {
    const db = getDb(tx);

    return db.product.updateMany({
        where,
        data,
    });
};

// ========================================
// SOFT DELETE
// ========================================

exports.softDelete = async (id, tx) => {
    const db = getDb(tx);

    return db.product.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
            deletedAt: new Date(),
        },
    });
};

// ========================================
// RESTORE
// ========================================

exports.restore = async (id, tx) => {
    const db = getDb(tx);

    return db.product.update({
        where: {
            id,
        },
        data: {
            isDeleted: false,
            deletedAt: null,
        },
    });
};

// ========================================
// HARD DELETE
// ========================================

exports.delete = async (id, tx) => {
    const db = getDb(tx);

    return db.product.delete({
        where: {
            id,
        },
    });
};