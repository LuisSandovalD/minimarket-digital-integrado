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

    staleTime: 1000 * 5,

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
