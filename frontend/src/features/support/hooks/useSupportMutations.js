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
  // SEND MESSAGE (Optimistic UI - Instantáneo)
  // ========================================
  // ========================================
  // SEND MESSAGE (Optimizado y Blindado contra 400)
  // ========================================
  const sendMessageMutation = useMutation({
    mutationFn: ({ ticketId, data }) => {
      // 1. Extraemos de forma ultra segura el texto plano
      let messageText = "";

      if (typeof data === "string") {
        messageText = data;
      } else if (data && typeof data === "object") {
        // Si viene como { message: ... } o { text: ... } o { message: { text: ... } }
        messageText = data.message?.text || data.message || data.text || "";
      }

      // 2. Construimos el cuerpo exacto con lo que tu backend espera
      const payloadBody = {
        message: String(messageText).trim(),
        messageType: data?.messageType || "TEXT",
      };

      console.log("✈️ Enviando al backend real:", { ticketId, payloadBody }); // Para depurar en consola

      return sendTicketMessage(ticketId, payloadBody);
    },

    onMutate: async ({ ticketId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["ticket-messages", ticketId],
      });
      const previousMessages = queryClient.getQueryData([
        "ticket-messages",
        ticketId,
      ]);

      // Normalizamos el texto también para la burbuja local instantánea
      let localText = "";
      if (typeof data === "string") localText = data;
      else if (data)
        localText = data.message?.text || data.message || data.text || "";

      queryClient.setQueryData(
        ["ticket-messages", ticketId],
        (oldMessages = []) => [
          ...oldMessages,
          {
            id: `temp-${Date.now()}`,
            message: String(localText).trim(), // Texto limpio para <p> en MessageBubble
            createdAt: new Date().toISOString(),
            user: { name: "Tú" },
            isMine: true,
            sending: true,
          },
        ],
      );

      return { previousMessages };
    },

    onError: (err, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["ticket-messages", variables.ticketId],
          context.previousMessages,
        );
      }
    },

    onSettled: (data, error, variables) => {
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
