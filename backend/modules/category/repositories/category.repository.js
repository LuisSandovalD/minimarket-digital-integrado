// ========================================
// repositories/category.repository.js
// ========================================

const prisma =
  require("../../../prisma/client");

// ========================================
// GET ALL
// ========================================

exports.getAll = async (
  companyId
) => {

  return prisma.category.findMany({

    where: {

      companyId,

      isDeleted: false,

    },

    include: {

      parent: {
        select: {
          id: true,
          name: true,
        },
      },

      children: {
        where: {
          isDeleted: false,
        },

        select: {
          id: true,
          name: true,
        },
      },

      _count: {
        select: {
          products: true,
          children: true,
        },
      },

    },

    orderBy: [
      {
        parentId: "asc",
      },
      {
        name: "asc",
      },
    ],

  });

};

// ========================================
// GET BY ID
// ========================================

exports.getById = async (
  id,
  companyId
) => {

  return prisma.category.findFirst({

    where: {

      id,

      companyId,

      isDeleted: false,

    },

    include: {

      parent: {
        select: {
          id: true,
          name: true,
        },
      },

      children: {
        where: {
          isDeleted: false,
        },
      },

      products: {
        where: {
          isDeleted: false,
        },

        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
        },
      },

      _count: {
        select: {
          children: true,
          products: true,
        },
      },

    },

  });

};

// ========================================
// CREATE
// ========================================

exports.create = async (
  data
) => {

  return prisma.category.create({

    data,

  });

};

// ========================================
// UPDATE
// ========================================

exports.update = async (
  id,
  data
) => {

  return prisma.category.update({

    where: { id },

    data,

  });

};

// ========================================
// EXISTS
// ========================================

exports.exists = async (
  id,
  companyId
) => {

  return prisma.category.findFirst({

    where: {

      id,

      companyId,

      isDeleted: false,

    },

    select: {
      id: true,
    },

  });

};

// ========================================
// CHECK CHILDREN
// ========================================

exports.hasChildren = async (
  id
) => {

  const count =
    await prisma.category.count({

      where: {

        parentId: id,

        isDeleted: false,

      },

    });

  return count > 0;

};

// ========================================
// CHECK PRODUCTS
// ========================================

exports.hasProducts = async (
  id
) => {

  const count =
    await prisma.product.count({

      where: {

        categoryId: id,

        isDeleted: false,

      },

    });

  return count > 0;

};

// ========================================
// SOFT DELETE
// ========================================

exports.softDelete = async (
  id
) => {

  return prisma.category.update({

    where: { id },

    data: {

      isDeleted: true,

      deletedAt: new Date(),

    },

  });

};