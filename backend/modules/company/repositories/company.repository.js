// modules/company/repositories/company.repository.js

const prisma =
  require("../../../prisma/client");

/* ========================================
 * GET ALL
 * ====================================== */

exports.getAll = async () => {

  return await prisma.company.findMany({

    where: {
      isDeleted: false
    },

    orderBy: {
      createdAt: "desc"
    }

  });

};

/* ========================================
 * GET MY COMPANY
 * ====================================== */

exports.getMyCompany = async (
  companyId
) => {

  return await prisma.company.findFirst({

    where: {

      id: companyId,

      isDeleted: false

    }

  });

};

/* ========================================
 * GET COMPANY BY ID
 * ====================================== */

exports.getById = async (
  id
) => {

  return await prisma.company.findFirst({

    where: {

      id,

      isDeleted: false

    }

  });

};

/* ========================================
 * UPDATE COMPANY
 * ====================================== */

exports.update = async (
  id,
  data
) => {

  return await prisma.company.update({

    where: {
      id
    },

    data

  });

};