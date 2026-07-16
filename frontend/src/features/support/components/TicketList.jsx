import TicketItem from "./TicketItem";

export default function TicketList({ tickets = [], selectedTicket, onSelectTicket }) {
  // ========================================
  // EMPTY STATE (Elegante y limpio)
  // ========================================
  if (tickets.length === 0) {
    return (
      <div className="p-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        No se encontraron tickets
      </div>
    );
  }

  // ========================================
  // LIST (Renderizado inmediato con scroll premium)
  // ========================================
  return (
    <div
      className="
        flex-1 
        overflow-y-auto 
        divide-y divide-slate-100 dark:divide-slate-900/50
        
        /* Personalización de la barra de scroll (Scrollbar elegante) */
        scrollbar-thin 
        scrollbar-thumb-slate-800/60 
        scrollbar-track-transparent 
        hover:scrollbar-thumb-slate-700
        
        /* Reglas para motores Webkit (Chrome/Safari/Edge) */
        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-slate-800/40
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-700/60
      "
    >
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
