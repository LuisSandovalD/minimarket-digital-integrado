// ========================================
// modules/review/validations/review.validation.js
// ========================================

const Joi = require("joi");
const { REVIEW_LIMITS } = require("../constants/review.constants");

// ========================================
// Crear reseña
// ========================================

const createSchema = Joi.object({
  rating: Joi.number()
    .integer()
    .min(REVIEW_LIMITS.MIN_RATING)
    .max(REVIEW_LIMITS.MAX_RATING)
    .required()
    .messages({
      "number.base": "La calificación debe ser un número.",
      "number.integer": "La calificación debe ser un número entero.",
      "number.min": `La calificación mínima es ${REVIEW_LIMITS.MIN_RATING} estrella.`,
      "number.max": `La calificación máxima es ${REVIEW_LIMITS.MAX_RATING} estrellas.`,
      "any.required": "La calificación es obligatoria.",
    }),

  comment: Joi.string()
    .trim()
    .max(REVIEW_LIMITS.MAX_COMMENT_LENGTH)
    .allow("")
    .optional()
    .messages({
      "string.base": "El comentario debe ser un texto.",
      "string.max": `El comentario no puede superar los ${REVIEW_LIMITS.MAX_COMMENT_LENGTH} caracteres.`,
    }),
});

// ========================================
// Actualizar reseña
// ========================================

const updateSchema = Joi.object({
  rating: Joi.number()
    .integer()
    .min(REVIEW_LIMITS.MIN_RATING)
    .max(REVIEW_LIMITS.MAX_RATING)
    .optional(),

  comment: Joi.string()
    .trim()
    .max(REVIEW_LIMITS.MAX_COMMENT_LENGTH)
    .allow("")
    .optional(),
}).min(1);

module.exports = {
  createSchema,
  updateSchema,
};
