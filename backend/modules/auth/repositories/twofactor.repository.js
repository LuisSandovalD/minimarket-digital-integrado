// ========================================
// repositories/twoFactor.repository.js
// ========================================

const prisma = require("../../../prisma/client");

/* ======================================
 * SAVE TWO FACTOR CODE
 * ==================================== */
const saveTwoFactorCode = async (
    userId,
    code,
    expiresAt,
    tx = null
) => {
    const client = tx || prisma;

    return client.user.update({
        where: {
            id: userId,
        },
        data: {
            twoFactorEmailCode: code,
            twoFactorEmailExpires: expiresAt,
        },
    });
};

/* ======================================
 * FIND VALID TWO FACTOR CODE
 * ==================================== */
const findValidTwoFactorCode = async (
    userId,
    code,
    tx = null
) => {
    const client = tx || prisma;

    return client.user.findFirst({
        where: {
            id: userId,

            twoFactorEmailCode: code,

            twoFactorEmailExpires: {
                gt: new Date(),
            },
        },

        include: {
            company: true,
            branch: true,
            employeeProfile: true,
        },
    });
};

/* ======================================
 * CLEAR TWO FACTOR CODE
 * ==================================== */
const clearTwoFactorCode = async (
    userId,
    tx = null
) => {
    const client = tx || prisma;

    return client.user.update({
        where: {
            id: userId,
        },
        data: {
            twoFactorEmailCode: null,
            twoFactorEmailExpires: null,
        },
    });
};

/* ======================================
 * ENABLE TWO FACTOR
 * ==================================== */
const enableTwoFactorAuth = async (
    userId,
    tx = null
) => {
    const client = tx || prisma;

    return client.user.update({
        where: {
            id: userId,
        },
        data: {
            twoFactorEnabled: true,
        },
    });
};

/* ======================================
 * DISABLE TWO FACTOR
 * ==================================== */
const disableTwoFactorAuth = async (
    userId,
    tx = null
) => {
    const client = tx || prisma;

    return client.user.update({
        where: {
            id: userId,
        },
        data: {
            twoFactorEnabled: false,
        },
    });
};

module.exports = {
    saveTwoFactorCode,
    findValidTwoFactorCode,
    clearTwoFactorCode,

    enableTwoFactorAuth,
    disableTwoFactorAuth,
};