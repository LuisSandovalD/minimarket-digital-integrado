// ========================================
// features/account/hooks/useChangePassword.js
// ========================================

import useAccountStore
  from "../store/account.store";

export default function useChangePassword() {

  const updatePassword =
    useAccountStore(
      (state) => state.updatePassword
    );

  const passwordLoading =
    useAccountStore(
      (state) => state.passwordLoading
    );

  return {

    updatePassword,

    passwordLoading,

  };

}