import { Bot, User } from "lucide-react";

export default function AIChatMessages({ messages, loading, onSuggestionClick, messagesEndRef }) {
  return (
    <div className="flex-1 overflow-y-auto py-6 space-y-6">
      {/* Contenedor de sugerencias iniciales */}
      {messages.length === 0 && (
        <div className="w-full">
          <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-background">
            <h2 className="font-semibold text-lg mb-4 text-foreground">¿Qué deseas analizar hoy?</h2>

            <div className="grid lg:grid-cols-6 grid-cols-2 gap-3">
              {[
                "¿Cómo va el negocio este mes?",
                "¿Qué productos venden más?",
                "¿Tengo productos con sobrestock?",
                "¿Quién es mi mejor vendedor?",
                "¿Qué categoría genera más ingresos?",
                "Dame un resumen ejecutivo del negocio",
              ].map((text, i) => (
                <div
                  key={i}
                  onClick={() => onSuggestionClick(text)}
                  className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 cursor-pointer bg-muted/30 dark:bg-muted/10 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Historial de Mensajes */}
      {messages.map((msg, index) => {
        const isUser = msg.role === "user";
        return (
          <div key={index} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 whitespace-pre-wrap text-sm ${isUser ? "bg-primary text-primary-foreground" : "border border-neutral-200 dark:border-neutral-800 bg-background text-foreground"}`}
            >
              {msg.content}
            </div>

            {isUser && (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <User size={18} />
              </div>
            )}
          </div>
        );
      })}

      {/* Burbuja de Carga (Loading Indicator) */}
      {loading && (
        <div className="flex gap-3 justify-start">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Bot size={18} />
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-background">
            <div className="flex gap-1 items-center h-5 text-primary">
              <span className="animate-bounce text-[10px]">●</span>
              <span className="animate-bounce text-[10px] [animation-delay:0.2s]">●</span>
              <span className="animate-bounce text-[10px] [animation-delay:0.4s]">●</span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
