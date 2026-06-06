// ========================================
// validators/sale-detail.validator.js
// ========================================

const Joi =
    require("joi");

// ========================================
// PARAM ID
// ========================================

const idSchema =
    Joi.object({

        id: Joi.number()
            .integer()
            .positive()
            .required(),

    });

// ========================================
// SALE ID
// ========================================

const saleIdSchema =
    Joi.object({

        saleId: Joi.number()
            .integer()
            .positive()
            .required(),

    });

// ========================================
// PRODUCT ID
// ========================================

const productIdSchema =
    Joi.object({

        productId: Joi.number()
            .integer()
            .positive()
            .required(),

    });

// ========================================
// VALIDATORS
// ========================================

const validateSaleDetailId =
    (req, res, next) => {

        const { error } =
            idSchema.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        next();
    };

const validateSaleId =
    (req, res, next) => {

        const { error } =
            saleIdSchema.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        next();
    };

const validateProductId =
    (req, res, next) => {

        const { error } =
            productIdSchema.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message:
                    error.details[0].message,
            });
        }

        next();
    };

module.exports = {

    validateSaleDetailId,

    validateSaleId,

    validateProductId,

};