// ============================================================================
// filters/dashboard.filter.js
// ============================================================================
const { buildDateFilter } = require("./date.filter");

/**
 * Intercepta los parámetros de búsqueda de la URL (?period=...&startDate=...&endDate=...)
 * y los transforma en un objeto de filtrado compatible con Prisma gte/lte.
 * * @param {Object} query - Objeto req.query proveniente del controlador
 * @returns {Object} { gte: Date, lte: Date }
 */
exports.dashboardFilter = (query) => {
    const { period, startDate, endDate } = query;

    // 💡 Regla de Seguridad: Si por algún motivo el frontend envía el string vacío,
    // indefinido o nulo, forzamos "TODAY" como el período activo por defecto.
    const activePeriod = period || "TODAY";

    // Retornamos el filtro construido por el motor de fechas
    return buildDateFilter({
        period: activePeriod,
        startDate,
        endDate,
    });
};