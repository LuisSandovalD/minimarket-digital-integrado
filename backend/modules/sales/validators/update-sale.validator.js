// ========================================
// validators/update-sale.validator.js
// ========================================

const Joi =
  require("joi");

module.exports = {

  // ========================================
  // UPDATE SALE VALIDATOR
  // ========================================

  updateSaleValidator:

    Joi.object({

      // ========================================
      // CUSTOMER
      // ========================================

      customerId:

        Joi.number()
          .integer()
          .positive()
          .allow(null),

      // ========================================
      // DISCOUNT
      // ========================================

      discount:

        Joi.number()
          .min(0)
          .default(0),

      // ========================================
      // NOTES
      // ========================================

      notes:

        Joi.string()
          .max(1000)
          .allow("", null),

      // ========================================
      // DETAILS
      // ========================================

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

    }),

};