const router = require("express").Router();
const auth = require("../../../middleware/auth");
const roleCheck = require("../../../middleware/roleCheck");
const controller = require("../controllers/review.controller");

const ALL_ROLES = ["ADMIN", "MANAGER", "SUPERVISOR", "EMPLOYEE"];
const ADMIN_ROLES = ["ADMIN", "MANAGER", "SUPERVISOR"];

// Rutas Privadas
router.post("/", auth, roleCheck(...ALL_ROLES), controller.create);
router.get("/my-review", auth, roleCheck(...ALL_ROLES), controller.getMyReview);
router.put("/my-review", auth, roleCheck(...ALL_ROLES), controller.updateMyReview);
router.delete("/my-review", auth, roleCheck(...ALL_ROLES), controller.deleteMyReview);
router.get("/statistics", auth, roleCheck(...ADMIN_ROLES), controller.statistics);

// Rutas Públicas
router.get("/public", controller.getPublicReviews);
router.get("/public/latest", controller.getLatestReviews);
router.get("/public/statistics", controller.publicStatistics);

module.exports = router;
