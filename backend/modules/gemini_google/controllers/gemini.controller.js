// ========================================
// controllers/gemini.controller.js
// ========================================

const aiOrchestrator = require("../services/ai-orchestrator.service");

const sendMessage = async (req, res) => {
    try {
        // Obtenemos los datos del usuario autenticado por el middleware
        const companyId = req.user.companyId;

        // Adecuado: Mapeamos los campos del body. 
        // Si el frontend envía 'conversationId' o 'sessionId', lo unificamos.
        const { message, sessionId, conversationId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "El mensaje es obligatorio"
            });
        }

        // Determinamos el ID de la conversación (usando el fallback por si acaso)
        const activeConversationId = conversationId || sessionId;

        if (!activeConversationId) {
            return res.status(400).json({
                success: false,
                message: "El identificador de conversación (conversationId o sessionId) es obligatorio"
            });
        }

        // Corregido: Llamamos al método correcto del orquestador con las propiedades correctas
        const response = await aiOrchestrator.processAIRequest({
            conversationId: activeConversationId,
            message,
            companyId,
        });

        // Corregido: Devolvemos la respuesta para que coincida exactamente con lo que el hook espera leer
        return res.status(200).json(response);

    } catch (error) {
        console.error("❌ Error Gemini Controller:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del asistente"
        });
    }
};

module.exports = {
    sendMessage
};