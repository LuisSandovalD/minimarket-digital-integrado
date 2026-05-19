/* ======================================
 * SUCCESS RESPONSE
 * ==================================== */

exports.successResponse =
  (
    res,
    data,
    status = 200
  ) => {

    return res
      .status(status)
      .json({

        success: true,

        ...data,

      });

  };

/* ======================================
 * ERROR RESPONSE
 * ==================================== */

exports.errorResponse =
  (
    res,
    error,
    status = 500
  ) => {

    console.error(error);

    return res
      .status(status)
      .json({

        success: false,

        message:
          error.message,

      });

  };