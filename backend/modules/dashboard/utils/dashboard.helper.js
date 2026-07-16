exports.calculatePercentage = (
  value,
  total,
) => {

  if (!total) return 0;

  return Number(
    ((value / total) * 100).toFixed(2),
  );
};

exports.calculateGrowth = (
  current,
  previous,
) => {

  if (!previous) return 100;

  return Number(
    (
      ((current - previous) /
                previous) *
            100
    ).toFixed(2),
  );
};

exports.groupByMonth = data => {

  const grouped = {};

  data.forEach(item => {

    const month =
            new Date(
              item.createdAt,
            ).toLocaleDateString(
              "es-PE",
              {
                month: "short",
                year: "numeric",
              },
            );

    grouped[month] =
            (grouped[month] || 0) +
            Number(item.total || 0);

  });

  return grouped;
};
