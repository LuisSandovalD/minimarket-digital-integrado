import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { loginService } from "../services/auth.service";

import { loginSuccess } from "../store/authActions";

import { saveSession } from "../services/session.service";

export default function useLoginForm(onClose) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",

    password: "",

    remember: false,
  });

  // ======================================
  // CHANGE
  // ======================================

  const handleChange = (e) => {
    const {
      name,

      value,

      type,

      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================================
  // SUBMIT
  // ======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response = await loginService({
        email: form.email,

        password: form.password,
      });

      saveSession({
        token: response.token,

        user: response.user,

        company: response.company,
      });

      dispatch(loginSuccess(response.user));

      onClose?.();

      navigate(`/${response.company.slug}/dashboard`);
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,

    loading,

    error,

    handleChange,

    handleSubmit,
  };
}
