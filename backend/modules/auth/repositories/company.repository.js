// ========================================
// repositories/company.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

/* ======================================
 * FIND COMPANY BY NAME
 * ==================================== */

exports.findCompanyByName =
  async (name) => {

    return prisma.company.findFirst({

      where: {

        name,

        isDeleted: false,

      },

    });

  };

/* ======================================
 * FIND COMPANY BY SLUG
 * ==================================== */

exports.findCompanyBySlug =
  async (slug) => {

    return prisma.company.findUnique({

      where: {

        slug,

      },

    });

  };

/* ======================================
 * CREATE COMPANY
 * ==================================== */

exports.createCompany =
  async (data) => {

    return prisma.company.create({

      data,

    });

  };