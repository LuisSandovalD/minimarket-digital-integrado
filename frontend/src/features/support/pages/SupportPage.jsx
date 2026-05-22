import { useMemo, useState } from "react";

import SupportSidebar from "../components/SupportSidebar";

import ChatMessages from "../components/ChatMessages";

import ChatHeader from "../components/ChatHeader";

import MessageInput from "../components/MessageInput";

import useSupportTickets from "../hooks/useSupportTickets";

import useTicketMessages from "../hooks/useTicketMessages";

import useSupportMutations from "../hooks/useSupportMutations";

export default function SupportPage() {
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

  const [selectedTicket, setSelectedTicket] = useState(null);

  const [search, setSearch] = useState("");

  // ========================================
  // QUERIES
  // ========================================

  const { tickets, loading: loadingTickets } = useSupportTickets();

  const { messages, loading: loadingMessages } = useTicketMessages(
    selectedTicket?.id,
  );

  // ========================================
  // MUTATIONS
  // ========================================

  const { sendMessageMutation, updateStatusMutation } = useSupportMutations();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0f172a] text-white">
      <SupportSidebar
        tickets={tickets}
        loading={loadingTickets}
        selectedTicket={selectedTicket}
        onSelectTicket={setSelectedTicket}
        search={search}
        setSearch={setSearch}
      />

      <div className="flex flex-1 flex-col">
        {!selectedTicket ? (
          <div className="flex flex-1 items-center justify-center">
            Selecciona un ticket
          </div>
        ) : (
          <>
            <ChatHeader
              ticket={selectedTicket}
              isSupport={isSupport}
              onChangeStatus={(status) =>
                updateStatusMutation.mutate({
                  ticketId: selectedTicket.id,
                  status,
                })
              }
            />

            <ChatMessages
              messages={messages}
              loading={loadingMessages}
              currentUserId={currentUserId}
            />

            <MessageInput
              sending={sendMessageMutation.isPending}
              onSend={(message) =>
                sendMessageMutation.mutate({
                  ticketId: selectedTicket.id,

                  data: {
                    message,

                    messageType: "TEXT",
                  },
                })
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
