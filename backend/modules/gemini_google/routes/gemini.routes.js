const express = require('express');
const router = express.Router();

const controller = require('../controllers/gemini.controller.js');
const auth = require('../../../middleware/auth');
const { validateChatInput, validateMigrationInput } = require('../validations/gemini.validation.js');

router.post('/chat', auth, validateChatInput, controller.handleAdminChat);
router.post('/migrate', auth, validateMigrationInput, controller.handleExcelMigrationAnalysis);

module.exports = router;