// =========================================================================
// middleware/roleCheck.js
// =========================================================================

// Roles permitidos por el sistema (Enum inmutable para evitar inyecciones o typos)
const SYSTEM_ROLES = Object.freeze([
  "ADMIN",
  "MANAGER",
  "SUPERVISOR",
  "EMPLOYEE",
  "VIEWER",
  "SUPPORT",
]);

module.exports = (...roles) => {
  // 🛡️ CAPA 1: Validación en tiempo de compilación/arranque
  // Si tú o alguien de tu equipo comete un error de dedo en las rutas (ej. "AMDIN"),
  // el servidor se detiene inmediatamente avisándote, en lugar de dejar la ruta vulnerable.
  const invalidRoles = roles.filter(role => !SYSTEM_ROLES.includes(role));
  if (invalidRoles.length > 0) {
    throw new Error(
      `[CRITICAL SECURITY CONFIG] Se detectaron roles inválidos en las rutas: [${invalidRoles.join(", ")}]`,
    );
  }

  return (req, res, next) => {
    try {
      // 🛡️ CAPA 2: Verificar usuario autenticado
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          success: false,
          message: "Acceso denegado: Autenticación requerida.",
        });
      }

      // 🛡️ CAPA 3: Verificar rol (Ofuscación de respuestas)
      if (!roles.includes(req.user.role)) {
        // Log interno para el administrador del servidor (Auditoría)
        console.warn(`[SECURITY WARN] Usuario ${req.user.id || "Anónimo"} intentó acceder sin permisos a: ${req.originalUrl}`);

        // Mensaje genérico para no darle pistas al atacante de qué roles sí funcionan
        return res.status(403).json({
          success: false,
          message: "Acceso denegado: No tienes los permisos necesarios.",
        });
      }

      next();

    } catch (error) {
      // Log interno del error real (para ti en consola)
      console.error("[INTERNAL SECURITY ERROR]", error);

      // 🛡️ CAPA 4: Ocultar información sensible del sistema (Information Disclosure)
      // Jamás mandamos 'error.message' al cliente en un 500, ya que podría exponer
      // estructuras de carpetas o nombres internos de variables.
      return res.status(500).json({
        success: false,
        message: "Ocurrió un error interno de seguridad.",
      });
    }
  };
};
