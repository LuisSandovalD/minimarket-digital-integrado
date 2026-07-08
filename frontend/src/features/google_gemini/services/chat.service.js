import api from "@/api/axios";

/**
 * Envía un mensaje al orquestador de IA con su contexto de conversación y empresa.
 * * @param {Object} params
 * @param {string} params.conversationId - ID único del chat para mantener la memoria/historial.
 * @param {string} params.message - El mensaje o pregunta del usuario ("hola", "como vamos", etc).
 * @param {string} params.companyId - ID de la empresa para cargar las métricas en el prompt.
 */
export const sendChatMessage = async ({
  conversationId,
  message,
  companyId,
}) => {
  try {
    // Adecuado: Pasamos el objeto completo que espera el processAIRequest del backend
    const { data } = await api.post("/gemini/chat", {
      conversationId,
      message,
      companyId,
    });

    return data; // Retorna la respuesta de texto generada por Gemini
  } catch (error) {
    console.error("[-] Error enviando mensaje a IA:", error);

    throw (
      error?.response?.data || {
        success: false,
        message: "Error al comunicarse con el asistente corporativo.",
      }
    );
  }
};
