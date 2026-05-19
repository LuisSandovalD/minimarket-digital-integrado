// ========================================
// controllers/inventory-query.controller.js
// ========================================

const service =
  require("../services/inventory.service");

// ========================================
// GET ALL
// ========================================

exports.getInventories =
  async (
    req,
    res
  ) => {

    try {

      const inventories =
        await service.getAll(
          req.user.companyId
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
// GET BY ID
// ========================================

exports.getInventoryById =
  async (
    req,
    res
  ) => {

    try {

      const inventory =
        await service.getById(

          Number(
            req.params.id
          ),

          req.user.companyId
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
    res
  ) => {

    try {

      const inventories =
        await service.getLowStock(
          req.user.companyId
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
    res
  ) => {

    try {

      const inventories =
        await service.getDamagedStock(
          req.user.companyId
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