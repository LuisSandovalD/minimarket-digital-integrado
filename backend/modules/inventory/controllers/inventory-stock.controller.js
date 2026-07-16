// ========================================
// controllers/inventory-stock.controller.js
// ========================================

// Corregido: Nos aseguramos de apuntar al archivo exacto de servicios
const service = require("../services/inventory-stock.service");

// ========================================
// ADD STOCK
// ========================================
exports.addStock = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Inicie sesión para realizar esta operación.",
      });
    }

    const inventory = await service.addStock(
      Number(req.params.id),
      Number(req.body.quantity),
      req.user.id,
      req.body.reason,
    );

    res.json({
      success: true,
      message: "Stock agregado correctamente",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// REMOVE STOCK
// ========================================
exports.removeStock = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Inicie sesión para realizar esta operación.",
      });
    }

    const inventory = await service.removeStock(
      Number(req.params.id),
      Number(req.body.quantity),
      req.user.id,
      req.body.reason,
    );

    res.json({
      success: true,
      message: "Stock removido correctamente",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// RESERVE STOCK
// ========================================
exports.reserveStock = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Inicie sesión para realizar esta operación.",
      });
    }

    const inventory = await service.reserveStock(
      Number(req.params.id),
      Number(req.body.quantity),
    );

    res.json({
      success: true,
      message: "Stock reservado correctamente",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// RELEASE RESERVED STOCK
// ========================================
exports.releaseReservedStock = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Inicie sesión para realizar esta operación.",
      });
    }

    const inventory = await service.releaseReservedStock(
      Number(req.params.id),
      Number(req.body.quantity),
    );

    res.json({
      success: true,
      message: "Reserva liberada correctamente",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// ADD DAMAGED STOCK
// ========================================
exports.addDamagedStock = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Inicie sesión para realizar esta operación.",
      });
    }

    const inventory = await service.addDamagedStock(
      Number(req.params.id),
      Number(req.body.quantity),
      req.user.id,
      req.body.reason,
    );

    res.json({
      success: true,
      message: "Producto marcado como dañado",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
