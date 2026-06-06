// ========================================
// validators/create-sale.validator.js
// ========================================

const Joi =
  require("joi");

// ========================================
// SCHEMA
// ========================================

const schema = Joi.object({

  customerId:
    Joi.number()
      .integer()
      .positive()
      .allow(null),

  discount:
    Joi.number()
      .min(0)
      .default(0),

  notes:
    Joi.string()
      .max(1000)
      .allow("", null),

  details:
    Joi.array()
      .items(

        Joi.object({

          productId:
            Joi.number()
              .integer()
              .positive()
              .required(),

          quantity:
            Joi.number()
              .positive()
              .required(),

          price:
            Joi.number()
              .min(0)
              .required(),

        })

      )
      .min(1)
      .required(),

  payments:
    Joi.array()
      .items(

        Joi.object({

          paymentMethodId:
            Joi.number()
              .integer()
              .positive()
              .required(),

          amount:
            Joi.number()
              .positive()
              .required(),

          reference:
            Joi.string()
              .max(255)
              .allow("", null),

        })

      )
      .default([]),

});

// ========================================
// MIDDLEWARE
// ========================================

const validateCreateSale =
  (req, res, next) => {

    const {
      error,
      value,
    } = schema.validate(
      req.body,
      {
        abortEarly: false,
      }
    );

    if (error) {

      return res.status(400).json({

        success: false,

        message:
          "Error de validación",

        errors:
          error.details.map(
            d => d.message
          ),

      });

    }

    req.body = value;

    next();

  };

module.exports = {

  validateCreateSale,

};