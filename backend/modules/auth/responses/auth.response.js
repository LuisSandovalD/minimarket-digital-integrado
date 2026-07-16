// ========================================
// responses/auth.response.js
// ========================================

const successResponse = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    ...data,
  });
};

const errorResponse = (res, error, status = 500) => {
  console.error(error);

  return res.status(status).json({
    success: false,
    message: error.message,
  });
};

// EXPORTACIÓN UNIFICADA: Garantiza consistencia total en tus controladores
module.exports = {
  successResponse,
  errorResponse,
};
