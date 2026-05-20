import { LogOut, Monitor, MapPin, Clock } from "lucide-react";

import { Modal, HeaderModal, FooterModal } from "@/components/modals";
import { ModernButton } from "@/components/buttons";

import useSessions from "../hooks/useSessions";

export default function SessionsModal({ open, onClose }) {
  const {
    sessions,

    sessionsLoading,

    closeSession,
  } = useSessions();

  async function handleCloseSession(sessionId) {
    try {
      await closeSession(sessionId);
    } catch (error) {
      console.error("SESSION ERROR:", error);
    }
  }

  return (
    <Modal open={open} onClose={onClose} size="md">
      <HeaderModal
        title="Sesiones Activas"
        subtitle="
          Administra los dispositivos
          conectados a tu cuenta
        "
        onClose={onClose}
      />

      <div
        className="
          max-h-[65vh]
          overflow-y-auto

          px-6
          py-6
        "
      >
        {sessionsLoading ? (
          <div
            className="
              py-10
              text-center
            "
          >
            <p
              className="
                text-sm
                text-slate-500
              "
            >
              Cargando sesiones...
            </p>
          </div>
        ) : sessions?.length === 0 ? (
          <div
            className="
              py-10
              text-center
            "
          >
            <p
              className="
                text-sm
                text-slate-500
              "
            >
              No hay sesiones activas
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="
                  flex
                  items-start
                  justify-between
                  gap-4

                  rounded-2xl
                  border

                  border-slate-200
                  dark:border-slate-800

                  bg-slate-50/80
                  dark:bg-slate-900/50

                  p-4
                "
              >
                <div className="min-w-0 flex-1">
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <Monitor
                      size={16}
                      className="
                        text-slate-500
                      "
                    />

                    <p
                      className="
                        truncate

                        text-sm
                        font-medium

                        text-slate-800
                        dark:text-slate-200
                      "
                    >
                      {session.deviceName || "Dispositivo"}
                    </p>
                  </div>

                  <div
                    className="
                      space-y-1

                      text-xs
                      text-slate-500
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <MapPin size={14} />

                      {session.ipAddress || "IP desconocida"}
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Clock size={14} />

                      {new Date(session.createdAt).toLocaleString("es-PE")}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCloseSession(session.id)}
                  className="
                    rounded-xl

                    px-3
                    py-1.5

                    text-xs
                    font-medium

                    text-red-600

                    transition-all

                    hover:bg-red-50
                    dark:hover:bg-red-900/20
                  "
                >
                  Cerrar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterModal>
        <div
          className="
            flex
            justify-end
            w-full
          "
        >
          <ModernButton
            text="Cerrar"
            variant="outline"
            icon={LogOut}
            onClick={onClose}
          />
        </div>
      </FooterModal>
    </Modal>
  );
}
