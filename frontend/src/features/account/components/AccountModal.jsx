// ========================================
// features/account/components/AccountModal.jsx
// ========================================
import { BarChart3, Pencil, Shield, User2 } from "lucide-react";
import { useEffect, useState } from "react";

import { ModernButton } from "@/components/buttons";
import { HeaderModal, Modal } from "@/components/overlays";
import { ROLE_LABELS } from "../constants/account.constants";

// Submodales encapsulados
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import EditProfileModal from "./EditProfileModal";
import SessionsModal from "./SessionsModal";
import TwoFactorModal from "./TwoFactorModal";

// Hooks de estado central
import useAccountProfile from "../hooks/useAccountProfile";
import useTwoFactor from "../hooks/useTwoFactor";

export default function AccountModal({ open, onClose }) {
  const { user, fetchAccount } = useAccountProfile();
  const { enabled: twoFactorEnabled } = useTwoFactor();

  // Estados de control de submodales
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openTwoFactorModal, setOpenTwoFactorModal] = useState(false);
  const [openSessionsModal, setOpenSessionsModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (open) fetchAccount();
  }, [open, fetchAccount]);

  useEffect(() => {
    if (!open) {
      setOpenPasswordModal(false);
      setOpenEditProfileModal(false);
      setOpenTwoFactorModal(false);
      setOpenSessionsModal(false);
      setOpenDeleteModal(false);
    }
  }, [open]);

  const companyName =
    typeof user?.company === "object" ? user?.company?.name : user?.company;
  const branchName =
    typeof user?.branch === "object" ? user?.branch?.name : user?.branch;

  return (
    <>
      <Modal open={open} onClose={onClose} size="full">
        <HeaderModal
          title="Mi Cuenta"
          subtitle="Gestiona tu perfil corporativo, seguridad de acceso y sesiones activas"
          onClose={onClose}
          icon={User2}
        />

        <div className="max-h-[78vh] overflow-y-auto px-8 py-8 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* PANELA IZQUIERDO: DETALLES DE IDENTIDAD */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm h-fit text-center">
              <div className="flex justify-center mb-4">
                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border shadow-inner">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User2
                      size={36}
                      className="text-slate-400 dark:text-slate-500"
                    />
                  )}
                </div>
              </div>

              <div className="mb-4 min-w-0">
                <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {user?.name || "Usuario del Sistema"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {user?.email || "sin-correo@empresa.com"}
                </p>
              </div>

              <div className="space-y-3 border-t border-b border-slate-100 dark:border-slate-800/80 py-4 mb-4 text-left">
                <InfoItem
                  label="Rol"
                  value={ROLE_LABELS[user?.role] || user?.role}
                />
                <InfoItem label="Empresa" value={companyName} />
                <InfoItem label="Sucursal" value={branchName} />
                <InfoItem
                  label="Estado"
                  value={user?.isActive ? "Activo" : "Inactivo"}
                  isBadge
                />
              </div>

              <ModernButton
                text="Editar Perfil"
                size="sm"
                icon={Pencil}
                onClick={() => setOpenEditProfileModal(true)}
                className="w-full justify-center"
              />
            </div>

            {/* PANEL DERECHO UNIFICADO (TODO JUNTO SIN CARDS ANIDADOS) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/80">
              {/* BLOQUE 1: MÉTRICAS Y ACTIVIDAD */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <BarChart3
                    size={18}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Resumen de Actividad
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-950/30 p-4 rounded-xl border dark:border-slate-800/60">
                  <div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Ventas concretadas
                    </span>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                      {user?.stats?.sales || 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Último acceso al sistema
                    </span>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1.5">
                      {user?.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("es-PE", {
                            dateStyle: "long",
                          })
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BLOQUE 2: SEGURIDAD Y HERRAMIENTAS */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Shield
                    size={18}
                    className="text-slate-400 dark:text-slate-500"
                  />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Seguridad y Accesos
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <ModernButton
                    onClick={() => setOpenPasswordModal(true)}
                    variant="secondary"
                    text="Cambiar contraseña"
                    className="justify-center text-xs h-10"
                  />

                  <ModernButton
                    onClick={() => setOpenTwoFactorModal(true)}
                    variant="secondary"
                    className="justify-center text-xs h-10"
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <span>MFA Autenticador</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                          twoFactorEnabled
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/20"
                            : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700/60"
                        }`}
                      >
                        {twoFactorEnabled ? "Activo" : "Off"}
                      </span>
                    </div>
                  </ModernButton>

                  <ModernButton
                    onClick={() => setOpenSessionsModal(true)}
                    variant="secondary"
                    text="Sesiones activas"
                    className="justify-center text-xs h-10"
                  />
                </div>
              </div>

              {/* BLOQUE 3: ACCIONES DE PELIGRO */}
              <div className="p-6 bg-red-50/10 dark:bg-red-950/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                      Zona de riesgo
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                      Al eliminar tu cuenta, perderás de forma inmediata el
                      acceso histórico a inventarios, auditorías y registros
                      comerciales del minimarket.
                    </p>
                  </div>
                  <ModernButton
                    onClick={() => setOpenDeleteModal(true)}
                    text="Eliminar Cuenta"
                    variant="danger"
                    size="sm"
                    className="w-full sm:w-auto font-bold shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* RENDERIZADO DE SUBMODALES CONTROLADOS */}
      <ChangePasswordModal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
      />
      <EditProfileModal
        open={openEditProfileModal}
        onClose={() => setOpenEditProfileModal(false)}
      />
      <TwoFactorModal
        open={openTwoFactorModal}
        onClose={() => setOpenTwoFactorModal(false)}
      />
      <SessionsModal
        open={openSessionsModal}
        onClose={() => setOpenSessionsModal(false)}
      />
      <DeleteAccountModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}

function InfoItem({ label, value, isBadge = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
        {label}
      </span>
      {isBadge ? (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
          {value || "—"}
        </span>
      ) : (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
          {value || "—"}
        </span>
      )}
    </div>
  );
}
