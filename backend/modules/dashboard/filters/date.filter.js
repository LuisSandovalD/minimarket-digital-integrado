// ============================================================================
// filters/date.filter.js
// ============================================================================

const buildDateFilter = ({ period, startDate, endDate }) => {
    const now = new Date();

    switch (period) {
        case "TODAY":
            return {
                gte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
                lte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
            };

        case "LAST_7_DAYS":
            return {
                gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            };

        case "LAST_30_DAYS":
            return {
                gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            };

        case "THIS_MONTH":
            return {
                gte: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0),
                lte: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
            };

        case "LAST_MONTH":
            return {
                gte: new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0),
                lte: new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
            };

        case "THIS_YEAR":
            return {
                gte: new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)
            };

        case "LAST_YEAR":
            return {
                gte: new Date(now.getFullYear() - 1, 0, 1, 0, 0, 0, 0),
                lte: new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999)
            };

        case "CUSTOM":
        default:
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);

                // Forzamos el rango completo del día: desde las 00:00:00 hasta las 23:59:59
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);

                return {
                    gte: start,
                    lte: end
                };
            }

            // Fallback: si no hay un filtro válido, devolvemos el día de HOY por seguridad
            return {
                gte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
                lte: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
            };
    }
};

module.exports = {
    buildDateFilter
};