import useAccountStore from "../store/account.store";

export default function useTwoFactor() {
  const toggleTwoFactor = useAccountStore(
    (state) => state.toggleTwoFactor
  );

  const twoFactorLoading = useAccountStore(
    (state) => state.twoFactorLoading
  );

  const user = useAccountStore((state) => state.user);

  return {
    toggleTwoFactor,
    twoFactorLoading,
    enabled: user?.twoFactorEnabled ?? false,
  };
}