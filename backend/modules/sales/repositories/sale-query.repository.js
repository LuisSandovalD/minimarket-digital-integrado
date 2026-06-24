// ========================================
// repositories/sale-query.repository.js
// ========================================

const prisma = require("../../../prisma/client");
const { saleInclude } = require("../includes/sale.include");

module.exports = {

  // ========================================
  // GET ALL SALES (Filtros dinámicos y avanzados con Prisma)
  // ========================================
  getAllSales: async (filters = {}) => {
    const {
      companyId,
      branchId,
      customerId,
      userId,
      status,
      paymentStatus,
      search,
      startDate,
      endDate,
      minTotal,
      maxTotal,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10
    } = filters;

    // Objeto base para las condiciones de búsqueda en SQL (WHERE)
    const whereClause = {};

    // 1. Identificadores Exactos (Usa índices @@index de tu modelo Prisma)
    if (companyId !== undefined && companyId !== null) whereClause.companyId = Number(companyId);
    if (branchId !== undefined && branchId !== null) whereClause.branchId = Number(branchId);
    if (customerId !== undefined && customerId !== null) whereClause.customerId = Number(customerId);
    if (userId !== undefined && userId !== null) whereClause.userId = Number(userId);

    // 2. Filtros de Estado para Botones o Selects (🛡️ Blindaje contra strings vacíos "")
    if (status && status.trim() !== "") {
      whereClause.status = status;
    }
    if (paymentStatus && paymentStatus.trim() !== "") {
      whereClause.paymentStatus = paymentStatus;
    }

    // 3. Rangos de Fechas UTC (Evita pérdidas de registros por desfases de horas)
    if (startDate || endDate) {
      whereClause.createdAt = {};
      if (startDate) {
        whereClause.createdAt.gte = new Date(`${startDate}T00:00:00.000Z`); // Inicio del día
      }
      if (endDate) {
        whereClause.createdAt.lte = new Date(`${endDate}T23:59:59.999Z`); // Fin del día completo
      }
    }

    // 4. Filtro por Rangos de Montos (Ej: Buscar facturas de más de $1000)
    if (minTotal !== undefined || maxTotal !== undefined) {
      whereClause.total = {};
      if (minTotal !== undefined) whereClause.total.gte = Number(minTotal);
      if (maxTotal !== undefined) whereClause.total.lte = Number(maxTotal);
    }

    // 5. Buscador Global Inteligente (Insensible a mayúsculas/minúsculas)
    if (search && search.trim() !== "") {
      whereClause.OR = [
        { saleNumber: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
        { customer: { name: { contains: search, mode: "insensitive" } } }
      ];
    }

    // 6. Configuración Matemática de Paginación
    const parsedPage = Math.max(1, Number(page));
    const parsedLimit = Math.max(1, Number(limit));
    const skip = (parsedPage - 1) * parsedLimit;

    // 🔒 CONTROL DE DAÑOS PARA EL ORDENAMIENTO
    const validSortFields = ["id", "saleNumber", "total", "subtotal", "discount", "status", "paymentStatus", "createdAt"];
    const verifiedSortBy = validSortFields.includes(sortBy) ? sortBy : "createdAt";

    // 7. Ejecución en Paralelo (Aprovechando el nuevo saleInclude optimizado)
    const [sales, totalRecords] = await Promise.all([
      prisma.sale.findMany({
        where: whereClause,
        include: saleInclude, // 🚀 Ya incluye el conteo nativo de la relación details
        orderBy: {
          [verifiedSortBy]: sortOrder,
        },
        skip: skip,
        take: parsedLimit,
      }),
      prisma.sale.count({
        where: whereClause
      })
    ]);

    // 8. Cálculo de Metadata para el Frontend
    const totalPages = Math.ceil(totalRecords / parsedLimit);

    // 🎯 MAPEO SEGURO CON LA ESTRUCTURA EXACTA DE TU INCLUDE
    const formattedSales = sales.map((sale) => {
      const totalConIgv = Number(sale.total ?? sale.totalAmount ?? 0);
      const descuento = Number(sale.discount ?? sale.discountAmount ?? 0);

      const subtotalSinIgv = sale.subtotal
        ? Number(sale.subtotal)
        : Number((totalConIgv / 1.18).toFixed(2));

      return {
        id: sale.id,
        saleNumber: sale.saleNumber,
        customerName: sale.customer?.name || "Consumidor Final",
        customer: sale.customer || null, // 🤝 Mantenemos el objeto original para modales de facturación
        subtotal: subtotalSinIgv,
        discount: descuento,
        total: totalConIgv,
        // 🚀 Mapeo directo y exclusivo basado en tu nuevo include de Prisma:
        totalProducts: Number(sale._count?.details ?? 0),
        details: sale.details || [], // Inyectamos el array de detalles real devuelto por el include
        status: sale.status || "PENDING",
        paymentStatus: sale.paymentStatus,
        createdAt: sale.createdAt
      };
    });

    return {
      meta: {
        totalRecords,
        totalPages,
        currentPage: parsedPage,
        pageSize: parsedLimit,
        hasNextPage: parsedPage < totalPages,
        hasPrevPage: parsedPage > 1
      },
      data: formattedSales
    };
  },

  // ========================================
  // GET SALE BY ID
  // ========================================
  getSaleById: async (id) => {
    return prisma.sale.findUnique({
      where: { id: Number(id) },
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