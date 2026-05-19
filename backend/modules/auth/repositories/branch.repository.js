// ========================================
// repositories/branch.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

/* ======================================
 * CREATE BRANCH
 * ==================================== */

exports.createBranch =
  async (data) => {

    return prisma.branch.create({

      data,

    });

  };