const branchService =
  require("../services/branch.service");

// ======================================
// GET BRANCHES
// ======================================

exports.getBranches =
async (req, res) => {

  try {

    const companyId =
      req.user.companyId;

    const data =
      await branchService
        .getBranches(
          companyId
        );

    return res.json({

      success: true,

      data,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ======================================
// GET BRANCH BY ID
// ======================================

exports.getBranchById =
async (req, res) => {

  try {

    const branchId =
      parseInt(
        req.params.id
      );

    const companyId =
      req.user.companyId;

    const data =
      await branchService
        .getBranchById(
          branchId,
          companyId
        );

    return res.json({

      success: true,

      data,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ======================================
// CREATE BRANCH
// ======================================

exports.createBranch =
async (req, res) => {

  try {

    const companyId =
      req.user.companyId;

    const data =
      await branchService
        .createBranch(
          req.body,
          companyId
        );

    return res.status(201).json({

      success: true,

      data,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ======================================
// UPDATE BRANCH
// ======================================

exports.updateBranch =
async (req, res) => {

  try {

    const branchId =
      parseInt(
        req.params.id
      );

    const companyId =
      req.user.companyId;

    const data =
      await branchService
        .updateBranch(
          branchId,
          req.body,
          companyId
        );

    return res.json({

      success: true,

      data,

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};

// ======================================
// DELETE BRANCH
// ======================================

exports.deleteBranch =
async (req, res) => {

  try {

    const branchId =
      parseInt(
        req.params.id
      );

    const companyId =
      req.user.companyId;

    await branchService
      .deleteBranch(
        branchId,
        companyId
      );

    return res.json({

      success: true,

      message:
        "Sucursal eliminada",

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        error.message,

    });

  }

};