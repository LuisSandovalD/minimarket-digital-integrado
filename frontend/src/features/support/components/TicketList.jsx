import { Loader2 } from "lucide-react";

import TicketItem from "./TicketItem";

export default function TicketList({
  tickets = [],
  loading = false,
  selectedTicket,
  onSelectTicket,
}) {
  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  // ========================================
  // EMPTY
  // ========================================

  if (tickets.length === 0) {
    return <div className="p-6 text-center text-gray-400">No hay tickets</div>;
  }

  // ========================================
  // LIST
  // ========================================

  return (
    <div className="flex-1 overflow-y-auto">
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          ticket={ticket}
          active={selectedTicket?.id === ticket.id}
          onClick={() => onSelectTicket(ticket)}
        />
      ))}
    </div>
  );
}
