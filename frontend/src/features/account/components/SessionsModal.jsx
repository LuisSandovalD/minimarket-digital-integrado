// ========================================
// features/account/components/SessionsModal.jsx
// ========================================
import {
  AlertCircle,
  Clock,
  Laptop2,
  MapPin,
  Monitor,
  RefreshCw,
  ShieldAlert,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { HeaderModal, Modal } from "@/components/overlays";
import useAccountSessions from "../hooks/useAccountSessions";

export default function SessionsModal({ open, onClose }) {
  // CORRECCIÓN: Desestructuramos los nombres reales que expone tu custom hook
  const {
    sessions,
    sessionsLoading,
    serverError, // En tu hook se llama serverError, no error
    refreshSessions,
    handleRevokeSession,
  } = useAccountSessions();

  const [revokingId, setRevokingId] = useState(null);

  // Sincronizar automáticamente al abrir
  useEffect(() => {
    if (open && typeof refreshSessions === "function") {
      refreshSessions();
    }
  }, [open, refreshSessions]);

  /* ======================================
   * ORQUESTADOR DE REVOCACIÓN DE TOKEN
   * ==================================== */
  async function handleCloseSession(sessionId) {
    try {
      setRevokingId(sessionId);
      // CORRECCIÓN: Usamos el método real del hook
      await handleRevokeSession(sessionId);
    } catch (err) {
      console.error("Fallo crítico al revocar la sesión:", err);
    } finally {
      setRevokingId(null);
    }
  }

  const getDeviceIcon = (label = "") => {
    const lower = label.toLowerCase();
    if (
      lower.includes("phone") ||
      lower.includes("android") ||
      lower.includes("iphone") ||
      lower.includes("mobile")
    ) {
      return (
        <Smartphone size={16} className="text-slate-500 dark:text-slate-400" />
      );
    }
    return <Monitor size={16} className="text-slate-500 dark:text-slate-400" />;
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <HeaderModal
        title="Sesiones Activas"
        subtitle="Administra y audita en tiempo real los terminales autorizados en tu cuenta"
        onClose={onClose}
        icon={Laptop2}
      />

      <div className="max-h-[65vh] overflow-y-auto px-6 py-6 space-y-4">
        {/* PANEL DE CONTROL SUPERIOR Y REFRESCO */}
        <div className="flex justify-between items-center bg-slate-100/50 dark:bg-slate-900/30 p-3 rounded-2xl border dark:border-slate-800/60">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-2">
            <ShieldAlert size={14} className="text-primary" />
            Tokens concurrentes firmados en la base de datos
          </span>
          <ModernButton
            text={sessionsLoading ? "Sincronizando..." : "Actualizar"}
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={() => refreshSessions?.()} // CORRECCIÓN: refreshSessions
            disabled={sessionsLoading}
            className={`text-xs ${sessionsLoading ? "animate-pulse" : ""}`}
          />
        </div>

        {/* CONTENEDOR DE ERRORES DEL BACKEND */}
        {serverError && ( // CORRECCIÓN: serverError
          <div className="p-3.5 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-950/30 flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {/* INTERFAZ REACTIVA */}
        {sessionsLoading && (!sessions || sessions.length === 0) ? (
          <div className="space-y-3 py-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-24 w-full rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse border dark:border-slate-800"
              />
            ))}
          </div>
        ) : !sessions || sessions.length === 0 ? (
          <div className="py-12 text-center bg-slate-50/40 dark:bg-slate-900/20 rounded-2xl border border-dashed dark:border-slate-800">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              No se han detectado credenciales ni sesiones externas activas.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => {
              const deviceName =
                session.deviceLabel ||
                session.deviceName ||
                session.device ||
                "Terminal Desconocido";

              const isRevoking = revokingId === session.id;

              return (
                <div
                  key={session.id}
                  className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                    session.isCurrent
                      ? "border-primary/30 bg-primary/5 dark:bg-primary/5"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80"
                  }`}
                >
                  <div className="min-w-0 flex-1 flex gap-3.5 items-center">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border dark:border-slate-700/50">
                      {getDeviceIcon(deviceName)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-2 flex-wrap">
                        <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
                          {deviceName}
                        </p>
                        {session.isCurrent && (
                          <span className="text-[9px] px-2 py-0.5 font-extrabold uppercase tracking-wider rounded-md bg-primary text-white animate-pulse">
                            Este Dispositivo
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin
                            size={13}
                            className="shrink-0 text-slate-400"
                          />
                          <span>IP: {session.ipAddress || "Oculta / VPN"}</span>
                        </div>

                        <div className="flex items-center gap-1.5 truncate">
                          <Clock
                            size={13}
                            className="shrink-0 text-slate-400"
                          />
                          <span>
                            {new Date(session.createdAt).toLocaleString(
                              "es-PE",
                              {
                                dateStyle: "short",
                                timeStyle: "short",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <ModernButton
                      text={isRevoking ? "Revocando..." : "Revocar"}
                      variant="danger"
                      size="xs"
                      onClick={() => handleCloseSession(session.id)}
                      disabled={
                        sessionsLoading || isRevoking || session.isCurrent
                      }
                      title={
                        session.isCurrent
                          ? "No puedes revocar tu sesión activa desde aquí"
                          : "Cerrar sesión de forma remota"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
