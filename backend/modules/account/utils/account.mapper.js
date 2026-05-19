// ========================================
// utils/account.mapper.js
// ========================================

module.exports =
  function accountMapper(user) {

    return {

      /* ======================================
       * BASIC INFO
       * ==================================== */

      id:
        user.id,

      name:
        user.name,

      email:
        user.email,

      phone:
        user.phone,

      avatar:
        user.avatar,

      role:
        user.role,

      /* ======================================
       * STATUS
       * ==================================== */

      isActive:
        user.isActive,

      isDeleted:
        user.isDeleted,

      isOnline:
        user.isOnline,

      loginAttempts:
        user.loginAttempts,

      lockedUntil:
        user.lockedUntil,

      /* ======================================
       * SECURITY
       * ==================================== */

      twoFactorEnabled:
        user.twoFactorEnabled,

      lastLogin:
        user.lastLogin,

      lastLogout:
        user.lastLogout,

      /* ======================================
       * DATES
       * ==================================== */

      createdAt:
        user.createdAt,

      updatedAt:
        user.updatedAt,

      deletedAt:
        user.deletedAt,

      /* ======================================
       * COMPANY
       * ==================================== */

      company:
        user.company
          ? {

              id:
                user.company.id,

              name:
                user.company.name,

              slug:
                user.company.slug,

              logo:
                user.company.logo,

              email:
                user.company.email,

              phone:
                user.company.phone,

              website:
                user.company.website,

              subscriptionTier:
                user.company.subscriptionTier,

            }
          : null,

      /* ======================================
       * BRANCH
       * ==================================== */

      branch:
        user.branch
          ? {

              id:
                user.branch.id,

              name:
                user.branch.name,

              code:
                user.branch.code,

              logo:
                user.branch.logo,

              address:
                user.branch.address,

              city:
                user.branch.city,

              state:
                user.branch.state,

              country:
                user.branch.country,

            }
          : null,

      /* ======================================
       * HIERARCHY
       * ==================================== */

      manager:
        user.manager
          ? {

              id:
                user.manager.id,

              name:
                user.manager.name,

              email:
                user.manager.email,

              role:
                user.manager.role,

            }
          : null,

      subordinates:
        user.subordinates?.map(
          (subordinate) => ({

            id:
              subordinate.id,

            name:
              subordinate.name,

            email:
              subordinate.email,

            role:
              subordinate.role,

            avatar:
              subordinate.avatar,

          })
        ) || [],

      /* ======================================
       * STATS
       * ==================================== */

      stats: {

        sales:
          user._count?.sales || 0,

        purchases:
          user._count?.purchases || 0,

        supportTickets:
          user._count?.supportTickets || 0,

        notifications:
          user._count?.notifications || 0,

        sessions:
          user._count?.sessions || 0,

      },

      /* ======================================
       * ACTIVE SESSIONS
       * ==================================== */

      sessions:
        user.sessions?.map(
          (session) => ({

            id:
              session.id,

            ipAddress:
              session.ipAddress,

            userAgent:
              session.userAgent,

            isActive:
              session.isActive,

            expiresAt:
              session.expiresAt,

            createdAt:
              session.createdAt,

          })
        ) || [],

    };

  };