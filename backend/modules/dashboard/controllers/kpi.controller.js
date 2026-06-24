// ============================================================================
// controllers/kpi.controller.js
// ============================================================================
const kpiService = require("../services/kpi.service");
const { dashboardFilter } = require("../filters/dashboard.filter");

exports.getKPIs = async (req, res, next) => {
    try {
        // Extracción limpia del contexto multi-tenant y el rol del usuario
        const { companyId, role } = req.user;

        // Procesamos el filtro de fechas (con fallback automático a 'TODAY')
        const dateFilter = dashboardFilter(req.query);

        // Solicitamos los KPIs al servicio inyectando el rol para su debida restricción
        const data = await kpiService.getKPIs(
            companyId,
            dateFilter,
            role
        );

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        next(error);
    }
};