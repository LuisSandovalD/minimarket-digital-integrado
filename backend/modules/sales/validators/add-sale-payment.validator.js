// ========================================
// validators/add-sale-payment.validator.js
// ========================================
const Joi = require("joi"); // O la librería de validación que uses en los demás archivos

const validateAddSalePayment = (req, res, next) => {
    const schema = Joi.object({
        payments: Joi.array().items(
            Joi.object({
                method: Joi.string().valid("CASH", "CARD", "YAPE", "PLIN", "TRANSFER").required(),
                paymentMethodId: Joi.number().required(),
                amount: Joi.number().positive().precision(2).required(),
                reference: Joi.string().allow(null, ""),
                dueDate: Joi.string().allow(null, "")
            })
        ).min(1).required()
    }).unknown(true); // Ignora campos informativos del frontend como isAbonoFlow o totalSale

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Estructura de cobro inválida para la caja.",
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

module.exports = {
    validateAddSalePayment
};