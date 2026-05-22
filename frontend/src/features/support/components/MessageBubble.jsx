export default function MessageBubble({ message, isMine }) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isMine ? "bg-blue-600" : "bg-[#1e293b]"
        }`}
      >
        {/* USER */}

        <div className="mb-1 text-xs font-semibold text-gray-300">
          {message.user?.name || "Usuario"}
        </div>

        {/* MESSAGE */}

        <p className="break-words text-sm">{message.message}</p>

        {/* TIME */}

        <div className="mt-2 text-right text-xs opacity-60">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
