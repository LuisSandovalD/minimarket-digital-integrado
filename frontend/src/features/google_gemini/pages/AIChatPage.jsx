import { useEffect, useRef, useState } from "react";

import AIChatFooter from "../components/AIChatFooter";
import AIChatHeader from "../components/AIChatHeader";
import AIChatMessages from "../components/AIChatMessages";

import useAIChat from "../hooks/useAIChat";

export default function AIChatPage() {
  const [message, setMessage] = useState("");

  const companyId = "empresa-actual-uuid-123";
  const conversationId = "conversacion-actual-uuid-456";

  const { messages, loading, send } = useAIChat({
    conversationId,
    companyId,
  });

  const messagesEndRef = useRef(null);

  const handleSend = async (textToSend) => {
    const text = textToSend || message;

    if (!text.trim()) return;

    if (!textToSend) {
      setMessage("");
    }

    await send(text);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[87vh] bg-background">
      <AIChatHeader />

      <AIChatMessages
        messages={messages}
        loading={loading}
        onSuggestionClick={handleSend}
        messagesEndRef={messagesEndRef}
      />

      <AIChatFooter
        message={message}
        setMessage={setMessage}
        loading={loading}
        onSend={handleSend}
      />
    </div>
  );
}
