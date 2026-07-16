// ========================================
// backend/modules/sales/includes/sale.include.js
// ========================================

const saleInclude = {
  company: {
    select: {
      id: true,
      name: true,
      ruc: true,
    },
  },
  branch: {
    select: {
      id: true,
      name: true,
      address: true,
    },
  },
  seller: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
  customer: {
    select: {
      id: true,
      name: true,
      documentType: true,
      documentNumber: true,
      phone: true,
      email: true,
    },
  },
  details: {
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          barcode: true,
          salePrice: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  },
  payments: {
    include: {
      method: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  },

  // 🎯 AGREGA ESTA LÍNEA AQUÍ:
  // Le dice a Prisma que calcule la cantidad de elementos en la relación "details"
  _count: {
    select: {
      details: true,
    },
  },
};

module.exports = {
  saleInclude,
};
