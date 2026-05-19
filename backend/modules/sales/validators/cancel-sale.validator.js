// ========================================
// validators/cancel-sale.validator.js
// ========================================

const Joi =
  require("joi");

const schema =
  Joi.object({

    id:
      Joi.number()
        .integer()
        .positive()
        .required(),

  });

const validateCancelSale =
  (req, res, next) => {

    const {
      error,
    } = schema.validate(
      req.params
    );

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

  validateCancelSale,

};