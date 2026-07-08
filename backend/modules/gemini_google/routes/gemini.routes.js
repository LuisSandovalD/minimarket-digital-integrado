// ========================================
// routes/gemini.routes.js
// ========================================

const router =
    require("express").Router();

const auth =
    require("../../../middleware/auth");

const roleCheck =
    require("../../../middleware/roleCheck");

const controller =
    require("../controllers/gemini.controller");

const {
    validateChatRequest
} = require("../validations/chat.validator");

// ========================================
// CHAT IA
// ========================================

router.post(
    "/chat",
    auth,
    roleCheck(
        "ADMIN",
        "MANAGER"
    ),
    validateChatRequest,
    controller.sendMessage
);

module.exports = router;