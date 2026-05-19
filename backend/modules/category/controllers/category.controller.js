// ========================================
// controllers/category.controller.js
// ========================================

const service =
  require("../services/category.service");

// ========================================
// GET ALL
// ========================================

exports.getCategories =
  async (
    req,
    res
  ) => {

    try {

      const categories =
        await service.getAll(
          req.user.companyId
        );

      return res.json({

        success: true,

        data: categories,

      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ========================================
// GET BY ID
// ========================================

exports.getCategoryById =
  async (
    req,
    res
  ) => {

    try {

      const id =
        Number(
          req.params.id
        );

      // ========================================
      // VALIDATE ID
      // ========================================

      if (
        Number.isNaN(id)
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "ID inválido",

          });

      }

      // ========================================
      // GET CATEGORY
      // ========================================

      const category =
        await service.getById(
          id,
          req.user.companyId
        );

      return res.json({

        success: true,

        data: category,

      });

    } catch (error) {

      // ========================================
      // NOT FOUND
      // ========================================

      if (
        error.message ===
        "Categoría no encontrada"
      ) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              error.message,

          });

      }

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ========================================
// CREATE
// ========================================

exports.createCategory =
  async (
    req,
    res
  ) => {

    try {

      const category =
        await service.create({

          name:
            req.body.name,

          description:
            req.body.description,

          parentId:
            req.body.parentId,

          companyId:
            req.user.companyId,

        });

      return res
        .status(201)
        .json({

          success: true,

          data: category,

        });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ========================================
// UPDATE
// ========================================

exports.updateCategory =
  async (
    req,
    res
  ) => {

    try {

      const id =
        Number(
          req.params.id
        );

      // ========================================
      // VALIDATE ID
      // ========================================

      if (
        Number.isNaN(id)
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "ID inválido",

          });

      }

      // ========================================
      // UPDATE
      // ========================================

      const category =
        await service.update(

          id,

          req.user.companyId,

          {

            name:
              req.body.name,

            description:
              req.body.description,

            parentId:
              req.body.parentId,

          }

        );

      return res.json({

        success: true,

        data: category,

      });

    } catch (error) {

      // ========================================
      // BUSINESS ERRORS
      // ========================================

      if (

        error.message ===
          "Categoría no encontrada" ||

        error.message ===
          "Una categoría no puede ser su propia categoría padre"

      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              error.message,

          });

      }

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

// ========================================
// DELETE
// ========================================

exports.deleteCategory =
  async (
    req,
    res
  ) => {

    try {

      const id =
        Number(
          req.params.id
        );

      // ========================================
      // VALIDATE ID
      // ========================================

      if (
        Number.isNaN(id)
      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              "ID inválido",

          });

      }

      // ========================================
      // DELETE
      // ========================================

      await service.delete(

        id,

        req.user.companyId

      );

      return res.json({

        success: true,

        message:
          "Categoría eliminada correctamente",

      });

    } catch (error) {

      // ========================================
      // BUSINESS ERRORS
      // ========================================

      if (

        error.message ===
          "Categoría no encontrada" ||

        error.message ===
          "La categoría tiene subcategorías asociadas" ||

        error.message ===
          "La categoría tiene productos asociados"

      ) {

        return res
          .status(400)
          .json({

            success: false,

            message:
              error.message,

          });

      }

      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };