import { useState } from "react";

import {
  validateRegisterStep,
} from "../validations/register.schema";

export default function useRegisterForm() {

  // ======================================
  // STATES
  // ======================================

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // ======================================
  // FORM
  // ======================================

  const [form, setForm] =
    useState({

      // USER
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
      phone: "",

      // COMPANY
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
      companyRuc: "",
      plan: "FREE",

      // BRANCH
      branchName: "",
      branchCode: "",
      branchAddress: "",
      branchPhone: "",
      branchCity: "",
      branchState: "",
      branchCountry: "",

    });

  // ======================================
  // HANDLE CHANGE
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

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  };

  // ======================================
  // NEXT STEP
  // ======================================

  const nextStep = () => {

    setError(null);

    const validationError =
      validateRegisterStep(
        step,
        form
      );

    if (validationError) {

      setError(validationError);

      return;

    }

    setStep((prev) =>
      Math.min(prev + 1, 3)
    );

  };

  // ======================================
  // PREV STEP
  // ======================================

  const prevStep = () => {

    setError(null);

    setStep((prev) =>
      Math.max(prev - 1, 1)
    );

  };

  // ======================================
  // RESET
  // ======================================

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

  // ======================================
  // EXPORTS
  // ======================================

  return {

    step,
    setStep,

    form,
    setForm,

    loading,
    setLoading,

    error,
    setError,

    handleChange,

    nextStep,
    prevStep,

    resetForm,

  };

}