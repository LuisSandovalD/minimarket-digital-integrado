export const validateLogin = (
  values
) => {

  const errors = {};

  // EMAIL

  if (!values.email) {

    errors.email =
      "El correo es obligatorio";

  }

  // PASSWORD

  if (!values.password) {

    errors.password =
      "La contraseña es obligatoria";

  }

  return errors;

};