const service = require("../services/unit.service");

exports.getUnits = async (req, res) => {
  try {
    const result = await service.getAll(
      req.user.companyId,
      req.query,
    );

    return res.json({
      success: true,
      data: result.rows,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Error al obtener unidades",
    });
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const unit = await service.getById(
      id,
      req.user.companyId,
    );

    return res.json({
      success: true,
      data: unit,
    });

  } catch (error) {
    console.error(error);

    if (error.message === "ID inválido") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Unidad no encontrada") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al obtener unidad",
    });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const unit = await service.create(
      req.user.companyId,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Unidad creada correctamente",
      data: unit,
    });

  } catch (error) {
    console.error(error);

    if (
      error.message === "La unidad ya existe" ||
            error.message === "El nombre y la abreviación son obligatorios"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al crear unidad",
    });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const unit = await service.update(
      id,
      req.user.companyId,
      req.body,
    );

    return res.json({
      success: true,
      message: "Unidad actualizada correctamente",
      data: unit,
    });

  } catch (error) {
    console.error(error);

    if (error.message === "ID inválido") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Unidad no encontrada") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al actualizar unidad",
    });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await service.delete(
      id,
      req.user.companyId,
    );

    return res.json({
      success: true,
      message: "Unidad eliminada correctamente",
    });

  } catch (error) {
    console.error(error);

    if (error.message === "ID inválido") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Unidad no encontrada") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error al eliminar unidad",
    });
  }
};
