// ========================================
// controllers/profile.controller.js
// ========================================

const {
  successResponse,
  errorResponse,
} = require("../responses/auth.response");

/* ======================================
 * ME - PROFILE COMPLETO ERP
 * ==================================== */

exports.me = async (req, res) => {
  try {
    const user = req.user;

    return successResponse(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,

        phone: user.phone,
        avatar: user.avatar,

        isActive: user.isActive,
        isDeleted: user.isDeleted,
        isOnline: user.isOnline,

        lastLogin: user.lastLogin,
        lastLogout: user.lastLogout,

        loginAttempts: user.loginAttempts,

        twoFactorEnabled: user.twoFactorEnabled,

        company: user.company,
        branch: user.branch,

        manager: user.manager || null,

        subordinates: user.subordinates || [],

        stats: user._count || {
          sales: 0,
          purchases: 0,
          supportTickets: 0,
        },
      },
    });
  } catch (error) {
    return errorResponse(res, error, 500);
  }
};