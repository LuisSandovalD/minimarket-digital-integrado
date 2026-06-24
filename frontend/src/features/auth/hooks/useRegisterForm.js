import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerService } from "../services/auth.service";
import { saveSession } from "../services/session.service";
import { loginSuccess } from "../store/authSlice";
import { validateRegisterStep } from "../validations/register.schema";

export default function useRegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    phone: "",

    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    companyRuc: "",

    plan: "FREE",

    branchName: "",
    branchCode: "",
    branchAddress: "",
    branchPhone: "",
    branchCity: "",
    branchState: "",
    branchCountry: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    setError(null);

    const errors = validateRegisterStep(step, form);

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);

      return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setError(null);

    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleRegisterSubmit = async (e) => {
    e?.preventDefault();

    const errors = validateRegisterStep(step, form);

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone || null,

        plan: form.plan,

        company: {
          name: form.companyName,

          email: form.companyEmail || form.email,

          phone: form.companyPhone || null,

          address: form.companyAddress || "",

          ruc: form.companyRuc || null,
        },

        branch: {
          name: form.branchName || "Casa Matriz",

          code: form.branchCode || "MAIN",

          address: form.branchAddress || "",

          phone: form.branchPhone || null,

          city: form.branchCity || null,

          state: form.branchState || null,

          country: form.branchCountry || null,
        },
      };

      const response = await registerService(payload);

      saveSession({
        accessToken: response.accessToken,

        refreshToken: response.refreshToken,

        user: response.user,
      });

      dispatch(loginSuccess(response.user));

      navigate(`/${response.user.company.slug}/dashboard`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Ocurrió un error durante el registro.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setError(null);

    setForm({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
      phone: "",

      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
      companyRuc: "",

      plan: "FREE",

      branchName: "",
      branchCode: "",
      branchAddress: "",
      branchPhone: "",
      branchCity: "",
      branchState: "",
      branchCountry: "",
    });
  };

  return {
    step,
    setStep,
    form,
    loading,
    error,
    handleChange,
    nextStep,
    prevStep,
    resetForm,
    handleRegisterSubmit,
  };
}
