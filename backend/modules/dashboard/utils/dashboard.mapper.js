exports.mapKPIs = data => ({
  products: data.products,
  customers: data.customers,
  suppliers: data.suppliers,
  branches: data.branches,
  sales: data.totalSales,
  purchases: data.totalPurchases,
  lowStockProducts:
        data.lowStockProducts,
});

exports.mapAlerts = alerts => ({
  lowStock:
        alerts.lowStock.length,
  expiring:
        alerts.expiringProducts.length,
  notifications:
        alerts.notifications.length,
});

exports.mapActivity = activity => ({
  logs: activity.logs,
  sessions: activity.sessions,
});
