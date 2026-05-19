// ========================================
// controllers/inventory-movement.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// GET MOVEMENTS
// ========================================

exports.getMovements =
  async (
    req,
    res
  ) => {

    try {

      const movements =
        await service.getMovements(
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