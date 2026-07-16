// ========================================
// validators/register.validator.js
// ========================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegisterStep = (step, form) => {
  const errors = {};

  /* ======================================
   * STEP 1: ADMIN USER
   * ==================================== */
  if (step === 1) {
    if (!form.name?.trim()) {
      errors.name = "El nombre es obligatorio";
    }

    if (!form.email?.trim()) {
      errors.email = "El correo es obligatorio";
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Correo electrónico inválido";
    }

    if (!form.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener un mínimo de 8 caracteres";
    }

    if (form.confirmPassword !== undefined && form.password !== form.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  }

  /* ======================================
   * STEP 2: COMPANY
   * ==================================== */
  if (step === 2) {
    const companyName = form.company?.name || form.companyName || "";

    if (!companyName.trim()) {
      errors.companyName = "El nombre de la empresa es obligatorio";
    }

    const companyEmail = form.company?.email || form.companyEmail;

    if (companyEmail && !emailRegex.test(companyEmail)) {
      errors.companyEmail = "Correo de empresa inválido";
    }
  }

  /* ======================================
   * STEP 3: BRANCH
   * ==================================== */
  if (step === 3) {
    const branchEmail = form.branch?.email || form.branchEmail;

    if (branchEmail && !emailRegex.test(branchEmail)) {
      errors.branchEmail = "Correo de sucursal inválido";
    }
  }

  return errors;
};

export const isRegisterStepValid = (step, form) => {
  return Object.keys(validateRegisterStep(step, form)).length === 0;
};
