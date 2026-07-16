// ============================================================================
// repositories/sale-query.repository.js
// CORREGIDO: Mapeo de filtro userId hacia sellerId en la base de datos
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  getAllSales: async (filters) => {
    const { page = 1, limit = 10, userId, customerId, companyId, branchId, search } = filters;
    const skip = (page - 1) * limit;

    const where = {};

    // 🛡️ CORRECCIÓN AQUÍ:
    // Mapeamos el 'userId' recibido desde la petición al campo real 'sellerId' de Prisma
    if (userId) {
      where.sellerId = Number(userId);
    }

    if (customerId) where.customerId = Number(customerId);
    if (companyId) where.companyId = Number(companyId);
    if (branchId) where.branchId = Number(branchId);

    if (search) {
      where.OR = [
        { saleNumber: { contains: search, mode: "insensitive" } },
        { customer: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [totalRecords, data] = await prisma.$transaction([
      prisma.sale.count({ where }),
      prisma.sale.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          customer: {
            select: { id: true, name: true, documentNumber: true },
          },
          // 🚀 Usando 'seller' en lugar de 'user'
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
              phone: true,
              isOnline: true,
              branchId: true,
            },
          },
        },
      }),
    ]);

    return {
      meta: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        pageSize: limit,
        hasNextPage: page * limit < totalRecords,
        hasPrevPage: page > 1,
      },
      // 🔄 Mapeamos la respuesta para mantener la consistencia 'user' en las capas superiores
      data: data.map(sale => ({
        ...sale,
        user: sale.seller || null,
      })),
    };
  },

  getSaleById: async (id) => {
    const sale = await prisma.sale.findUnique({
      where: { id: Number(id) },
      include: {
        customer: true,
        seller: { // 🚀 Cambiado aquí también
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            phone: true,
            isOnline: true,
            branchId: true,
          },
        },
      },
    });

    if (!sale) return null;
    return { ...sale, user: sale.seller || null };
  },

  getSaleByNumber: async (saleNumber) => {
    const sale = await prisma.sale.findFirst({
      where: { saleNumber: String(saleNumber).trim() },
      include: {
        customer: true,
        seller: { // 🚀 Cambiado aquí también
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
            phone: true,
            isOnline: true,
            branchId: true,
          },
        },
      },
    });

    if (!sale) return null;
    return { ...sale, user: sale.seller || null };
  },
};
