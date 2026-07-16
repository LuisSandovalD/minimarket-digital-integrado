// ========================================
// services/ai-orchestrator.service.js
// ========================================

const {
  generateResponse,
} = require("./gemini.service");

const {
  getConversation,
  saveMessage,
} = require("./memory.service");

const businessContextService = require("./business-context.service");

const {
  SYSTEM_PROMPT,
} = require("../prompts/system.prompt");

const {
  buildAdminPrompt,
} = require("../prompts/admin.prompt");

const processAIRequest =
    async ({
      conversationId,
      message,
      companyId,
    }) => {
      // 1. Obtener la analítica completa de la DB
      const businessData =
            await businessContextService.build(companyId);

      // 2. Generar el prompt administrativo con el contexto fresco e integrado
      const adminPromptContenido = buildAdminPrompt(businessData);

      // 3. Montar la instrucción del sistema completa
      const systemPrompt = `
${SYSTEM_PROMPT}

${adminPromptContenido}
`;

      saveMessage(
        conversationId,
        "user",
        message,
      );

      const conversation =
            getConversation(
              conversationId,
            );

      const response =
            await generateResponse({
              systemPrompt,
              conversation,
            });

      saveMessage(
        conversationId,
        "model",
        response,
      );

      return response;
    };

module.exports = {
  processAIRequest,
};
