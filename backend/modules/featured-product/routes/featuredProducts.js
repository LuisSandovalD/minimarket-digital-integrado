const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller =
  require("../controllers/featuredProduct.controller");

router.get(
  "/",
  auth,
  controller.getFeaturedProducts
);

router.patch(
  "/:id",
  auth,
  controller.toggleFeatured
);

module.exports = router;
