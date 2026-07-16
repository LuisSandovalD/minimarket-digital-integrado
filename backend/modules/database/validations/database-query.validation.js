// modules/database/validations/database-query.validation.js

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Forbidden SQL Keywords
|--------------------------------------------------------------------------
*/

const forbiddenKeywords = [

  "DROP",

  "DELETE",

  "TRUNCATE",

  "ALTER",

  "UPDATE",

  "GRANT",

  "REVOKE",

  "CREATE",

  "REPLACE",
];

/*
|--------------------------------------------------------------------------
| Database Query Validation
|--------------------------------------------------------------------------
*/

const databaseQueryValidation =
    z.object({

      query: z

        .string({
          required_error:
                    "Query is required",
        })

        .min(
          1,
          "Query cannot be empty",
        )

        .max(
          5000,
          "Query exceeds maximum length",
        )

        .transform((value) =>
          value.trim(),
        )

        .refine((query) => {

          const upperQuery =
                    query.toUpperCase();

          return !forbiddenKeywords.some(
            (keyword) =>
              upperQuery.includes(
                keyword,
              ),
          );

        }, {

          message:
                    "Dangerous SQL query detected",
        })

        .refine((query) => {

          const normalized =
                    query
                      .trim()
                      .toUpperCase();

          return (

            normalized.startsWith(
              "SELECT",
            ) ||

                    normalized.startsWith(
                      "WITH",
                    )
          );

        }, {

          message:
                    "Only SELECT queries are allowed",
        }),
    });

module.exports =
    databaseQueryValidation;
