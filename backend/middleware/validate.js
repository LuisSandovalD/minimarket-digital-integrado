// middleware/validate.js

const validate =
    (schema) =>
      async (
        req,
        res,
        next,
      ) => {
        try {
          req.body =
                    await schema.parseAsync(
                      req.body,
                    );

          next();
        } catch (error) {
          return res.status(400).json({
            success: false,

            message:
                        "Error de validación",

            errors:
                        error.errors?.map(
                          (err) => ({
                            field:
                                    err.path.join(
                                      ".",
                                    ),

                            message:
                                    err.message,
                          }),
                        ) || [],
          });
        }
      };

module.exports = validate;
