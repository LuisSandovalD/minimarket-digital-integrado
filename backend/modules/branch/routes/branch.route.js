const express =
  require("express");

const router =
  express.Router();

const controller =
  require("../controllers/branch.controller");

const authMiddleware =
  require("../../../middleware/auth");

/* ======================================
 * MIDDLEWARE
 * ==================================== */

router.use(
  authMiddleware
);

/* ======================================
 * GET ALL BRANCHES
 * ==================================== */

router.get(
  "/",
  controller.getBranches
);

/* ======================================
 * GET BRANCH BY ID
 * ==================================== */

router.get(
  "/:id",
  controller.getBranchById
);

/* ======================================
 * CREATE BRANCH
 * ==================================== */

router.post(
  "/",
  controller.createBranch
);

/* ======================================
 * UPDATE BRANCH
 * ==================================== */

router.put(
  "/:id",
  controller.updateBranch
);

/* ======================================
 * DELETE BRANCH
 * ==================================== */

router.delete(
  "/:id",
  controller.deleteBranch
);

module.exports =
  router;