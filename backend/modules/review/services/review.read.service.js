const repository = require("../repositories/review.repository");
const { REVIEW_MESSAGES } = require("../constants/review.constants");

exports.getMyReview = async (userId, companyId) => {
  const review = await repository.findMyReview(userId, companyId);
  if (!review) {
    throw new Error(REVIEW_MESSAGES.NOT_FOUND);
  }
  return review;
};

exports.getReviews = async (companyId) => {
  return repository.findAll(companyId);
};

exports.getReview = async (id, companyId) => {
  const review = await repository.findById(id, companyId);
  if (!review) {
    throw new Error(REVIEW_MESSAGES.NOT_FOUND);
  }
  return review;
};

exports.getStatistics = async (companyId) => {
  const [total, average, distribution, latest] = await Promise.all([
    repository.count(companyId),
    repository.average(companyId),
    repository.distribution(companyId),
    repository.latest(companyId),
  ]);

  const stars = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  distribution.forEach(item => {
    stars[item.rating] = item._count.rating;
  });

  return {
    average: Number(average._avg.rating || 0).toFixed(1),
    total,
    distribution: stars,
    latest,
  };
};

exports.getPublicReviews = async () => {
  return repository.getPublicReviews();
};

exports.getLatestReviews = async (limit = 10) => {
  return repository.getLatestReviews(limit);
};

exports.getPublicStatistics = async () => {
  return repository.getPublicStatistics();
};
