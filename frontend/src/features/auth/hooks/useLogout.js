import { useDispatch } from "react-redux";
import { logoutService } from "../services/auth.service";
import { logout as logoutAction } from "../store/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();

  return async () => {
    try {
      // Intentamos avisar al backend (opcional por si no hay red)
      await logoutService();
    } catch (error) {
      console.warn(
        "Aviso de logout no alcanzado en servidor, limpiando localmente...",
      );
    } finally {
      // El slice se encarga de limpiar Redux y session.service borra LocalStorage
      dispatch(logoutAction());
    }
  };
}
