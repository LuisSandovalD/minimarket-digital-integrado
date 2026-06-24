// ========================================
// services/gemini.service.js
// ========================================

const { GoogleGenAI } = require('@google/genai');

// Inicialización unificada mediante variable de entorno
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Envía el historial completo a Gemini para mantener la sesión de chat fluida.
 */
const callGeminiChat = async (systemInstruction, chatHistory) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: chatHistory,
            config: {
                // Configuración nativa estricta para @google/genai
                systemInstruction: systemInstruction,
                temperature: 0.7
            }
        });

        // El SDK nuevo expone la propiedad .text directamente de forma segura
        return response.text;
    } catch (error) {
        console.error('[-] Error en Gemini Chat Service:', error);
        throw new Error('No se pudo procesar la respuesta del asistente virtual.');
    }
};

/**
 * Fuerza al modelo a devolver una estructura de datos JSON estricta y mapeada.
 */
const callGeminiJson = async (systemInstruction, rawData, userPrompt) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `DATOS EN BRUTO A EVALUAR (EXCEL PLANO):\n${JSON.stringify(rawData)}` },
                        { text: `PETICIÓN DEL USUARIO:\n${userPrompt || 'Mapea la información basándote en la instrucción.'}` }
                    ]
                }
            ],
            config: {
                // 🔥 Seteamos la instrucción de forma nativa en el sistema para que no gaste tokens de usuario
                systemInstruction: systemInstruction,
                responseMimeType: 'application/json',
                temperature: 0.2
            }
        });

        // Retornamos el objeto parseado directamente
        return JSON.parse(response.text);
    } catch (error) {
        console.error('[-] Error en Gemini JSON Service:', error);
        throw new Error('La IA no pudo estructurar la migración en el formato JSON esperado.');
    }
};

module.exports = {
    callGeminiChat,
    callGeminiJson
};