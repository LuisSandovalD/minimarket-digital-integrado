import { useDispatch }
from "react-redux";

import { logout }
from "../store/authSlice";

export default function useLogout() {

  const dispatch =
    useDispatch();

  return () => {

    dispatch(logout());

  };

}