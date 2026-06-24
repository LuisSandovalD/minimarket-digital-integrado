import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginService } from "../services/auth.service";
import { saveSession } from "../services/session.service";
import { loginSuccess } from "../store/authSlice";

export default function useLoginForm(onClose) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [pendingUserId, setPendingUserId] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const completeLogin = (response) => {
    saveSession({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });

    dispatch(loginSuccess(response.user));

    onClose?.();

    navigate(`/${response.user.company.slug}/dashboard`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginService({
        email: form.email,
        password: form.password,
      });

      if (response.requires2FA) {
        setPendingUserId(response.userId);
        setShowTwoFactor(true);
        return;
      }

      completeLogin(response);
    } catch (err) {
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,

    showTwoFactor,
    setShowTwoFactor,

    pendingUserId,
    email: form.email, // 🚀 RETORNO CLAVE: Pasamos el email del formulario hacia la vista del Login

    completeLogin,

    handleChange,
    handleSubmit,
  };
}
