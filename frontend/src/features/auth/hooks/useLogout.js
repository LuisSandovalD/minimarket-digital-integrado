import { useDispatch } from "react-redux";

import { clearSession } from "../services/session.service";
import { logout } from "../store/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();

  return () => {
    clearSession();
    dispatch(logout());
  };
}
