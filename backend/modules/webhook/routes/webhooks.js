const router = require("express").Router();

const controller =
  require("../controllers/webhook.controller");

router.post(
  "/payment",
  controller.paymentWebhook
);

router.post(
  "/notification",
  controller.notificationWebhook
);

module.exports = router;
