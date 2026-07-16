exports.updateProfileValidation = (data) => {
  if (!data.name) throw new Error("El nombre es obligatorio");
  if (!data.email) throw new Error("El correo es obligatorio");
};

exports.changePasswordValidation = (data) => {
  if (!data.currentPassword) throw new Error("La contraseña actual es obligatoria");
  if (!data.newPassword) throw new Error("La nueva contraseña es obligatoria");
  if (!data.confirmPassword) throw new Error("Debes confirmar la nueva contraseña");
  if (data.newPassword !== data.confirmPassword) throw new Error("Las contraseñas no coinciden");
  if (data.newPassword.length < 6) throw new Error("La nueva contraseña debe tener al menos 6 caracteres");
};

exports.twoFactorValidation = (data) => {
  if (!data || typeof data.enabled !== "boolean") {
    throw new Error("Estado de 2FA inválido");
  }
};

exports.deleteAccountValidation = (data) => {
  if (!data.password) throw new Error("La contraseña es obligatoria");
};
