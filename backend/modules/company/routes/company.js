const router =
  require("express").Router();

const auth =
  require("../../../middleware/auth");

const controller =
  require("../controllers/company.controller");

/* ========================================
 * MY COMPANY
 * ====================================== */

router.get(
  "/me",
  auth,
  controller.getMyCompany
);

/* ========================================
 * GET ALL
 * ====================================== */

router.get(
  "/",
  auth,
  controller.getCompanies
);

/* ========================================
 * GET BY SLUG
 * ====================================== */

router.get(
  "/slug/:slug",
  controller.getCompanyBySlug
);

/* ========================================
 * GET BY ID
 * ====================================== */

router.get(
  "/:id",
  auth,
  controller.getCompanyById
);

/* ========================================
 * CREATE
 * ====================================== */

router.post(
  "/",
  auth,
  controller.createCompany
);

/* ========================================
 * UPDATE
 * ====================================== */

router.put(
  "/:id",
  auth,
  controller.updateCompany
);

/* ========================================
 * DELETE
 * ====================================== */

router.delete(
  "/:id",
  auth,
  controller.deleteCompany
);

module.exports = router;