const dashboardRepository = require("../repositories/dashboard.repository");
const salesRepository = require("../repositories/sales.repository");
const purchaseRepository = require("../repositories/purchase.repository");
const inventoryRepository = require("../repositories/inventory.repository");

exports.getKPIs = async (companyId, dateFilter) => {
  const [
    products,
    customers,
    suppliers,
    branches,
    sales,
    purchases,
    lowStock,
  ] = await Promise.all([
    dashboardRepository.countProducts(companyId),
    dashboardRepository.countCustomers(companyId),
    dashboardRepository.countSuppliers(companyId),
    dashboardRepository.countBranches(companyId),
    salesRepository.getSalesSummary(companyId, dateFilter),
    purchaseRepository.getPurchaseSummary(companyId, dateFilter),
    inventoryRepository.getLowStockProducts(companyId),
  ]);

  return {
    products,
    customers,
    suppliers,
    branches,
    totalSales: sales._sum.total || 0,
    totalPurchases: purchases._sum.total || 0,
    salesCount: sales._count.id || 0,
    purchasesCount: purchases._count.id || 0,
    lowStockProducts: lowStock.length,
  };
};
