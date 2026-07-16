// ============================================================================
// controllers/activity.controller.js
// ============================================================================
const activityService = require("../services/activity.service");
const { dashboardFilter } = require("../filters/dashboard.filter");

exports.getActivity = async (req, res, next) => {
  try {
    // Extracción segura del contexto multi-tenant y el rol del usuario
    const { companyId, role } = req.user;

    // Inyectamos el filtro de fechas (con fallback automático a 'TODAY')
    // Esto evita transferir logs pesados e innecesarios de años pasados
    const dateFilter = dashboardFilter(req.query);

    // Enviamos companyId, el filtro de fechas y el rol al servicio
    const activity = await activityService.getActivity(
      companyId,
      dateFilter,
      role,
    );

    return res.status(200).json({
      success: true,
      data: activity,
    });

  } catch (error) {
    next(error);
  }
};
