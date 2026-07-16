// ========================================
// features/support/components/TicketItem.jsx
// ========================================

import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

// ========================================
// COMPONENT
// ========================================

export default function TicketItem({ ticket, active, onClick }) {
  // ========================================
  // STATUS CONFIG
  // ========================================

  const statusConfig = {
    OPEN: {
      icon: AlertCircle,
      label: "Abierto",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    IN_PROGRESS: {
      icon: Clock3,
      label: "En progreso",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    RESOLVED: {
      icon: CheckCircle2,
      label: "Resuelto",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  };

  const status = statusConfig[ticket.status] || statusConfig.OPEN;
  const StatusIcon = status.icon;

  // ========================================
  // HELPERS
  // ========================================

  const getTicketId = () => {
    if (!ticket.id) return "ID";
    const idStr = String(ticket.id);
    return `#${idStr.slice(-4).toUpperCase()}`;
  };

  const getFormattedDate = () => {
    if (!ticket.createdAt) return "";
    try {
      return new Date(ticket.createdAt).toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <button
      onClick={onClick}
      className={`
        w-full

        flex
        flex-col
        gap-2

        rounded-lg

        border

        px-3
        py-3

        text-left

        transition
        duration-200

        ${
          active
            ? `
              border-blue-500/50
              bg-blue-500/10
              shadow-[0_0_12px_rgba(59,130,246,0.1)]
            `
            : `
              border-white/10
              bg-white/[0.02]
              hover:border-white/20
              hover:bg-white/[0.05]
            `
        }
      `}
    >
      {/* TITLE & STATUS */}

      <div className="flex items-start justify-between gap-2">
        <h3
          className={`
            flex-1

            text-sm
            font-medium
            leading-snug

            ${active ? "text-slate-100" : "text-slate-300"}
          `}
        >
          {ticket.title || "Sin título"}
        </h3>

        <div
          className={`
            shrink-0

            rounded

            px-2
            py-1

            ${status.bg}

            flex
            items-center
            gap-1
          `}
        >
          <StatusIcon size={12} className={status.color} />
          <span className={`text-[10px] font-medium ${status.color}`}>{status.label}</span>
        </div>
      </div>

      {/* DESCRIPTION */}

      {ticket.description && (
        <p
          className={`
            line-clamp-2

            text-xs
            leading-relaxed

            ${active ? "text-slate-400" : "text-slate-500"}
          `}
        >
          {ticket.description}
        </p>
      )}

      {/* FOOTER - METADATA */}

      <div className="flex items-center justify-between gap-2 pt-1">
        <span
          className={`
            text-[10px]
            font-medium
            uppercase
            tracking-wider

            ${active ? "text-slate-400" : "text-slate-600"}
          `}
        >
          {getTicketId()}
        </span>

        <span className="text-[10px] text-slate-500">{getFormattedDate()}</span>
      </div>
    </button>
  );
}
