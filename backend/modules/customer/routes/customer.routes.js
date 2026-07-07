// =========================================================================
// routes/customer.routes.js
// =========================================================================

const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

// Importamos TODO desde el controlador unificado
const customerController = require("../controllers/customer.controller");

// --- RUTAS CRUD ESTÁNDAR ---
router.get("/", auth, customerController.getCustomers);
router.get("/:id", auth, customerController.getCustomerById);
router.post("/", auth, customerController.createCustomer);
router.put("/:id", auth, customerController.updateCustomer);
router.delete("/:id", auth, customerController.deleteCustomer);

// --- RUTAS DE REPORTES ---
router.get("/reports/customers/pdf", auth, customerController.downloadCustomersPDFController);
router.get("/reports/customers/excel", auth, customerController.downloadCustomersExcelController);

module.exports = router;