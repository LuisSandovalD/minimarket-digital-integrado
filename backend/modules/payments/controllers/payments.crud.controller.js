// ========================================
// PAYMENTS CRUD CONTROLLER
// ========================================

const paymentsServiceRead = require("../services/payments.service.read");
const paymentsServiceWrite = require("../services/payments.service.write");

// ========================================
// READ ALL
// ========================================
// ========================================
// READ ALL (ACTUALIZADO CON FILTROS Y PAGINACIÓN)
// ========================================

const getPaymentsController = async (req, res, next) => {
  try {
    const companyId = req.user.companyId;

    // 1. Capturamos req.query (contiene ?page=1&limit=10&search=... etc.) y lo enviamos al servicio
    const result = await paymentsServiceRead.getPayments(companyId, req.query);

    // 2. Retornamos la estructura limpia separando la data de los metadatos de paginación
    res.json({
      success: true,
      data: result.data, // El array con los registros de pagos
      meta: result.meta,  // El objeto con total, page, limit y totalPages
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// READ ONE
// ========================================

const getPaymentController = async (req, res, next) => {
  try {
    const payment = await paymentsServiceRead.getPayment(
      Number(req.params.id),
    );

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// CREATE
// ========================================

const createPaymentController = async (req, res, next) => {
  try {
    const payment = await paymentsServiceWrite.createPayment(
      req.body,
    );

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// UPDATE
// ========================================

const updatePaymentController = async (req, res, next) => {
  try {
    const payment = await paymentsServiceWrite.updatePayment(
      Number(req.params.id),
      req.body,
    );

    res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// DELETE
// ========================================

const deletePaymentController = async (req, res, next) => {
  try {
    await paymentsServiceWrite.deletePayment(
      Number(req.params.id),
    );

    res.json({
      success: true,
      message: "Pago eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPaymentsController,
  getPaymentController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
};
