// ========================================
// controllers/inventory-movement.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// GET MOVEMENTS
// ========================================


exports.getMovements = async (req, res) => {
  try {
    const result = await service.getMovements({
      companyId: req.user.companyId,

      page: req.query.page,
      limit: req.query.limit,

      search: req.query.search,

      branchId: req.query.branchId,
      productId: req.query.productId,

      type: req.query.type,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error obteniendo movimientos:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error interno del servidor.",
    });
  }
};
// ========================================
// GET PRODUCT MOVEMENTS
// ========================================

exports.getProductMovements =
  async (
    req,
    res
  ) => {

    try {

      const movements =
        await service.getProductMovements(

          Number(
            req.params.productId
          ),

          req.user.companyId
        );

      res.json({

        success: true,

        data:
          movements,
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
// GET BRANCH MOVEMENTS
// ========================================

exports.getBranchMovements =
  async (
    req,
    res
  ) => {

    try {

      const movements =
        await service.getBranchMovements(

          Number(
            req.params.branchId
          ),

          req.user.companyId
        );

      res.json({

        success: true,

        data:
          movements,
      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,
      });

    }

  };