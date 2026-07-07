const express = require("express");
const router = express.Router();
const controller = require("../controllers/branch.controller");
const authMiddleware = require("../../../middleware/auth");
const checkSubscription = require("../../../middleware/subscription.middleware");
const roleCheck = require("../../../middleware/roleCheck");

router.use(authMiddleware);
router.use(checkSubscription);

router.get("/", roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getBranches);
router.get("/:id", roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getBranchById);

router.post("/", roleCheck("ADMIN", "MANAGER", "SUPPORT"), controller.createBranch);
router.put("/:id", roleCheck("ADMIN", "MANAGER", "SUPPORT"), controller.updateBranch);
router.delete("/:id", roleCheck("ADMIN"), controller.deleteBranch);

module.exports = router;