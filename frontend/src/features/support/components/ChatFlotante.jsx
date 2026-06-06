import { Circle, MessageSquare, Minus, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import useSupportMutations from "../hooks/useSupportMutations";
import useTicketMessages from "../hooks/useTicketMessages";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

export default function ChatFlotante({ ticketId, selectedTicket }) {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, loading } = useTicketMessages(ticketId);
  const { sendMessageMutation } = useSupportMutations();

  // 🔥 EFECTO AUTOMÁTICO: Abre el chat flotante inmediatamente al seleccionar cualquier ticket
  useEffect(() => {
    if (ticketId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [ticketId]);

  // Formatear el identificador visual del ticket
  const getTicketVisualId = () => {
    if (!ticketId) return "";
    return `#${String(ticketId).slice(-4).toUpperCase()}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans pointer-events-none">
      {/* ========================================
       * 1. VENTANA DEL CHAT PRINCIPAL
       * ====================================== */}
      {isOpen && ticketId && (
        <div className="pointer-events-auto mb-4 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl transition-all duration-200 ease-in-out md:w-[420px] animate-in slide-in-from-bottom-4 duration-300">
          {/* 🛡️ CHAT HEADER COMPLETO (Estilo ChatArea Premium) */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3.5">
            <div className="flex items-center gap-3">
              {/* Avatar e indicadores de estado */}
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <ShieldCheck size={20} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>

              {/* Textos del Ticket */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-blue-400">
                    {getTicketVisualId()}
                  </span>
                  <h3 className="truncate text-sm font-semibold text-slate-200">
                    {selectedTicket?.title || "Soporte Técnico"}
                  </h3>
                </div>
                <p className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Circle
                    size={6}
                    className="fill-emerald-500 text-emerald-500 animate-pulse"
                  />
                  Agente asignado en línea
                </p>
              </div>
            </div>

            {/* Botones de Control de la ventana */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                title="Minimizar chat"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
              >
                <Minus size={16} />
              </button>
            </div>
          </div>

          {/* 💬 CUERPO DE MENSAJES */}
          <div className="flex-1 overflow-y-auto bg-slate-950/50 p-4">
            {loading ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-slate-500">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500" />
                Sincronizando mensajes...
              </div>
            ) : (
              <ChatMessages messages={messages} />
            )}
          </div>

          {/* ⌨️ INPUT DE TEXTO INFERIOR */}
          <div className="border-t border-slate-800/60 bg-slate-900 p-3">
            <MessageInput
              sending={sendMessageMutation.isPending}
              onSend={(payload) => {
                sendMessageMutation.mutate({
                  ticketId: ticketId,
                  data: {
                    message: payload.text,
                    messageType: "TEXT",
                  },
                });
              }}
            />
          </div>
        </div>
      )}

      {/* ========================================
       * 2. BOTÓN DE LA BURBUJA FLOTANTE
       * ====================================== */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? "bg-slate-800 hover:bg-slate-700 border border-slate-700"
            : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/10"
        }`}
      >
        {isOpen ? (
          <X size={24} className="animate-in fade-in zoom-in-75 duration-150" />
        ) : (
          <div className="relative">
            <MessageSquare size={24} />
            {ticketId && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3 rounded-full bg-amber-500 ring-2 ring-slate-950 animate-pulse" />
            )}
          </div>
        )}
      </button>
    </div>
  );
}
