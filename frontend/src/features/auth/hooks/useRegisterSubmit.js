import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerService } from "../services/register.services";
import { loginSuccess } from "../store/authActions";

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

        phone: form.phone,

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

          code: form.branchCode,

          address: form.branchAddress,

          phone: form.branchPhone,

          city: form.branchCity,

          state: form.branchState,

          country: form.branchCountry,
        };
      }

      const response = await registerService(payload);

      dispatch(loginSuccess(response.user));

      resetForm();

      onClose?.();

      navigate(`/${response.company.slug}/dashboard`);

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
