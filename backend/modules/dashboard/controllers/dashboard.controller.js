// ============================================================================
// controllers/dashboard.controller.js
// ============================================================================
const dashboardService = require("../services/dashboard.service");
const { dashboardFilter } = require("../filters/dashboard.filter");

exports.getDashboard = async (req, res, next) => {
  try {
    // Extraemos de forma segura el tenant (companyId) y el rol asignado
    const { companyId, role } = req.user;

    // Construimos el objeto de filtrado de fechas (que por defecto usará 'TODAY')
    const dateFilter = dashboardFilter(req.query);

    // Delegamos la carga de KPIs e indicadores pasando el rol del usuario
    const dashboard = await dashboardService.getDashboard(
      companyId,
      dateFilter,
      role,
    );

    return res.status(200).json({
      success: true,
      data: dashboard,
    });

  } catch (error) {
    next(error);
  }
};
