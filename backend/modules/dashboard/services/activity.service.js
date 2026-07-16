const activityRepository = require(
  "../repositories/activity.repository",
);

exports.getActivity = async (
  companyId,
) => {

  const [
    logs,
    sessions,
  ] = await Promise.all([
    activityRepository.getRecentActivity(
      companyId,
    ),
    activityRepository.getUserSessions(
      companyId,
    ),
  ]);

  return {
    logs,
    sessions,
  };
};
