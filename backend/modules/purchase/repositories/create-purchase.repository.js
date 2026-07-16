// ============================================================================
// repositories/create-purchase.repository.js
// ============================================================================

const prisma = require("../../../prisma/client");

async function createPurchaseRepository(purchaseData) {
  // Desestructuramos para extraer "details" ya que requiere el formato anidado create
  const { details, ...mainData } = purchaseData;

  return await prisma.purchase.create({
    data: {
      ...mainData,
      details: details, // Lleva el operador "create" resuelto en el servicio
    },
    // 🔥 Traemos todas las relaciones solicitadas para armar la respuesta del Postman exacta
    include: {
      buyer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
      supplier: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
      },
      branch: {
        select: {
          id: true,
          name: true,
          code: true,
        },
      },
      company: {
        select: {
          id: true,
          name: true,
        },
      },
      details: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              salePrice: true,
              purchasePrice: true,
            },
          },
        },
      },
      // Si tienes la relación mapeada en tu schema.prisma (aunque esté vacío [])
      payments: true,
    },
  });
}

module.exports = {
  createPurchaseRepository,
};
