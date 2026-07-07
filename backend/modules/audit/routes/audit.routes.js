const express = require("express");

const router = express.Router();
const auditController = require("../controllers/audit.controller");

const verifyToken = require("../../../middleware/auth");
const authorizeRoles = require("../../../middleware/roleCheck");

router.get(
    "/",
    verifyToken,
    authorizeRoles("ADMIN"),
    auditController.getAuditLogs
);

module.exports = router;