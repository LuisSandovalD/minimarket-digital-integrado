// ========================================
// repositories/branch.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

/* ======================================
 * GET ALL
 * ==================================== */

exports.findAll =
(companyId) => {

  return prisma.branch.findMany({

    where: {
      companyId,
      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};

/* ======================================
 * GET BY ID
 * ==================================== */

exports.findById =
(
  id,
  companyId
) => {

  return prisma.branch.findFirst({

    where: {
      id,
      companyId,
      deletedAt: null,
    },

  });

};

/* ======================================
 * CREATE
 * ==================================== */

exports.create =
(data) => {

  return prisma.branch.create({

    data: {

      name:
        data.name,

      address:
        data.address,

      phone:
        data.phone,

      email:
        data.email,

      logo:
        data.logo,

      description:
        data.description,

      city:
        data.city,

      state:
        data.state,

      country:
        data.country,

      postalCode:
        data.postalCode,

      companyId:
        data.companyId,

    },

  });

};

/* ======================================
 * UPDATE
 * ==================================== */

exports.update =
(
  id,
  data
) => {

  return prisma.branch.update({

    where: {
      id,
    },

    data: {

      name:
        data.name,

      address:
        data.address,

      phone:
        data.phone,

      email:
        data.email,

      logo:
        data.logo,

      description:
        data.description,

      city:
        data.city,

      state:
        data.state,

      country:
        data.country,

      postalCode:
        data.postalCode,

      updatedAt:
        new Date(),

    },

  });

};

/* ======================================
 * SOFT DELETE
 * ==================================== */

exports.softDelete =
(id) => {

  return prisma.branch.update({

    where: {
      id,
    },

    data: {

      deletedAt:
        new Date(),

    },

  });

};