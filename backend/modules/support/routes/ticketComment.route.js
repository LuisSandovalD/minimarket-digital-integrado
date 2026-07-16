// routes/ticketComment.route.js

const router =
    require("express").Router();

const auth =
    require("../../../middleware/auth");

const roleCheck =
    require("../../../middleware/roleCheck");

const validate =
    require("../../../middleware/validate.js");

const controller =
    require("../controllers/ticketComment.controller");

const {
  createCommentSchema,
} = require(
  "../validations/ticketComment.validation",
);

router.get(
  "/ticket/:ticketId",
  auth,
  controller.getComments,
);

router.post(
  "/ticket/:ticketId",
  auth,
  validate(
    createCommentSchema,
  ),
  controller.createComment,
);

router.patch(
  "/:id/read",
  auth,
  controller.markAsRead,
);

router.delete(
  "/:id",
  auth,
  roleCheck(
    "ADMIN",
    "SUPPORT",
  ),
  controller.deleteComment,
);

module.exports = router;
