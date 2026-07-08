// ========================================
// services/context-builder.service.js
// ========================================

const buildContext = (
    businessData
) => {
    return `

EMPRESA

Ventas Hoy:
${JSON.stringify(businessData.salesToday, null, 2)}

Ventas Mes:
${JSON.stringify(businessData.salesMonth, null, 2)}

Compras Mes:
${JSON.stringify(businessData.purchasesMonth, null, 2)}

Productos Más Vendidos:
${businessData.topProducts
            .map(
                (p) =>
                    `- ${p.product}: ${p.quantity}` // Corregido: p.name -> p.product
            )
            .join("\n")}

Productos con Stock Bajo:
${businessData.lowStock
            .map(
                (p) =>
                    `- ${p.product}: ${p.stock} (Min: ${p.minStock})` // Corregido: p.name -> p.product
            )
            .join("\n")}

Proveedores Destacados:
${businessData.topSuppliers
            .map((s) => `- ${s.supplier}: $${s.amount}`) // Corregido: s.name -> s.supplier
            .join("\n")}

Empleados Destacados:
${businessData.topEmployees
            .map((e) => `- ${e.employee}: $${e.sales} (${e.transactions} transacciones)`) // Corregido: e.name -> e.employee
            .join("\n")}
`;
};

module.exports = {
    buildContext,
};