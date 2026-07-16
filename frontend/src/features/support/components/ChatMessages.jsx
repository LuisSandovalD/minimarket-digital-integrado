import { MessageSquarePlus } from "lucide-react";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages = [], currentUserId }) {
  const messagesEndRef = useRef(null);

  // Scroll automático suave al recibir nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ========================================
  // EMPTY STATE
  // ========================================
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="max-w-[280px] rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 text-center backdrop-blur-md sm:max-w-xs">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <MessageSquarePlus size={18} />
          </div>

          <p className="text-xs font-semibold text-slate-200">Inicia la conversación</p>

          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
            Envía un mensaje abajo para comenzar el seguimiento en tiempo real de este ticket.
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // MESSAGES LIST
  // ========================================
  return (
    <div className="w-full space-y-3 py-2">
      {messages.map((msg) => (
        <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-200">
          <MessageBubble message={msg} isMine={String(msg.userId) === String(currentUserId)} />
        </div>
      ))}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
}
