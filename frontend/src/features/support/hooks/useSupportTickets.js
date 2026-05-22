import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getTickets } from "../services/support.service";

export default function useSupportTickets() {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["support-tickets"],

    queryFn: getTickets,

    staleTime: 1000 * 30,

    refetchOnWindowFocus: false,

    refetchInterval: 1000 * 10,
  });

  const refreshTickets = () => {
    queryClient.invalidateQueries({
      queryKey: ["support-tickets"],
    });
  };

  return {
    tickets: data,

    loading: isLoading,

    error,

    refetch,

    refreshTickets,
  };
}
