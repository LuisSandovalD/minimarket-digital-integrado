// ============================================================================
// backend/src/modules/purchase/includes/purchase.include.js
// ============================================================================

const purchaseInclude = {
  // Incluye información detallada del comprador (Usuario/Empleado)
  buyer: {
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true
    }
  },

  // Incluye los datos esenciales de contacto del proveedor
  supplier: {
    select: {
      id: true,
      name: true,
      phone: true,
      email: true
    }
  },

  // Vincula la sucursal donde se realizó o registró la compra
  branch: {
    select: {
      id: true,
      name: true,
      code: true
    }
  },

  // Corporativo al que pertenece la transacción
  company: {
    select: {
      id: true,
      name: true
    }
  },

  // Detalle de los productos adquiridos, cantidades y costos
  details: {
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
          salePrice: true,
          purchasePrice: true
        }
      }
    }
  },

  // 🔥 SOLUCIÓN CRÍTICA: Select explícito de campos existentes en 'Payment'.
  // Al retirar el antiguo 'payments: true', evitamos que Prisma busque 
  // la columna fantasma 'remainingAmount' que rompía la consulta en PostgreSQL.
  payments: {
    select: {
      id: true,
      amount: true,
      paymentMethod: true,
      createdAt: true
      // Nota: Si usas campos adicionales confirmados en tu schema como 
      // 'referenceNumber' o 'status', puedes agregarlos aquí de forma segura.
    }
  }
};

module.exports = {
  purchaseInclude
};