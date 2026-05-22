import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTicket,
  sendTicketMessage,
  updateTicketStatus,
} from "../services/support.service";

export default function useSupportMutations() {
  const queryClient = useQueryClient();

  // ========================================
  // CREATE TICKET
  // ========================================

  const createTicketMutation = useMutation({
    mutationFn: createTicket,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["support-tickets"],
      });
    },
  });

  // ========================================
  // SEND MESSAGE
  // ========================================

  const sendMessageMutation = useMutation({
    mutationFn: ({ ticketId, data }) => sendTicketMessage(ticketId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ticket-messages", variables.ticketId],
      });

      queryClient.invalidateQueries({
        queryKey: ["support-tickets"],
      });
    },
  });

  // ========================================
  // UPDATE STATUS
  // ========================================

  const updateStatusMutation = useMutation({
    mutationFn: ({ ticketId, status }) => updateTicketStatus(ticketId, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["support-tickets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["ticket-messages", variables.ticketId],
      });
    },
  });

  return {
    createTicketMutation,

    sendMessageMutation,

    updateStatusMutation,
  };
}
