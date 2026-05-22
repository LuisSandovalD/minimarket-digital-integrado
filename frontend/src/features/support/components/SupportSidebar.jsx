import { Loader2, Plus, Search } from "lucide-react";

import { useMemo, useState } from "react";

import TicketItem from "./TicketItem";

import CreateTicketModal from "./CreateTicketModal";

import useSupportMutations from "../hooks/useSupportMutations";

export default function SupportSidebar({
  tickets,
  loading,
  selectedTicket,
  onSelectTicket,
  search,
  setSearch,
}) {
  const [showCreate, setShowCreate] = useState(false);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      ticket.title?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tickets, search]);

  const { createTicketMutation } = useSupportMutations();

  return (
    <div className="flex w-[360px] flex-col border-r border-white/10 bg-[#111827]">
      {/* HEADER */}

      <div className="border-b border-white/10 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Soporte</h1>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="rounded-lg bg-blue-600 p-2 transition hover:bg-blue-700"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* SEARCH */}

        <div className="mt-4 flex items-center rounded-xl bg-[#1f2937] px-3">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ticket..."
            className="w-full bg-transparent p-3 outline-none"
          />
        </div>

        {/* CREATE */}

        {showCreate && (
          <CreateTicketModal
            loading={createTicketMutation.isPending}
            onCreate={(data) => {
              createTicketMutation.mutate(data);

              setShowCreate(false);
            }}
          />
        )}
      </div>

      {/* LIST */}

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No hay tickets</div>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              active={selectedTicket?.id === ticket.id}
              onClick={() => onSelectTicket(ticket)}
            />
          ))
        )}
      </div>
    </div>
  );
}
