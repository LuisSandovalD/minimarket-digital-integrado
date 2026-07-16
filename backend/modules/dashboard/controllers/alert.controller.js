// ============================================================================
// controllers/alert.controller.js
// ============================================================================
const alertService = require("../services/alert.service");
const { dashboardFilter } = require("../filters/dashboard.filter");

exports.getAlerts = async (req, res, next) => {
  try {
    // Extracción segura del tenant (companyId) y el rol asignado
    const { companyId, role } = req.user;

    // Procesamos el filtro de fechas (que por defecto usará 'TODAY')
    const dateFilter = dashboardFilter(req.query);

    // Solicitamos las alertas pasando el rol y las fechas para segmentar correctamente
    const alerts = await alertService.getAlerts(
      companyId,
      dateFilter,
      role,
    );

    return res.status(200).json({
      success: true,
      data: alerts,
    });

  } catch (error) {
    next(error);
  }
};
