const kpiService = require("./kpi.service");
const analyticsService = require("./analytics.service");
const activityService = require("./activity.service");
const alertService = require("./alert.service");

exports.getDashboard = async (
  companyId,
  dateFilter,
) => {

  const [
    kpis,
    analytics,
    activity,
    alerts,
  ] = await Promise.all([
    kpiService.getKPIs(
      companyId,
      dateFilter,
    ),
    analyticsService.getAnalytics(
      companyId,
      dateFilter,
    ),
    activityService.getActivity(
      companyId,
    ),
    alertService.getAlerts(
      companyId,
    ),
  ]);

  return {
    kpis,
    analytics,
    activity,
    alerts,
  };
};
