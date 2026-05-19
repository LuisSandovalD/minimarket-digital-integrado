import { useMutation } from "@tanstack/react-query";
import * as accountService from "../services/account.service";

export default function useDeleteAccount() {
  const deleteAccountMutation = useMutation({
    mutationFn: (data) => accountService.deleteMyAccount(data),
    onError: (error) => {
      console.error("Delete account error:", error);
    },
  });

  const removeAccount = async (data) => {
    await deleteAccountMutation.mutateAsync(data);
  };

  return {
    removeAccount,
    isLoading: deleteAccountMutation.isPending,
    error: deleteAccountMutation.error,
  };
}