// ========================================
// hooks/useTwoFactor.js
// ========================================
import useAccountStore from "../store/account.store";

export default function useTwoFactor() {
  const user = useAccountStore((state) => state.user);
  const twoFactorLoading = useAccountStore((state) => state.twoFactorLoading);
  const serverError = useAccountStore((state) => state.error);

  const setupTwoFactor = useAccountStore((state) => state.setupTwoFactor);
  const enableTwoFactor = useAccountStore((state) => state.enableTwoFactor);
  const disableTwoFactor = useAccountStore((state) => state.disableTwoFactor);

  return {
    user,
    twoFactorLoading,
    serverError,
    enabled: user?.twoFactorEnabled ?? false,

    // Paso 1: Disparar inicialización y retornar { qrCode, secret } a la vista
    init2FA: async () => {
      try {
        return await setupTwoFactor();
      } catch (err) {
        return null;
      }
    },

    // Paso 2: SOLUCIÓN AL BUG - Ahora recibe el objeto { token, password } desde el Modal
    confirm2FA: async ({ token, password }) => {
      try {
        // Le pasamos el objeto estructurado a Zustand para que viaje al servidor
        return await enableTwoFactor({ token, password });
      } catch (err) {
        return null;
      }
    },

    // Paso 3: Apagar el segundo factor pidiendo password
    turnOff2FA: async (password) => {
      try {
        await disableTwoFactor(password);
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
