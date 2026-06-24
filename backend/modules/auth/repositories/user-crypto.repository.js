const prisma = require("../../../prisma/client");

const savePasswordResetCode = async (userId, code, expiresAt, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: {
            resetPasswordCode: code,
            resetPasswordExpires: expiresAt,
        },
    });
};

const findResetCode = async (code, tx = null) => {
    const client = tx || prisma;
    return client.user.findFirst({
        where: {
            resetPasswordCode: code,
            resetPasswordExpires: { gt: new Date() },
        },
        include: { company: true, branch: true },
    });
};

const markResetCodeAsUsed = async (userId, tx = null) => {
    const client = tx || prisma;
    return client.user.update({
        where: { id: userId },
        data: {
            resetPasswordCode: null,
            resetPasswordExpires: null,
        },
    });
};

module.exports = {
    savePasswordResetCode,
    findResetCode,
    markResetCodeAsUsed,
};