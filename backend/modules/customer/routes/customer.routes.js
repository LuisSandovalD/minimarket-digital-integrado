// =========================================================================
// routes/customer.routes.js
// =========================================================================

const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck"); // 🌟 Importamos el validador de roles

// Importamos TODO desde el controlador unificado
const customerController = require("../controllers/customer.controller");

// --- RUTAS CRUD ESTÁNDAR ---

// Lectura de la lista: Todos los roles autenticados pueden ver la tabla
router.get(
    "/",
    auth,
    roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"),
    customerController.getCustomers
);

// Lectura de un cliente específico: Todos excepto VIEWER (opcional, o incluirlos si solo miran perfiles)
router.get(
    "/:id",
    auth,
    roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"),
    customerController.getCustomerById
);

// Creación de clientes: ADMIN, MANAGER, SUPERVISOR y EMPLOYEES (vendedores/cajeros)
router.post(
    "/",
    auth,
    roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"),
    customerController.createCustomer
);

// Actualización de clientes: ADMIN, MANAGER, SUPERVISOR y SUPPORT (para corregir datos de contacto)
// Nota: Tu controlador debería validar internamente que SUPPORT no pueda alterar campos de crédito/deuda.
router.put(
    "/:id",
    auth,
    roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "SUPPORT"),
    customerController.updateCustomer
);

// Eliminación de clientes: Estricto y exclusivo para el ADMINISTRADOR
router.delete(
    "/:id",
    auth,
    roleCheck("ADMIN"),
    customerController.deleteCustomer
);

// --- RUTAS DE REPORTES ---

// Descarga de Reportes (PDF/Excel): ADMIN, MANAGER y SUPERVISOR (Roles gerenciales/auditoría)
router.get(
    "/reports/customers/pdf",
    auth,
    roleCheck("ADMIN", "MANAGER", "SUPERVISOR"),
    customerController.downloadCustomersPDFController
);

router.get(
    "/reports/customers/excel",
    auth,
    roleCheck("ADMIN", "MANAGER", "SUPERVISOR"),
    customerController.downloadCustomersExcelController
);

module.exports = router;