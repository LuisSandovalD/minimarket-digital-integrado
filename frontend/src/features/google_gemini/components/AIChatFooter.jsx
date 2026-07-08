import { Send } from "lucide-react";

export default function AIChatFooter({ message, setMessage, loading, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 shrink-0 bg-background/95 backdrop-blur-md">
      <div className="flex gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Pregúntame cualquier cosa sobre tu negocio..."
          className="flex-1 resize-none rounded-xl border border-neutral-200 dark:border-neutral-800 p-3 outline-none bg-background text-foreground placeholder:text-muted-foreground focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
        />

        <button
          onClick={() => onSend()}
          disabled={loading || !message.trim()}
          className="px-5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-muted/50 dark:bg-muted/20 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
