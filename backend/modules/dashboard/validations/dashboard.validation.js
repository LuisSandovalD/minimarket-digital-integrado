const Joi = require("joi");

exports.dashboardSchema = Joi.object({
    period: Joi.string()
        .valid(
            "TODAY",
            "LAST_7_DAYS",
            "LAST_30_DAYS",
            "LAST_MONTH",
            "THIS_YEAR",
            "LAST_YEAR"
        )
        .optional(),

    startDate: Joi.date()
        .optional(),

    endDate: Joi.date()
        .optional()
});