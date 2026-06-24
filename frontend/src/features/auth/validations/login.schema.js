// ========================================
// validators/login.validator.js
// ========================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = (values) => {
  const errors = {};

  const email = values.email?.trim() || "";
  const password = values.password?.trim() || "";

  /* ======================================
   * EMAIL
   * ==================================== */
  if (!email) {
    errors.email = "El correo electrónico es obligatorio";
  } else if (!emailRegex.test(email)) {
    errors.email = "Ingrese un correo electrónico válido";
  } else if (email.length > 255) {
    errors.email = "El correo electrónico excede el tamaño permitido";
  }

  /* ======================================
   * PASSWORD
   * ==================================== */
  if (!password) {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  } else if (password.length > 100) {
    errors.password = "La contraseña excede el tamaño permitido";
  }

  return errors;
};

export const isLoginValid = (values) => {
  return Object.keys(validateLogin(values)).length === 0;
};
