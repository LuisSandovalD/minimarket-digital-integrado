// ========================================
// features/account/validations/account.validation.js
// ========================================

export function validateProfile(
  data
) {

  const errors = {};

  if (!data.name) {

    errors.name =
      "El nombre es obligatorio";

  }

  if (!data.email) {

    errors.email =
      "El correo es obligatorio";

  }

  return errors;

}

/* ======================================
 * PASSWORD VALIDATION
 * ==================================== */

export function validatePassword(
  data
) {

  const errors = {};

  if (!data.currentPassword) {

    errors.currentPassword =
      "Ingresa tu contraseña actual";

  }

  if (!data.newPassword) {

    errors.newPassword =
      "Ingresa una nueva contraseña";

  }

  if (
    data.newPassword?.length < 8
  ) {

    errors.newPassword =
      "La contraseña debe tener mínimo 8 caracteres";

  }

  if (
    data.newPassword !==
    data.confirmPassword
  ) {

    errors.confirmPassword =
      "Las contraseñas no coinciden";

  }

  return errors;

}