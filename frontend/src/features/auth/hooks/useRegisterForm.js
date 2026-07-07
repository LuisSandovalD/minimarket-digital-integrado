// ========================================
// hooks/useRegisterForm.js (COMPLETO)
// ========================================

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerService } from "../services/auth.service";
import { saveSession } from "../services/session.service";
import { loginSuccess } from "../store/authSlice";
import { validateRegisterStep } from "../validations/register.schema";

export default function useRegisterForm(onClose = null) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    // ======================================
    // USUARIO
    // ======================================
    name: "",
    slug: "",
    email: "",
    password: "",
    role: "ADMIN",
    phone: "",

    // ======================================
    // EMPRESA
    // ======================================
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    companyRuc: "",
    companyWebsite: "",

    // ======================================
    // SUSCRIPCIÓN
    // ======================================
    subscriptionTier: "FREE",

    // ======================================
    // SUCURSAL
    // ======================================
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
        // ======================================
        // USUARIO
        // ======================================
        name: form.name,
        email: form.email?.trim().toLowerCase(),
        password: form.password,
        role: form.role,
        phone: form.phone || null,

        // ======================================
        // PLAN / SUSCRIPCIÓN
        // ======================================
        subscriptionTier: form.subscriptionTier,

        // ======================================
        // EMPRESA
        // ======================================
        company: {
          name: form.companyName,
          email: form.companyEmail || form.email,
          phone: form.companyPhone || form.phone || null,
          address: form.companyAddress || "",
          ruc: form.companyRuc || null,
          website: form.companyWebsite || null,
        },

        // ======================================
        // SUCURSAL
        // ======================================
        branch: {
          name: form.branchName?.trim() || "Casa Matriz",
          code: form.branchCode?.trim() || "MAIN",
          address: form.branchAddress?.trim() || form.companyAddress || "",
          phone: form.branchPhone || form.phone || null,
          city: form.branchCity || null,
          state: form.branchState || null,
          country: form.branchCountry || "Perú",
        },
      };

      const response = await registerService(payload);

      // =================================================================
      // 🌟 AUTO-LOGIN PARA TODOS LOS PLANES (FREE, BASIC, PREMIUM)
      // =================================================================

      // Verificamos si el token existe directamente o dentro de un nodo data/result
      const accessToken = response.accessToken || response.data?.accessToken;
      const refreshToken = response.refreshToken || response.data?.refreshToken;
      const userData = response.user || response.data?.user;

      if (accessToken) {
        saveSession({
          accessToken,
          refreshToken,
          user: userData,
        });

        dispatch(loginSuccess(userData));
        resetForm();
        onClose?.();

        // Obtenemos el slug de la empresa desde la respuesta estructurada de la base de datos
        const companySlug = userData?.company?.slug || "dashboard";
        navigate(`/${companySlug}/dashboard`);
      } else {
        // Si el backend guardó con éxito pero no devolvió tokens de sesión inmediata
        resetForm();
        onClose?.();
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Ocurrió un error inesperado durante el registro.",
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
      slug: "",
      email: "",
      password: "",
      role: "ADMIN",
      phone: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
      companyRuc: "",
      companyWebsite: "",
      subscriptionTier: "FREE",
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
