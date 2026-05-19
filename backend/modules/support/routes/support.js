const router = require("express").Router();

const auth = require("../../../middleware/auth");

const controller = require("../controllers/support.controller");

router.get(
  "/tickets",
  auth,
  controller.getTickets
);

router.get(
  "/tickets/:id",
  auth,
  controller.getTicketById
);

router.post(
  "/tickets",
  auth,
  controller.createTicket
);

router.post(
  "/tickets/comment",
  auth,
  controller.addComment
);

router.patch(
  "/tickets/status/:id",
  auth,
  controller.updateTicketStatus
);

module.exports = router;
