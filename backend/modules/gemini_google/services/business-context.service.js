// ========================================
// services/business-context.service.js
// ========================================

const prisma = require("../../../prisma/client");

class BusinessContextService {
  /**
     * Contexto general dinámico estructurado para el Admin Prompt
     */
  async build(companyId) {
    const [
      company,
      salesMonth,
      purchasesMonth,
      topProducts,
      lowStockProducts,
      topEmployees,
      topSuppliers,
      recentActivity,
      alerts,
      totalProducts,
      totalCustomers,
      totalSuppliersCount,
      totalUsers,
      totalBranches,
      lowRotationProducts,
      overstockProducts,
      topCategories,
      financialSummary,
    ] = await Promise.all([
      prisma.company.findUnique({ where: { id: companyId }, select: { name: true } }),
      this.getSalesMonth(companyId),
      this.getPurchasesMonth(companyId),
      this.getTopProducts(companyId),
      this.getLowStockProducts(companyId),
      this.getTopEmployees(companyId),
      this.getTopSuppliers(companyId),
      this.getRecentActivity(companyId),
      this.getAlerts(companyId),

      // Conteos del Resumen General
      prisma.product.count({ where: { companyId } }),
      prisma.customer.count({ where: { companyId } }),
      prisma.supplier.count({ where: { companyId } }),
      prisma.user.count({ where: { companyId } }),
      prisma.branch.count({ where: { companyId } }),

      // Métodos analíticos adicionales
      this.getLowRotationProducts(companyId),
      this.getOverstockProducts(companyId),
      this.getTopCategories(companyId),
      this.getFinancialSummary(companyId),
    ]);

    return {
      companyName: company?.name || "Sin Identificar",
      totalSales: salesMonth.totalSales,
      totalPurchases: purchasesMonth.totalPurchases,
      totalProducts,
      totalCustomers,
      totalSuppliers: totalSuppliersCount,
      totalUsers,
      totalBranches,
      topProducts,
      lowRotationProducts,
      lowStockProducts,
      overstockProducts,
      topCategories,
      topEmployees,
      recentActivity,
      alerts,
      financialSummary,
    };
  }

  async getSalesMonth(companyId) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const result = await prisma.sale.aggregate({
      where: { companyId, status: "COMPLETED", createdAt: { gte: start } },
      _sum: { total: true },
    });

    return { totalSales: Number(result._sum.total || 0) };
  }

  async getPurchasesMonth(companyId) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const result = await prisma.purchase.aggregate({
      where: { companyId, status: "COMPLETED", createdAt: { gte: start } },
      _sum: { total: true },
    });

    return { totalPurchases: Number(result._sum.total || 0) };
  }

  async getTopProducts(companyId) {
    // Obtener ventas de la empresa actual
    const sales = await prisma.sale.findMany({
      where: {
        companyId,
        status: "COMPLETED",
      },
      select: {
        id: true,
      },
    });

    const saleIds = sales.map((sale) => sale.id);

    if (saleIds.length === 0) {
      return [];
    }

    // Agrupar únicamente los detalles de esas ventas
    const details = await prisma.saleDetail.groupBy({
      by: ["productId"],
      where: {
        saleId: {
          in: saleIds,
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: details.map((d) => d.productId),
        },
      },
      select: {
        id: true,
        name: true,
        isDeleted: true,
      },
    });

    return details.map((item) => {
      const product = products.find(
        (p) => p.id === item.productId,
      );

      return {
        name: product?.name || `Producto #${item.productId}`,
        quantitySales: Number(item._sum.quantity || 0),
      };
    });
  }
  async getLowStockProducts(companyId) {
    const inventory = await prisma.inventory.findMany({
      where: { companyId },
      include: { product: true },
    });

    return inventory
      .filter((i) => i.stock <= i.product.minStock)
      .slice(0, 5)
      .map((i) => ({
        name: i.product.name,
        currentStock: i.stock,
        minimumRequired: i.product.minStock,
      }));
  }

  async getTopEmployees(companyId) {
    const sales = await prisma.sale.groupBy({
      by: ["sellerId"],
      where: { companyId, status: "COMPLETED" },
      _sum: { total: true },
      _count: true,
      orderBy: { _sum: { total: "desc" } },
      take: 5,
    });

    const users = await prisma.user.findMany({
      where: { id: { in: sales.map((s) => s.sellerId) } },
      select: { id: true, name: true },
    });

    return sales.map((item) => ({
      name: users.find((u) => u.id === item.sellerId)?.name || "N/A",
      totalInvoiced: Number(item._sum.total || 0),
      ticketsCount: item._count,
    }));
  }

  async getTopSuppliers(companyId) {
    const purchases = await prisma.purchase.groupBy({
      by: ["supplierId"],
      where: { companyId, supplierId: { not: null } },
      _sum: { total: true },
      orderBy: { _sum: { total: "desc" } },
      take: 5,
    });

    const suppliers = await prisma.supplier.findMany({
      where: { id: { in: purchases.map((s) => s.supplierId) } },
    });

    return purchases.map((item) => ({
      name: suppliers.find((s) => s.id === item.supplierId)?.name || "N/A",
      purchasedVolume: Number(item._sum.total || 0),
    }));
  }

  async getRecentActivity(companyId) {
    return prisma.auditLog.findMany({
      where: { companyId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    });
  }

  async getAlerts(companyId) {
    const start = new Date();
    const expiring = await prisma.productBatch.count({
      where: {
        companyId,
        expirationDate: { lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
      },
    });
    return { batchesExpiringNext30Days: expiring };
  }

  async getLowRotationProducts(companyId) {
    // Implementar analítica de productos estancados si aplica en tu base de datos
    return [];
  }

  async getOverstockProducts(companyId) {
    // Implementar analítica de inventario excedente si aplica en tu base de datos
    return [];
  }

  async getTopCategories(companyId) {
    return prisma.category.findMany({
      where: { companyId },
      take: 5,
      select: { id: true, name: true },
    });
  }

  async getFinancialSummary(companyId) {
    return { status: "Operativo", saludFinanciera: "Óptima" };
  }
}

module.exports = new BusinessContextService();
