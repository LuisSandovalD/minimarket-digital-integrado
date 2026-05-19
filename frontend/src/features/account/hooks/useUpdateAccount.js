// ========================================
// features/account/hooks/useUpdateAccount.js
// ========================================

import useAccountStore
  from "../store/account.store";

export default function useUpdateAccount() {

  const updateAccount =
    useAccountStore(
      (state) => state.updateAccount
    );

  return {

    updateAccount,

  };

}