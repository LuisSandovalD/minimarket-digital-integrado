// ========================================
// services/branch.service.js
// ========================================

const repository =
  require("../repositories/auth.repository");

/* ======================================
 * CREATE BRANCH
 * ==================================== */

exports.createBranch =
  async (
    branch,
    companyId
  ) => {

    if (!branch?.name) {
      return null;
    }

    return await repository.createBranch({

      name:
        branch.name,

      address:
        branch.address || "",

      phone:
        branch.phone || null,

      city:
        branch.city || null,

      state:
        branch.state || null,

      country:
        branch.country || null,

      companyId,

    });

  };