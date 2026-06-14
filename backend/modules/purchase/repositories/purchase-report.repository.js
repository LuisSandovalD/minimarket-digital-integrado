// =========================================================================
// purchase-report.repository.js
// =========================================================================
const prisma = require("../../../prisma/client");

module.exports = {
    getDailyPurchases: async (companyId, startDate, endDate) => {
        const where = { status: { not: "CANCELLED" } };

        if (startDate instanceof Date && !Number.isNaN(startDate)) {
            where.createdAt = { ...(where.createdAt || {}), gte: startDate };
        }
        if (endDate instanceof Date && !Number.isNaN(endDate)) {
            where.createdAt = { ...(where.createdAt || {}), lte: endDate };
        }

        if (companyId !== undefined && companyId !== null && companyId !== "") {
            const cid = Number(companyId);
            if (!Number.isNaN(cid)) where.companyId = cid;
        }

        // SE CORRIGE EL SELECT: Ahora incluye montos desglosados, estado, notas y la relación de productos
        const rows = await prisma.purchase.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                purchaseNumber: true,
                notes: true,
                createdAt: true,
                subtotal: true, // <-- Agregado
                tax: true,      // <-- Agregado
                discount: true, // <-- Agregado
                total: true,
                status: true,   // <-- Agregado
                details: {      // <-- Agregado para listar los productos
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
        });

        return rows;
    },
};