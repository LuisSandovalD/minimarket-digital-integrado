// ========================================
// services/context-builder.service.js
// ========================================

const buildContext = (businessData) => {
  return `

EMPRESA

Ventas Hoy:
${JSON.stringify(businessData.salesToday, null, 2)}

Ventas Mes:
${JSON.stringify(businessData.salesMonth, null, 2)}

Compras Mes:
${JSON.stringify(businessData.purchasesMonth, null, 2)}

Productos Más Vendidos:
${(businessData.topProducts || []).map(
    (p) =>
      `- ${p.name}: ${p.quantitySales} unidades`,
  ).join("\n")}

Productos con Stock Bajo:
${(businessData.lowStock || []).map(
    (p) =>
      `- ${p.name}: ${p.currentStock} (Min: ${p.minimumRequired})`,
  ).join("\n")}

Proveedores Destacados:
${(businessData.topSuppliers || []).map(
    (s) =>
      `- ${s.name}: S/. ${Number(s.purchasedVolume || 0).toFixed(2)}`,
  ).join("\n")}

Empleados Destacados:
${(businessData.topEmployees || []).map(
    (e) =>
      `- ${e.name}: S/. ${Number(e.totalInvoiced || 0).toFixed(2)} (${e.ticketsCount} transacciones)`,
  ).join("\n")}
`;
};

module.exports = {
  buildContext,
};
