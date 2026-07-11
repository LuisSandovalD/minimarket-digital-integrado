import { updateUser } from "@/features/auth/store/authSlice"; // 2. Importamos la acción de tu slice de Redux

import { useDispatch } from "react-redux"; // 1. Importamos dispatch de Redux
import useAccountStore from "../store/account.store";

export default function useTwoFactor() {
  const dispatch = useDispatch(); // 3. Inicializamos el dispatch de Redux

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

    // Paso 2: Confirmar y activar 2FA
    confirm2FA: async ({ token, password }) => {
      try {
        const result = await enableTwoFactor({ token, password });

        // 🚀 LA SOLUCIÓN: Si Zustand activa el 2FA con éxito, actualizamos Redux al instante
        if (result) {
          dispatch(
            updateUser({
              twoFactorEnabled: true, // Le avisamos a Redux que ahora está activo
            }),
          );
        }

        return result;
      } catch (err) {
        return null;
      }
    },

    // Paso 3: Apagar el segundo factor pidiendo password
    turnOff2FA: async (password) => {
      try {
        const result = await disableTwoFactor(password);

        // 🚀 LA SOLUCIÓN: Si Zustand desactiva el 2FA con éxito, actualizamos Redux al instante
        if (result) {
          dispatch(
            updateUser({
              twoFactorEnabled: false, // Le avisamos a Redux que se apagó
            }),
          );
        }

        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
