export default function GeminiChatTab({
  messages,
  inputMessage,
  setInputMessage,
  isChatLoading,
  chatEndRef,
  onSendMessage,
  onResetChat,
}) {
  return (
    <div className="flex flex-col h-full bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-indigo-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center shadow-sm">
            M
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Mateo</h3>
            <p className="text-xs text-indigo-600 font-medium">
              Asistente Ejecutivo en Tiempo Real
            </p>
          </div>
        </div>
        <button
          onClick={onResetChat}
          className="text-xs bg-white text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors"
        >
          🔄 Recargar Diagnóstico
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2.5 shadow-sm text-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isChatLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-400 rounded-lg rounded-tl-none px-4 py-3 text-sm flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2 justify-center">
        <button
          disabled={isChatLoading}
          onClick={() =>
            onSendMessage(
              null,
              "Profundiza en la liquidación de los lotes por vencer.",
            )
          }
          className="text-xs bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-all disabled:opacity-50"
        >
          📦 Plan de Lotes Próximos a Vencer
        </button>
        <button
          disabled={isChatLoading}
          onClick={() =>
            onSendMessage(
              null,
              "Dame un plan de acción para cobrarle a los clientes con saldos críticos.",
            )
          }
          className="text-xs bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-all disabled:opacity-50"
        >
          💵 Estrategia de Cobranza Rápida
        </button>
      </div>

      <form
        onSubmit={(e) => onSendMessage(e)}
        className="p-3 border-t border-gray-200 bg-white flex gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={isChatLoading}
          placeholder="Escribe una instrucción libre aquí..."
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={isChatLoading || !inputMessage.trim()}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-300"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
