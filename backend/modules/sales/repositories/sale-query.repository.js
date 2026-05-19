// ========================================
// repositories/sale-query.repository.js
// ========================================

const prisma = require("../../../prisma/client");
const { saleInclude } = require("../includes/sale.include");

module.exports = {

  // ========================================
  // GET ALL SALES (Filtros dinámicos basados en tu Esquema)
  // ========================================
  getAllSales: async (filters = {}) => {
    const { companyId, branchId, status, search } = filters;
    const whereClause = {};

    // Filtros por ID y Estado (mapeados con tus @@index en el modelo Sale)
    if (companyId !== undefined) whereClause.companyId = companyId;
    if (branchId !== undefined)  whereClause.branchId = branchId;
    if (status)                  whereClause.status = status;

    // Buscador inteligente en base a tu string saleNumber y notes
    if (search) {
      whereClause.OR = [
        { saleNumber: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.sale.findMany({
      where: whereClause,
      include: saleInclude,
      orderBy: {
        createdAt: "desc", // Ordena por las más recientes
      },
    });
  },

  // ========================================
  // GET SALE BY ID
  // ========================================
  getSaleById: async (id) => {
    return prisma.sale.findUnique({
      where: { id },
      include: saleInclude,
    });
  },

  // ========================================
  // GET SALE BY NUMBER
  // ========================================
  getSaleByNumber: async (saleNumber) => {
    return prisma.sale.findFirst({
      where: { saleNumber },
      include: saleInclude,
    });
  },
};