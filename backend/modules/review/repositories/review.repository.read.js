const prisma = require("../../../prisma/client");

exports.findAll = async (companyId) => {
  return prisma.review.findMany({
    where: {
      companyId: Number(companyId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

exports.findById = async (id, companyId) => {
  return prisma.review.findFirst({
    where: {
      id: Number(id),
      companyId: Number(companyId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
    },
  });
};

exports.findMyReview = async (userId, companyId) => {
  return prisma.review.findFirst({
    where: {
      userId: Number(userId),
      companyId: Number(companyId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
    },
  });
};

exports.findByUser = async (userId, companyId) => {
  return exports.findMyReview(userId, companyId);
};

exports.count = async (companyId) => {
  return prisma.review.count({
    where: {
      companyId: Number(companyId),
    },
  });
};

exports.average = async (companyId) => {
  return prisma.review.aggregate({
    where: {
      companyId: Number(companyId),
    },
    _avg: {
      rating: true,
    },
  });
};

exports.distribution = async (companyId) => {
  return prisma.review.groupBy({
    by: ["rating"],
    where: {
      companyId: Number(companyId),
    },
    _count: {
      rating: true,
    },
    orderBy: {
      rating: "desc",
    },
  });
};

exports.latest = async (companyId, limit = 5) => {
  return prisma.review.findMany({
    where: {
      companyId: Number(companyId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: Number(limit),
  });
};

exports.getPublicReviews = async () => {
  return prisma.review.findMany({
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

exports.getLatestReviews = async (limit = 10) => {
  return prisma.review.findMany({
    take: Number(limit),
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

exports.getPublicStatistics = async () => {
  const [total, average, distribution] = await Promise.all([
    prisma.review.count(),
    prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    }),
    prisma.review.groupBy({
      by: ["rating"],
      _count: {
        rating: true,
      },
      orderBy: {
        rating: "desc",
      },
    }),
  ]);

  const stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  distribution.forEach((item) => {
    stars[item.rating] = item._count.rating;
  });

  return {
    average: Number(average._avg.rating || 0).toFixed(1),
    total,
    distribution: stars,
  };
};
