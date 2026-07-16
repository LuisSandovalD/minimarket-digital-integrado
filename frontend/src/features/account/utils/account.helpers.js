// ========================================
// features/account/utils/account.helpers.js
// ========================================

import { ROLE_LABELS } from "../constants/account.constants";

/* ======================================
 * ROLE LABEL
 * ==================================== */
export function getRoleLabel(role) {
  return ROLE_LABELS[role] || role;
}

/* ======================================
 * STATUS LABEL
 * ==================================== */
export function getStatusLabel(isActive) {
  return isActive ? "Activo" : "Inactivo";
}

/* ======================================
 * USER INITIALS
 * ==================================== */
export function getUserInitials(name = "") {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean) // Evita errores si hay dobles espacios transitorios
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ======================================
 * FORMAT DATE (SOLO FECHA)
 * ==================================== */
export function formatAccountDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ======================================
 * FORMAT DATE WITH TIME (REQUERIDO PARA SESIONES)
 * ==================================== */
/**
 * Convierte un timestamp en un formato amigable para auditoría de dispositivos
 * Ejemplo: "20 de Junio, 2026 - 05:30 PM"
 */
export function formatAccountDateTime(date) {
  if (!date) return "-";
  return new Date(date).toLocaleString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/* ======================================
 * PARSE USER AGENT (TEXTO AMIGABLE PARA DISPOSITIVOS)
 * ==================================== */
/**
 * Transforma el User-Agent crudo enviado por Express en algo legible por el usuario final.
 */
export function parseUserAgent(userAgentStr) {
  if (!userAgentStr) return "Dispositivo Desconocido";

  const ua = userAgentStr.toLowerCase();
  let os = "Sistema Operativo Desconocido";
  let browser = "Navegador Desconocido";

  // Detección simple de Sistema Operativo
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  else if (ua.includes("macintosh") || ua.includes("mac os")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";

  // Detección simple de Navegador
  if (ua.includes("edg/")) browser = "Edge";
  else if (ua.includes("chrome") && !ua.includes("chromium")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("opera") || ua.includes("opr/")) browser = "Opera";

  return `${browser} en ${os}`;
}
