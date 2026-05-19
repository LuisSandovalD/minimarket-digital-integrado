// ======================================
// EMAIL REGEX
// ======================================

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ======================================
// STEP VALIDATION
// ======================================

export const validateRegisterStep = (
  step,
  form
) => {

  // ======================================
  // STEP 1
  // ======================================

  if (step === 1) {

    if (!form.name.trim()) {

      return "El nombre es obligatorio.";

    }

    if (!form.email.trim()) {

      return "El correo es obligatorio.";

    }

    if (
      !emailRegex.test(
        form.email
      )
    ) {

      return "Correo inválido.";

    }

    if (!form.password) {

      return "La contraseña es obligatoria.";

    }

    if (
      form.password.length < 6
    ) {

      return "La contraseña debe tener mínimo 6 caracteres.";

    }

  }

  // ======================================
  // STEP 2
  // ======================================

  if (step === 2) {

    if (
      !form.companyName.trim()
    ) {

      return "El nombre de la empresa es obligatorio.";

    }

  }

  // ======================================
  // STEP 3
  // ======================================

  if (step === 3) {

    if (
      form.branchEmail &&
      !emailRegex.test(
        form.branchEmail
      )
    ) {

      return "Correo de sucursal inválido.";

    }

  }

  return null;

};