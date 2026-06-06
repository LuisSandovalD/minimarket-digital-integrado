import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getTicketMessages } from "../services/support.service";

export default function useTicketMessages(ticketId) {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ticket-messages", ticketId],
    queryFn: () => getTicketMessages(ticketId),
    enabled: !!ticketId,
    // Reducimos staleTime a 0 para que siempre considere que requiere datos frescos al consultar
    staleTime: 0,
    // Mantiene tu consulta al backend en segundo plano de manera limpia cada 3 segundos
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
  });

  const refreshMessages = () => {
    queryClient.invalidateQueries({
      queryKey: ["ticket-messages", ticketId],
    });
  };

  return {
    messages: data,
    loading: isLoading,
    error,
    refreshMessages,
  };
}
