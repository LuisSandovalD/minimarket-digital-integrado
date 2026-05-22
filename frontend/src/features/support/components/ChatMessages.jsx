import { Loader2 } from "lucide-react";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages, loading, currentUserId }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMine={msg.userId === currentUserId}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
