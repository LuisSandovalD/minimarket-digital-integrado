// ========================================
// modules/review/constants/review.constants.js
// ========================================

const REVIEW_LIMITS = {
    MIN_RATING: 1,
    MAX_RATING: 5,
    MAX_COMMENT_LENGTH: 500,
};

const REVIEW_MESSAGES = {
    CREATED: "Reseña registrada correctamente.",
    UPDATED: "Reseña actualizada correctamente.",
    DELETED: "Reseña eliminada correctamente.",

    NOT_FOUND: "La reseña solicitada no existe.",
    ALREADY_EXISTS:
        "Ya registraste una reseña para esta empresa.",
    UNAUTHORIZED:
        "No tienes permisos para modificar esta reseña.",
};

const REVIEW_ORDER = {
    NEWEST: "desc",
    OLDEST: "asc",
};

module.exports = {
    REVIEW_LIMITS,
    REVIEW_MESSAGES,
    REVIEW_ORDER,
};