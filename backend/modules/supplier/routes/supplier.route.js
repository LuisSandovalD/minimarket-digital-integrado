const router = require("express").Router();

const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");

const supplierController = require("../controllers/supplier.controller");
const reportSupplier = require("../controllers/supplier.export.controller");

const {
  validateCreateSupplier,
} = require("../validators/supplier-create.validator");

const {
  validateUpdateSupplier,
} = require("../validators/supplier-update.validator");

const {
  validateSupplierQuery,
} = require("../validators/supplier-query.validator");

router.use(auth);

router.get(
  "/",
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER"),
  validateSupplierQuery,
  supplierController.getSuppliers,
);

router.get(
  "/search",
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER"),
  supplierController.searchSuppliers,
);

router.get(
  "/:id",
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER"),
  supplierController.getSupplierById,
);

router.post(
  "/",
  roleCheck("ADMIN", "MANAGER"),
  validateCreateSupplier,
  supplierController.createSupplier,
);

router.patch(
  "/:id",
  roleCheck("ADMIN", "MANAGER"),
  validateUpdateSupplier,
  supplierController.updateSupplier,
);

router.delete(
  "/:id",
  roleCheck("ADMIN"),
  supplierController.deleteSupplier,
);

router.patch(
  "/:id/restore",
  roleCheck("ADMIN"),
  supplierController.restoreSupplier,
);

router.get(
  "/reports/suppliers/pdf",
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR"),
  reportSupplier.downloadSuppliersPDF,
);

router.get(
  "/reports/suppliers/excel",
  roleCheck("ADMIN", "MANAGER", "SUPERVISOR"),
  reportSupplier.downloadSuppliersExcel,
);

module.exports = router;
