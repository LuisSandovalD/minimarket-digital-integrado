export default function TicketItem({ ticket, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full gap-3 border-b border-white/5 p-4 text-left transition hover:bg-white/5 ${
        active ? "bg-white/10" : ""
      }`}
    >
      {/* AVATAR */}

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
        {ticket.title?.charAt(0)?.toUpperCase()}
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-semibold">{ticket.title}</h3>

          <span className="shrink-0 text-xs text-gray-400">
            {new Date(ticket.updatedAt).toLocaleTimeString()}
          </span>
        </div>

        <p className="truncate text-sm text-gray-400">{ticket.description}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
            {ticket.priority}
          </span>

          <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
            {ticket.status}
          </span>
        </div>
      </div>
    </button>
  );
}
