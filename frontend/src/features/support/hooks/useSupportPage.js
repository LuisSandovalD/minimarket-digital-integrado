import { useCallback, useMemo, useState } from "react";
import useSupportMutations from "./useSupportMutations";
import useSupportTickets from "./useSupportTickets";
import useTicketMessages from "./useTicketMessages";

export default function useSupportPage() {
  // --- Usuario y Permisos ---
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const currentUserId = user?.id;
  const currentUserRole = user?.role;
  const isSupport = ["ADMIN", "MANAGER", "SUPPORT"].includes(currentUserRole);

  // --- Estado Local ---
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "ALL",
    priority: "ALL",
    dateRange: "ALL",
  });

  // --- Queries ---
  const { tickets = [], loading: loadingTickets } = useSupportTickets();
  const { messages, loading: loadingMessages } = useTicketMessages(
    selectedTicket?.id,
  );

  // --- Mutations ---
  const { sendMessageMutation, updateStatusMutation, createTicketMutation } =
    useSupportMutations();

  // --- Lógica de Filtrado ---
  const filteredTickets = useMemo(() => {
    if (!tickets) return [];
    return tickets.filter((ticket) => {
      const matchesSearch = ticket.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      if (!matchesSearch) return false;
      if (filters.status !== "ALL" && ticket.status !== filters.status)
        return false;
      if (filters.priority !== "ALL" && ticket.priority !== filters.priority)
        return false;
      return true;
    });
  }, [tickets, search, filters]);

  // --- Estadísticas ---
  const stats = useMemo(() => {
    const total = tickets?.length || 0;
    const pending =
      tickets?.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS")
        .length || 0;
    const resolved =
      tickets?.filter((t) => t.status === "RESOLVED").length || 0;
    return { total, pending, resolved };
  }, [tickets]);

  // --- Handlers ---
  const handleCreateTicket = useCallback(
    (data) => {
      createTicketMutation.mutate(data, {
        onSuccess: () => setShowCreateModal(false),
      });
    },
    [createTicketMutation],
  );

  const handleStatusChange = useCallback(
    (status) => {
      if (selectedTicket) {
        updateStatusMutation.mutate({ ticketId: selectedTicket.id, status });
      }
    },
    [selectedTicket, updateStatusMutation],
  );

  const handleSendMessage = useCallback(
    (message) => {
      if (selectedTicket) {
        sendMessageMutation.mutate({
          ticketId: selectedTicket.id,
          data: {
            message: message.text,
            attachments: message.attachments || [],
            messageType: "TEXT",
          },
        });
      }
    },
    [selectedTicket, sendMessageMutation],
  );

  const handleSelectTicketMobile = useCallback((ticket) => {
    setSelectedTicket(ticket);
    setIsMobileChatOpen(true);
  }, []);

  // Retornamos de manera limpia sólo lo que la interfaz necesita pintar
  return {
    state: {
      selectedTicket,
      search,
      showCreateModal,
      isMobileChatOpen,
      filters,
      filteredTickets,
      tickets,
      messages,
      stats,
      currentUserId,
      isSupport,
      loadingTickets,
      loadingMessages,
      isMessageSending: sendMessageMutation.isPending,
      isStatusUpdating: updateStatusMutation.isPending,
      isCreateLoading: createTicketMutation.isPending,
    },
    actions: {
      setSelectedTicket,
      setSearch,
      setShowCreateModal,
      setIsMobileChatOpen,
      setFilters,
      handleCreateTicket,
      handleStatusChange,
      handleSendMessage,
      handleSelectTicketMobile,
    },
  };
}
