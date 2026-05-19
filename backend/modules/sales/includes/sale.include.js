// ========================================
// backend/modules/sales/includes/sale.include.js
// ========================================

const saleInclude = {
  company: {
    select: {
      id: true,
      name: true,
      ruc: true, // Si tu modelo Company no tiene ruc, quita esta línea
    }
  },
  branch: {
    select: {
      id: true,
      name: true,
      address: true,
    }
  },
  // 🟢 CORREGIDO: "seller" coincide exactamente con tu schema.prisma
  seller: {
    select: {
      id: true,
      name: true,
      email: true,
    }
  },
  // 🟢 CORREGIDO: "customer" acepta nulos en tu esquema, Prisma lo manejará bien
  customer: {
    select: {
      id: true,
      name: true,
      documentType: true,
      documentNumber: true,
      phone: true,
      email: true
    }
  },
  // 🟢 CORREGIDO: "details" mapea con tu modelo SaleDetail y su relación "product"
  details: {
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          barcode: true,
          salePrice: true,
        }
      }
    },
    orderBy: {
      id: "asc"
    }
  },
  // 🟢 CORREGIDO: Trae el historial de pagos asociados a la venta
  payments: {
    include: {
      method: {
        select: {
          id: true,
          name: true,
          type: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  }
};

module.exports = {
  saleInclude
};