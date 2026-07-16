// routes/supportTicket.route.js

const router =
    require("express").Router();

const auth =
    require("../../../middleware/auth");

const roleCheck =
    require("../../../middleware/roleCheck");

const validate =
    require("../../../middleware/validate.js");

const controller =
    require("../controllers/supportTicket.controller");

const {
  createTicketSchema,
  updateTicketSchema,
} = require(
  "../validations/supportTicket.validation",
);

router.get(
  "/",
  auth,
  controller.getTickets,
);

router.get(
  "/stats",
  auth,
  controller.getStats,
);

router.get(
  "/:id",
  auth,
  controller.getTicketById,
);

router.post(
  "/",
  auth,
  validate(
    createTicketSchema,
  ),
  controller.createTicket,
);

router.put(
  "/:id",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER",
    "SUPPORT",
  ),
  validate(
    updateTicketSchema,
  ),
  controller.updateTicket,
);

router.patch(
  "/:id/status",
  auth,
  roleCheck(
    "ADMIN",
    "MANAGER",
    "SUPPORT",
  ),
  controller.updateStatus,
);

router.delete(
  "/:id",
  auth,
  roleCheck(
    "ADMIN",
  ),
  controller.deleteTicket,
);

module.exports = router;
