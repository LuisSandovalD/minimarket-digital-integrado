const Joi = require("joi");

exports.analyticsSchema = Joi.object({

  startDate: Joi.date()
    .required(),

  endDate: Joi.date()
    .required(),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10),

});
