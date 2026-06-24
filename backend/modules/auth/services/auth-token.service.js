// ========================================
// services/auth-token.service.js
// ========================================

const tokenService = require("./token.service");

const refreshUserToken = async (refreshToken) => {

    const payload =
        tokenService.verifyRefreshToken(
            refreshToken
        );

    const accessToken =
        tokenService.generateAccessToken({
            id: payload.id,
            email: payload.email
        });

    return {
        accessToken
    };
};

const verifyActiveToken = async (accessToken) => {

    const payload =
        tokenService.verifyAccessToken(
            accessToken
        );

    return {
        valid: true,
        payload
    };
};

module.exports = {
    refreshUserToken,
    verifyActiveToken
};