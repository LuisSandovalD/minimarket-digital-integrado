// ========================================
// features/account/utils/account.mapper.js
// ========================================

import { parseUserAgent } from "./account.helpers";

/* ======================================
 * MAPPER DE USUARIO CENTRAL
 * ==================================== */
export function mapAccount(user) {
  return {
    id: user?.id || null,
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "EMPLOYEE",
    avatar: user?.avatar || null,
    phone: user?.phone || "",
    isActive: user?.isActive || false,
    isDeleted: user?.isDeleted || false,
    isOnline: user?.isOnline || false,
    lastLogin: user?.lastLogin || null,
    lastLogout: user?.lastLogout || null,
    twoFactorEnabled: user?.twoFactorEnabled || false,
    createdAt: user?.createdAt || null,
    updatedAt: user?.updatedAt || null,
    manager: user?.manager || null,
    subordinates: user?.subordinates || [],
    company: user?.company || null,
    branch: user?.branch || null,
    stats: {
      sales: user?.stats?.sales || 0,
      purchases: user?.stats?.purchases || 0,
      supportTickets: user?.stats?.supportTickets || 0,
    },
  };
}

/* ======================================
 * MAPPER DE SESIÓN DE DISPOSITIVO (NUEVO)
 * ==================================== */
/**
 * Normaliza las filas de la tabla public.UserSession mapeándolas
 * con propiedades semánticas y amigables para renderizar en la interfaz.
 */
export function mapUserSession(session) {
  return {
    id: session?.id || null,
    userId: session?.userId || null,
    ipAddress: session?.ipAddress || "IP no registrada",
    // Guardamos el crudo pero también inyectamos la versión procesada legible
    rawUserAgent: session?.userAgent || "",
    deviceLabel: parseUserAgent(session?.userAgent),
    isActive: session?.isActive ?? true,
    // Timestamps de control mapeados uno a uno con tu esquema PostgreSQL
    createdAt: session?.createdAt || null,
    expiresAt: session?.expiresAt || null,
    refreshExpiresAt: session?.refreshExpiresAt || null,
  };
}
