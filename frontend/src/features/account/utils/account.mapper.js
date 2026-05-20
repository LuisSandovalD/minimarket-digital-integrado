// ========================================
// features/account/utils/account.mapper.js
// ========================================

export function mapAccount(user) {
  return {
    id: user?.id || null,

    name: user?.name || "",

    email: user?.email || "",

    role: user?.role || "EMPLOYEE",

    avatar: user?.avatar || null,

    phone: user?.phone || "",

    isActive: user?.isActive || false,

    isDeleted: user?.isDeleted || false,

    isOnline: user?.isOnline || false,

    lastLogin: user?.lastLogin || null,

    lastLogout: user?.lastLogout || null,

    twoFactorEnabled: user?.twoFactorEnabled || false,

    createdAt: user?.createdAt || null,

    updatedAt: user?.updatedAt || null,

    manager: user?.manager || null,

    subordinates: user?.subordinates || [],

    company: user?.company || null,

    branch: user?.branch || null,

    stats: {
      sales: user?.stats?.sales || 0,

      purchases: user?.stats?.purchases || 0,

      supportTickets: user?.stats?.supportTickets || 0,
    },
  };
}
