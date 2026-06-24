// ========================================
// hooks/useRegisterSubmit.js
// ========================================

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerService } from "../services/auth.service";
import { loginSuccess } from "../store/authSlice";
import { saveSession } from "../utils/authStorage";

export default function useRegisterSubmit({
  form,
  setLoading,
  setError,
  resetForm,
  onClose,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event?.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone || null,
        plan: form.plan,

        company: {
          name: form.companyName,
          email: form.companyEmail || null,
          phone: form.companyPhone || null,
          address: form.companyAddress || null,
          ruc: form.companyRuc || null,
        },
      };

      if (form.branchName?.trim()) {
        payload.branch = {
          name: form.branchName,
          code: form.branchCode || null,
          address: form.branchAddress || null,
          phone: form.branchPhone || null,
          city: form.branchCity || null,
          state: form.branchState || null,
          country: form.branchCountry || null,
        };
      }

      const response = await registerService(payload);

      saveSession({
        accessToken: response.accessToken,

        refreshToken: response.refreshToken,

        user: response.user,
      });

      dispatch(loginSuccess(response.user));

      resetForm();

      onClose?.();

      navigate(`/${response.user.company.slug}/dashboard`);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Error al registrarse";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
  };
}
