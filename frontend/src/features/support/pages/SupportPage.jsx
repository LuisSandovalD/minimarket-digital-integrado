import ChatFlotante from "../components/ChatFlotante";
import CreateTicketModal from "../components/CreateTicketModal";
import SupportHeader from "../components/SupportHeader";
import SupportSidebar from "../components/SupportSidebar";

import useSupportPage from "../hooks/useSupportPage";

export default function SupportPage() {
  const { state, actions } = useSupportPage();

  // =========================
  // LOADING GLOBAL SAFE ENTRY
  // =========================
  if (state.loadingTickets && !state.selectedTicket) {
    return <>cargando</>;
  }

  return (
    <div className="relative flex min-h-[86dvh] flex-col gap-6 font-sans text-slate-100">
      {/* =========================
       * 1. HEADER
       * ========================= */}
      <SupportHeader
        search={state.search}
        onSearchChange={actions.setSearch}
        stats={state.stats}
        onCreate={() => actions.setShowCreateModal(true)}
      />

      {/* =========================
       * 2. SIDEBAR / MAIN
       * ========================= */}
      <div className="flex w-full flex-1 flex-col">
        <SupportSidebar
          tickets={state.tickets}
          filteredTickets={state.filteredTickets}
          loading={state.loadingTickets}
          selectedTicket={state.selectedTicket}
          onSelectTicket={actions.setSelectedTicket}
          search={state.search}
          filters={state.filters}
          onFiltersChange={actions.setFilters}
        />
      </div>

      {/* =========================
       * 3. FLOAT CHAT
       * ========================= */}
      <ChatFlotante
        ticketId={state.selectedTicket?.id}
        selectedTicket={state.selectedTicket}
        currentUserId={state.currentUserId}
      />

      {/* =========================
       * 4. MODAL CREATE TICKET
       * ========================= */}
      {state.showCreateModal && (
        <CreateTicketModal
          open={state.showCreateModal}
          loading={state.isCreateLoading}
          onCreate={actions.handleCreateTicket}
          onCancel={() => actions.setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
