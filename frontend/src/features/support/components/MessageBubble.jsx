export default function MessageBubble({ message, isMine }) {
  // Formateador de hora limpio (HH:MM)
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const userName = message.user?.name || "Usuario";

  return (
    <div className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[75%] 
          rounded-2xl 
          px-4 
          py-2.5 
          shadow-lg 
          backdrop-blur-md 
          transition-all 
          duration-200
          hover:shadow-xl
          
          ${
            isMine
              ? "bg-blue-600/20 border-blue-500/30 text-blue-100 rounded-tr-none"
              : "bg-slate-900/40 border-slate-800/60 text-slate-100 rounded-tl-none"
          }
        `}
      >
        {/* METADATOS SUPERIORES: Nombre de usuario */}
        <div
          className={`
            mb-1 
            text-[11px] 
            font-bold 
            tracking-wide 
            uppercase
            ${isMine ? "text-blue-400" : "text-slate-400"}
          `}
        >
          {isMine ? "Tú" : userName}
        </div>

        {/* CUERPO DEL MENSAJE */}
        <p className="break-words text-sm leading-relaxed whitespace-pre-wrap">
          {message.message}
        </p>

        {/* METADATOS INFERIORES: Hora de envío */}
        <div
          className={`
            mt-1.5 
            text-[10px] 
            font-medium 
            text-right 
            select-none
            ${isMine ? "text-blue-300/60" : "text-slate-500"}
          `}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
