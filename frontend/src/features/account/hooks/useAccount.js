import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as accountService from "../services/account.service";

export default function useAccount() {
  const queryClient = useQueryClient();

  // Get account profile
  const { data: user, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: accountService.getMyAccount,
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: accountService.updateMyAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });

  const updateProfile = async (data) => {
    await updateProfileMutation.mutateAsync(data);
  };

  return {
    user,
    isLoading,
    updateProfile,
    isUpdating: updateProfileMutation.isPending,
  };
}
