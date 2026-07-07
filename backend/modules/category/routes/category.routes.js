const router = require("express").Router();
const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");
const checkSubscription = require("../../../middleware/subscription.middleware");
const controller = require("../controllers/category.controller");

router.get("/", auth, checkSubscription, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getCategories);
router.get("/:id", auth, checkSubscription, roleCheck("ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE", "VIEWER", "SUPPORT"), controller.getCategoryById);

router.post("/", auth, checkSubscription, roleCheck("ADMIN", "MANAGER", "SUPPORT"), controller.createCategory);
router.put("/:id", auth, checkSubscription, roleCheck("ADMIN", "MANAGER", "SUPPORT"), controller.updateCategory);
router.delete("/:id", auth, checkSubscription, roleCheck("ADMIN"), controller.deleteCategory);

module.exports = router;