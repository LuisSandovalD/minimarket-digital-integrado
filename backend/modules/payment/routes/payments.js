const router = require("express").Router();

const auth = require("../../../middleware/auth");

const roleCheck = require("../../../middleware/roleCheck");

const controller = require("../controllers/payment.controller");

router.get(
  "/",
  auth,
  controller.getPayments
);

router.get(
  "/:id",
  auth,
  controller.getPaymentById
);

router.post(
  "/",
  auth,
  roleCheck("ADMIN", "MANAGER"),
  controller.createPayment
);

router.put(
  "/:id",
  auth,
  roleCheck("ADMIN", "MANAGER"),
  controller.updatePayment
);

router.delete(
  "/:id",
  auth,
  roleCheck("ADMIN"),
  controller.deletePayment
);

module.exports = router;
