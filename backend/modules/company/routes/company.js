const router = require("express").Router();
const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");
const controller = require("../controllers/company.controller");

// 🌟 CONFIGURACIÓN DE MULTER EN MEMORIA (Evita archivos temporales en disco)
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/me", auth, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER"), controller.getMyCompany);

router.get("/users", auth, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "SUPPORT"), controller.getCompanyUsers);
router.get("/users/admins", auth, roleCheck("ADMIN", "MANAGER", "SUPPORT"), controller.getAdmins);
router.get("/users/employees", auth, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getEmployees);

router.get("/slug/:slug", controller.getCompanyBySlug);
router.get("/", auth, roleCheck("ADMIN", "SUPPORT"), controller.getCompanies);
router.get("/:id", auth, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "SUPPORT"), controller.getCompanyById);

// 🌟 INTERCEPTAMOS EL LOGO COMO UN ARCHIVO BINARIO REAL
router.post("/", auth, roleCheck("ADMIN", "SUPPORT"), upload.single("logo"), controller.createCompany);
router.put("/:id", auth, roleCheck("ADMIN", "MANAGER", "SUPPORT"), upload.single("logo"), controller.updateCompany);
router.delete("/:id", auth, roleCheck("ADMIN"), controller.deleteCompany);

module.exports = router;