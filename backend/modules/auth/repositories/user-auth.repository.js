const prisma = require("../../../prisma/client");

const updatePassword = async (userId, password, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: { password },
    });
};

const incrementLoginAttempts = async (userId, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: { loginAttempts: { increment: 1 } },
    });
};

const resetLoginAttempts = async (userId, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: { loginAttempts: 0, lockedUntil: null },
    });
};

const lockUser = async (userId, lockedUntil, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: { lockedUntil },
    });
};

module.exports = {
    updatePassword,
    incrementLoginAttempts,
    resetLoginAttempts,
    lockUser,
};