import { ModernButton } from "@/components/buttons";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";
import { LoadingSpinner } from "@/components/skeletons";

import { BarChart3, Pencil, Shield, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ROLE_LABELS } from "../constants/account.constants";
import useAccountProfile from "../hooks/useAccountProfile";
import useTwoFactor from "../hooks/useTwoFactor";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";
import EditProfileModal from "./EditProfileModal";
import SessionsModal from "./SessionsModal";
import TwoFactorModal from "./TwoFactorModal";

export default function AccountModal({ open, onClose }) {
  const { user, fetchAccount } = useAccountProfile();
  const { enabled: twoFactorEnabled } = useTwoFactor();
  const [loading, setLoading] = useState(true);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openTwoFactorModal, setOpenTwoFactorModal] = useState(false);
  const [openSessionsModal, setOpenSessionsModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    async function loadAccountData() {
      if (!open) return;
      setLoading(true);
      try {
        await fetchAccount();
      } catch (error) {
        console.error("Error al cargar la cuenta:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAccountData();
  }, [open, fetchAccount]);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

        <div className="relative max-h-[78vh] min-h-[45vh] overflow-y-auto p-6 flex flex-col">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm text-center">
                <div className="flex justify-center">
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

                <div className="min-w-0 space-y-1">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {user?.name || "Usuario del Sistema"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user?.email || "sin-correo@empresa.com"}
                  </p>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-b border-slate-100 dark:border-slate-800/80 text-left">
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Rol
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                      {ROLE_LABELS[user?.role] || user?.role || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Empresa
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                      {companyName || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Sucursal
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[170px]">
                      {branchName || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Estado
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
                      {user?.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>

                <ModernButton
                  text="Editar Perfil"
                  size="sm"
                  icon={Pencil}
                  onClick={() => setOpenEditProfileModal(true)}
                  className="w-full justify-center mt-auto"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/80">
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <BarChart3
                      size={18}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Resumen de Actividad
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/30">
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
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {user?.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString(
                              "es-PE",
                              { dateStyle: "long" },
                            )
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield
                      size={18}
                      className="text-slate-400 dark:text-slate-500"
                    />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Seguridad y Accesos
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
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
              </div>
            </div>
          )}
        </div>

        <FooterModal className="bg-red-50/10 dark:bg-red-950/5 border-t border-slate-100 dark:border-slate-800/80 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                Zona de riesgo
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Al eliminar tu cuenta, perderás de forma inmediata el acceso
                histórico a inventarios, auditorías y registros comerciales del
                minimarket.
              </p>
            </div>
            <ModernButton
              onClick={() => setOpenDeleteModal(true)}
              text="Eliminar Cuenta"
              variant="danger"
              size="sm"
              className="w-full sm:w-auto font-bold shrink-0"
              disabled={loading}
            />
          </div>
        </FooterModal>
      </Modal>

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
