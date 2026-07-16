const service = require("../services/category.service");

// OBTENER CATEGORÍAS
exports.getCategories = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const { search, page, limit } = req.query;

    const result = await service.getAll(companyId, { search, page, limit });

    return res.json({
      success: true,
      data: result.categories,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// OBTENER CATEGORÍA POR ID
exports.getCategoryById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const category = await service.getById(
      id,
      req.user.companyId,
    );

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    if (error.message === "Categoría no encontrada") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREAR CATEGORÍA
exports.createCategory = async (req, res) => {
  try {
    const category = await service.create({
      name: req.body.name,
      description: req.body.description,
      parentId: req.body.parentId,
      companyId: req.user.companyId,
    });

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ACTUALIZAR CATEGORÍA
exports.updateCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    const category = await service.update(
      id,
      req.user.companyId,
      {
        name: req.body.name,
        description: req.body.description,
        parentId: req.body.parentId,
      },
    );

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    if (
      error.message === "Categoría no encontrada" ||
            error.message === "Una categoría no puede ser su propia categoría padre"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ELIMINAR CATEGORÍA
exports.deleteCategory = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID inválido",
      });
    }

    await service.delete(
      id,
      req.user.companyId,
    );

    return res.json({
      success: true,
      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    if (
      error.message === "Categoría no encontrada" ||
            error.message === "La categoría tiene subcategorías asociadas" ||
            error.message === "La categoría tiene productos asociados"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
