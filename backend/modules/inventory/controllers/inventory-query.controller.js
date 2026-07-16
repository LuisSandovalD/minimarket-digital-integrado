// ========================================
// controllers/inventory-query.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// GET ALL
// ========================================

exports.getInventories = async (req, res) => {
  try {
    const result = await service.getAll({
      companyId: req.user.companyId,

      page: req.query.page,
      limit: req.query.limit,

      search: req.query.search,

      branchId: req.query.branchId,
      categoryId: req.query.categoryId,

      stockStatus: req.query.stockStatus,
      minStock: req.query.minStock,

      sortBy: req.query.sortBy,
      order: req.query.order,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error obteniendo inventario:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error interno del servidor.",
    });
  }
};

// ========================================
// GET BY ID
// ========================================

exports.getInventoryById =
  async (
    req,
    res,
  ) => {

    try {

      const inventory =
        await service.getById(

          Number(
            req.params.id,
          ),

          req.user.companyId,
        );

      if (!inventory) {

        return res.status(404).json({

          success: false,

          message:
            "Inventario no encontrado",
        });

      }

      res.json({

        success: true,

        data:
          inventory,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };

// ========================================
// GET LOW STOCK
// ========================================

exports.getLowStock =
  async (
    req,
    res,
  ) => {

    try {

      const inventories =
        await service.getLowStock(
          req.user.companyId,
        );

      res.json({

        success: true,

        data:
          inventories,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };

// ========================================
// GET DAMAGED STOCK
// ========================================

exports.getDamagedStock =
  async (
    req,
    res,
  ) => {

    try {

      const inventories =
        await service.getDamagedStock(
          req.user.companyId,
        );

      res.json({

        success: true,

        data:
          inventories,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };
