const repository = require("../repositories/review.repository");
const { REVIEW_MESSAGES } = require("../constants/review.constants");

exports.createReview = async (userId, companyId, body) => {
    const reviewExists = await repository.findMyReview(userId, companyId);
    if (reviewExists) {
        throw new Error(REVIEW_MESSAGES.ALREADY_EXISTS);
    }

    return repository.create({
        rating: body.rating,
        comment: body.comment || "",
        userId: Number(userId),
        companyId: Number(companyId),
    });
};

exports.updateMyReview = async (userId, companyId, body) => {
    const review = await repository.findMyReview(userId, companyId);
    if (!review) {
        throw new Error(REVIEW_MESSAGES.NOT_FOUND);
    }

    return repository.update(review.id, {
        rating: body.rating !== undefined ? body.rating : review.rating,
        comment: body.comment !== undefined ? body.comment : review.comment,
    });
};

exports.deleteMyReview = async (userId, companyId) => {
    const review = await repository.findMyReview(userId, companyId);
    if (!review) {
        throw new Error(REVIEW_MESSAGES.NOT_FOUND);
    }

    await repository.delete(review.id);

    return {
        success: true,
        message: REVIEW_MESSAGES.DELETED,
    };
};