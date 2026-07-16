const express = require("express");
const router = express.Router();
const controller = require("../controllers/branch.controller");
const authMiddleware = require("../../../middleware/auth");
const checkSubscription = require("../../../middleware/subscription.middleware");
const roleCheck = require("../../../middleware/roleCheck");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authMiddleware);
router.use(checkSubscription);

router.get("/", roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getBranches);
router.get("/:id", roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getBranchById);

router.post("/", roleCheck("ADMIN", "MANAGER", "SUPPORT"), upload.single("logo"), controller.createBranch);
router.put("/:id", roleCheck("ADMIN", "MANAGER", "SUPPORT"), upload.single("logo"), controller.updateBranch);
router.delete("/:id", roleCheck("ADMIN"), controller.deleteBranch);

module.exports = router;
