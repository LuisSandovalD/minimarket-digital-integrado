import api from "@/api/axios";

/**
 * Envía el mensaje actual y el historial acumulado a Mateo.
 * @param {string} currentMessage - El mensaje escrito por el usuario (o vacío si es el arranque)
 * @param {Array} chatHistory - Lista de mensajes previos [{ role: 'user'|'model', text: '...' }]
 */
export const sendChatMessage = async (
  currentMessage = "",
  chatHistory = [],
) => {
  try {
    const { data } = await api.post("/gemini/chat", {
      currentMessage,
      chatHistory,
    });
    return data; // Retorna { success: true, reply: "..." }
  } catch (error) {
    console.error("Error en sendChatMessage:", error);
    throw error?.response?.data || { message: "Error al conectar con Mateo" };
  }
};

/**
 * Envía un objeto con los datos extraídos de un Excel para su estructuración predictiva.
 * Endpoint emparejado con el Backend: '/gemini/migrate'
 * @param {Array|Object} excelData - Datos planos en JSON extraídos del componente Excel
 * @param {string} userPrompt - Parámetro opcional de personalización
 */
export const analyzeExcelMigration = async (excelData, userPrompt = "") => {
  try {
    const { data } = await api.post("/gemini/migrate", {
      excelData,
      userPrompt,
    });
    return data; // Retorna { success: true, migrationBlueprint: {...} }
  } catch (error) {
    console.error("Error en analyzeExcelMigration:", error);
    throw (
      error?.response?.data || {
        message: "Error al procesar la migración del archivo",
      }
    );
  }
};
