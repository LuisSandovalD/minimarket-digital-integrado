import { useState } from "react";

import { Loader2, Paperclip, Send } from "lucide-react";

export default function MessageInput({ onSend, sending }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    onSend(message);

    setMessage("");
  };

  return (
    <div className="border-t border-white/10 bg-[#111827] p-4">
      <div className="flex items-center gap-3 rounded-2xl bg-[#1f2937] px-4 py-3">
        <button className="text-gray-400 hover:text-white">
          <Paperclip size={20} />
        </button>

        <input
          type="text"
          value={message}
          placeholder="Escribe un mensaje..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 bg-transparent outline-none"
        />

        <button
          disabled={sending}
          onClick={handleSend}
          className="rounded-full bg-blue-600 p-3 hover:bg-blue-700"
        >
          {sending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
