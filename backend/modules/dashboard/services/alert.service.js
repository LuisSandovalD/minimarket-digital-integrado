const alertRepository = require(
  "../repositories/alert.repository",
);

exports.getAlerts = async (
  companyId,
) => {

  const expirationDate = new Date();

  expirationDate.setDate(
    expirationDate.getDate() + 30,
  );

  const [
    lowStock,
    expiringProducts,
    notifications,
  ] = await Promise.all([
    alertRepository.getLowStockAlerts(
      companyId,
    ),
    alertRepository.getExpiringProducts(
      companyId,
      expirationDate,
    ),
    alertRepository.getUnreadNotifications(
      companyId,
    ),
  ]);

  return {
    lowStock,
    expiringProducts,
    notifications,
  };
};
