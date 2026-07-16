// ============================================================================
// controllers/analytics.controller.js
// ============================================================================
const analyticsService = require("../services/analytics.service");
const { dashboardFilter } = require("../filters/dashboard.filter");

exports.getAnalytics = async (req, res, next) => {
  try {
    // Extracción segura del contexto del usuario autenticado
    const { companyId, role } = req.user;

    // Procesamos el objeto de rango de fechas
    const dateFilter = dashboardFilter(req.query);

    // Pasamos el rol al servicio para que limite o censure datos sensibles (ej. compras) si es un SELLER
    const analytics = await analyticsService.getAnalytics(
      companyId,
      dateFilter,
      role,
    );

    return res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error) {
    next(error);
  }
};
