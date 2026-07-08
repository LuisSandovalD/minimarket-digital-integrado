// ========================================
// services/gemini.service.js
// ========================================

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async ({
    systemPrompt,
    conversation,
}) => {
    try {
        const response =
            await ai.models.generateContent({
                model: "gemini-2.5-flash",

                contents: conversation,

                config: {
                    systemInstruction: systemPrompt,
                    temperature: 0.7,
                },
            });

        return response.text;
    } catch (error) {
        console.error(
            "[-] Gemini Service Error:",
            error
        );

        throw new Error(
            "No se pudo obtener respuesta de Gemini."
        );
    }
};

module.exports = {
    generateResponse,
};