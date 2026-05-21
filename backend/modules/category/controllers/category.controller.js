// ========================================
// controllers/category.controller.js
// ========================================

// Importamos el servicio de categorías que interactúa con la base de datos
const service = require("../services/category.service");

// ========================================
// GET ALL
// ========================================

// Obtiene todas las categorías de la empresa del usuario
exports.getCategories = async (req, res) => {
  try {
    // Llama al servicio para obtener la lista de categorías
    const categories = await service.getAll(req.user.companyId);

    // Responde con éxito enviando las categorías encontradas
    return res.json({
      success: true,

      data: categories,
    });
  } catch (error) {
    // En caso de error, devuelve un código 500 (Error interno del servidor)
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================================
// GET BY ID
// ========================================

// Busca una categoría específica usando su número de ID
exports.getCategoryById = async (req, res) => {
  try {
    // Extrae el ID de la ruta (URL) y lo convierte a número
    const id = Number(req.params.id);

    // ========================================
    // VALIDATE ID
    // ========================================

    // Verifica que el ID ingresado sea realmente un número válido
    if (Number.isNaN(id)) {
      // Si no es un número, devuelve un error 400 (Petición incorrecta)
      return res.status(400).json({
        success: false,

        message: "ID inválido",
      });
    }

    // ========================================
    // GET CATEGORY
    // ========================================

    // Llama al servicio para buscar la categoría por su ID y el ID de la empresa
    const category = await service.getById(id, req.user.companyId);

    // Responde con los datos de la categoría encontrada
    return res.json({
      success: true,

      data: category,
    });
  } catch (error) {
    // ========================================
    // NOT FOUND
    // ========================================

    // Verifica si el error es específicamente que la categoría no existe
    if (error.message === "Categoría no encontrada") {
      // Devuelve un error 404 (No encontrado)
      return res.status(404).json({
        success: false,

        message: error.message,
      });
    }

    // Para cualquier otro tipo de error, devuelve un 500
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================================
// CREATE
// ========================================

// Crea una nueva categoría de productos en el sistema
exports.createCategory = async (req, res) => {
  try {
    // Manda los datos que envió el usuario para crear la categoría en la base de datos
    const category = await service.create({
      name: req.body.name,

      description: req.body.description,

      parentId: req.body.parentId,

      companyId: req.user.companyId,
    });

    // Devuelve un código 201 (Creado) junto con los datos de la categoría nueva
    return res.status(201).json({
      success: true,

      data: category,
    });
  } catch (error) {
    // Si falla la creación, devuelve error 500
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================================
// UPDATE
// ========================================

// Actualiza los datos de una categoría que ya existe
exports.updateCategory = async (req, res) => {
  try {
    // Obtiene y convierte el ID de la categoría a actualizar
    const id = Number(req.params.id);

    // ========================================
    // VALIDATE ID
    // ========================================

    // Verifica que el ID sea numérico
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,

        message: "ID inválido",
      });
    }

    // ========================================
    // UPDATE
    // ========================================

    // Envía los nuevos datos al servicio para que actualice la base de datos
    const category = await service.update(
      id,

      req.user.companyId,

      {
        name: req.body.name,

        description: req.body.description,

        parentId: req.body.parentId,
      },
    );

    // Responde con la categoría ya actualizada
    return res.json({
      success: true,

      data: category,
    });
  } catch (error) {
    // ========================================
    // BUSINESS ERRORS
    // ========================================

    // Maneja errores lógicos (ej: categoría no encontrada o tratar de poner una categoría dentro de sí misma)
    if (
      error.message === "Categoría no encontrada" ||
      error.message === "Una categoría no puede ser su propia categoría padre"
    ) {
      // Devuelve código 400 ya que fue un error por datos incompatibles
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }

    // Otros errores devuelven un código 500
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================================
// DELETE
// ========================================

// Elimina una categoría del sistema
exports.deleteCategory = async (req, res) => {
  try {
    // Extrae y convierte el ID
    const id = Number(req.params.id);

    // ========================================
    // VALIDATE ID
    // ========================================

    // Valida que el ID proporcionado sea correcto
    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,

        message: "ID inválido",
      });
    }

    // ========================================
    // DELETE
    // ========================================

    // Envía la orden de eliminación al servicio
    await service.delete(
      id,

      req.user.companyId,
    );

    // Responde confirmando que se eliminó con éxito
    return res.json({
      success: true,

      message: "Categoría eliminada correctamente",
    });
  } catch (error) {
    // ========================================
    // BUSINESS ERRORS
    // ========================================

    // Protege el sistema para no borrar categorías que tengan subcategorías o productos asignados
    if (
      error.message === "Categoría no encontrada" ||
      error.message === "La categoría tiene subcategorías asociadas" ||
      error.message === "La categoría tiene productos asociados"
    ) {
      // Si hay una restricción, bloquea la acción y devuelve error 400
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }

    // Manejo de errores generales del servidor
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
