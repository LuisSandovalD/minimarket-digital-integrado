// ========================================
// repositories/category.repository.js
// ========================================

// Importamos prisma para poder hablar directamente con la base de datos
const prisma = require("../../../prisma/client");

// ========================================
// GET ALL
// ========================================

// Busca en la base de datos todas las categorías activas de la empresa
exports.getAll = async (companyId) => {
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

// Busca una sola categoría por su ID y trae sus detalles (como sus productos y subcategorías)
exports.getById = async (id, companyId) => {
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

// Guarda una categoría completamente nueva en la base de datos
exports.create = async (data) => {
  return prisma.category.create({
    data,
  });
};

// ========================================
// UPDATE
// ========================================

// Modifica los datos de una categoría que ya existe
exports.update = async (id, data) => {
  return prisma.category.update({
    where: { id },

    data,
  });
};

// ========================================
// EXISTS
// ========================================

// Revisa rápidamente si una categoría existe y no está borrada
exports.exists = async (id, companyId) => {
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

// Cuenta si esta categoría tiene otras subcategorías adentro
exports.hasChildren = async (id) => {
  const count = await prisma.category.count({
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

// Cuenta si hay productos que pertenecen a esta categoría
exports.hasProducts = async (id) => {
  const count = await prisma.product.count({
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

// Borrado lógico: no destruye los datos reales, solo los oculta marcándolos como eliminados
exports.softDelete = async (id) => {
  return prisma.category.update({
    where: { id },

    data: {
      isDeleted: true,

      deletedAt: new Date(),
    },
  });
};
