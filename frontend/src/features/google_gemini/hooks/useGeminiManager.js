import { useCallback, useEffect, useRef, useState } from "react";
import {
    analyzeExcelMigration,
    sendChatMessage,
} from "../services/gemini.service";

export function useGeminiManager() {
    const [activeTab, setActiveTab] = useState("chat");

    // Estados del Chat Estratégico
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Estados de Migración
    const [rawJsonInput, setRawJsonInput] = useState("");
    const [customPrompt, setCustomPrompt] = useState("");
    const [migrationResult, setMigrationResult] = useState(null);
    const [isMigrationLoading, setIsMigrationLoading] = useState(false);
    const [migrationError, setMigrationError] = useState("");

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Usamos useCallback para que la función no se recree en cada render
    const triggerAutomaticGreeting = useCallback(async () => {
        setIsChatLoading(true);
        try {
            const data = await sendChatMessage("", []); // Dispara el snapshot en backend
            setMessages([{ role: "model", text: data.reply }]);
        } catch (err) {
            setMessages([
                {
                    role: "model",
                    text: "⚠️ Hola Administrador, no logré cargar los datos del ERP de forma automática. ¿En qué deseas que nos enfoquemos hoy?",
                },
            ]);
        } finally {
            setIsChatLoading(false);
        }
    }, []);

    // EFECTO 1: Control Seguro del Saludo Inicial al montar el componente
    useEffect(() => {
        if (activeTab === "chat" && messages.length === 0 && !isChatLoading) {
            triggerAutomaticGreeting();
        }
        // Agregamos las dependencias correctas para evitar lecturas fantasmas
    }, [activeTab, messages.length, isChatLoading, triggerAutomaticGreeting]);

    // EFECTO 2: Auto-scroll al recibir mensajes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e, textToSend = null) => {
        if (e) e.preventDefault();

        const messageText = textToSend || inputMessage.trim();
        if (!messageText || isChatLoading) return;

        if (!textToSend) setInputMessage("");

        // Clonamos el historial actual antes del cambio de estado para mandarlo al backend de forma síncrona
        const backupHistory = [...messages];
        const updatedMessages = [
            ...backupHistory,
            { role: "user", text: messageText },
        ];

        setMessages(updatedMessages);
        setIsChatLoading(true);

        try {
            // 🔥 CORRECCIÓN CRÍTICA: Enviamos 'backupHistory' (el historial real acumulado)
            // en lugar de 'messages', ya que el estado de React es asíncrono y podría ir desfasado.
            const data = await sendChatMessage(messageText, backupHistory);
            setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    text: `⚠️ Hubo un contratiempo: ${err.message || "Por favor reintenta."}`,
                },
            ]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleProcessMigration = async (e) => {
        e.preventDefault();
        if (!rawJsonInput.trim() || isMigrationLoading) return;

        setIsMigrationLoading(true);
        setMigrationError("");
        setMigrationResult(null);

        try {
            let parsedData;
            try {
                parsedData = JSON.parse(rawJsonInput);
            } catch (jsonErr) {
                throw new Error(
                    "Formato JSON inválido. Verifica la sintaxis de las filas copiadas.",
                );
            }

            const data = await analyzeExcelMigration(parsedData, customPrompt);
            setMigrationResult(data.migrationBlueprint);
        } catch (err) {
            setMigrationError(
                err.message || "Fallo al estructurar el mapeo de migración.",
            );
        } finally {
            setIsMigrationLoading(false);
        }
    };

    // 🔥 SOLUCIÓN AL RESET DEL CHAT:
    // Al limpiar el array, el EFECTO 1 detectará automáticamente que messages.length === 0
    // y disparará triggerAutomaticGreeting() de forma limpia y ordenada, sin duplicar llamadas.
    const handleResetChat = () => {
        if (isChatLoading) return;
        setMessages([]);
    };

    return {
        activeTab,
        setActiveTab,
        messages,
        inputMessage,
        setInputMessage,
        isChatLoading,
        chatEndRef,
        rawJsonInput,
        setRawJsonInput,
        customPrompt,
        setCustomPrompt,
        migrationResult,
        isMigrationLoading,
        migrationError,
        handleSendMessage,
        handleProcessMigration,
        handleResetChat,
    };
}
