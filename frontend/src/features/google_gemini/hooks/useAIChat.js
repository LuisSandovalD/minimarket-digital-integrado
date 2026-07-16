import { useState } from "react";
import { sendChatMessage } from "../services/chat.service";

// Recibimos los IDs necesarios para el contexto empresarial y de historial
export default function useAIChat({ conversationId, companyId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async (text) => {
    if (!text.trim()) return;

    // Estructura de mensaje local para renderizar en tu interfaz
    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Adecuado: Pasamos el objeto con los tres parámetros requeridos por el backend
      const responseText = await sendChatMessage({
        conversationId,
        message: text,
        companyId,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "model", // Cambiado a "model" para alinearse con el estándar de tu backend/Gemini
          content: responseText, // Tu backend devuelve directamente la cadena de texto de la respuesta
        },
      ]);
    } catch (error) {
      console.error("Error en el hook de chat:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: error.message || "Ocurrió un error al procesar la solicitud con el director corporativo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    send,
  };
}
