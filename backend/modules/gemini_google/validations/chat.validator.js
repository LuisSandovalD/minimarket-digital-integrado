// ========================================
// validations/chat.validator.js
// ========================================

const Joi = require("joi");

const chatSchema = Joi.object({
    message: Joi.string()
        .trim()
        .min(1)
        .max(5000)
        .required()
        .messages({
            "string.empty": "El mensaje no puede estar vacío",
            "any.required": "El mensaje es obligatorio",
        }),

    sessionId: Joi.string()
        .trim()
        .max(100)
        .optional(),
});

const validateChatRequest = (req, res, next) => {
    const { error } = chatSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Datos inválidos",
            errors: error.details.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }

    next();
};

module.exports = {
    validateChatRequest,
};