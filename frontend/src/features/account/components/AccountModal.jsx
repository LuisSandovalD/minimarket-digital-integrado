import { X, User2, Shield, BarChart3, Pencil } from "lucide-react";

import { useState } from "react";

import { Modal, HeaderModal, FooterModal } from "@/components/modals";

import { ModernButton } from "@/components/buttons";

import useAccount from "../hooks/useAccount";

import useDeleteAccount from "../hooks/useDeleteAccount";

import useChangePassword from "../hooks/useChangePassword";

import ChangePasswordModal from "./ChangePasswordModal";

import EditProfileModal from "./EditProfileModal";

import TwoFactorModal from "./TwoFactorModal";

import SessionsModal from "./SessionsModal";

import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountModal({ open, onClose, company, branch }) {
  const { user, updateProfile } = useAccount();

  const { removeAccount } = useDeleteAccount();

  const { updatePassword } = useChangePassword();

  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  const [openTwoFactorModal, setOpenTwoFactorModal] = useState(false);

  const [openSessionsModal, setOpenSessionsModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  async function handleUpdateProfile(form) {
    await updateProfile({
      name: form.name,
      email: form.email,
      phone: form.phone,
      avatar: form.avatar,
      twoFactorEnabled: form.twoFactorEnabled,
      isActive: form.isActive,
    });

    setOpenEditProfileModal(false);
  }

  async function handleChangePassword(form) {
    await updatePassword({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });

    setOpenPasswordModal(false);
  }

  return (
    <>
      <Modal open={open} onClose={onClose} size="full">
        {/* HEADER */}

        <HeaderModal
          title="Mi Cuenta"
          subtitle="
            Gestiona tu perfil,
            seguridad y preferencias
          "
          onClose={onClose}
        />

        {/* BODY */}

        <div
          className="
            max-h-[78vh]
            overflow-y-auto

            px-8
            py-8

            bg-gradient-to-b
            from-white/40
            to-slate-100/30

            dark:from-slate-950/40
            dark:to-slate-900/30
          "
        >
          <div
            className="
              grid
              gap-12

              lg:grid-cols-[350px_1fr]
            "
          >
            {/* ========================================
             * LEFT SIDE
             * ====================================== */}

            <div
              className="
                sticky
                top-0

                rounded-3xl
                border
                border-slate-200
                dark:border-slate-800

                bg-white/70
                dark:bg-slate-900/50

                backdrop-blur-xl

                shadow-sm

                px-5
                py-10

                h-full
              "
            >
              {/* AVATAR */}

              <div className="flex justify-center mb-5">
                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center

                    overflow-hidden

                    rounded-3xl

                    bg-slate-100
                    dark:bg-slate-800
                  "
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <User2 size={40} className="text-slate-400" />
                  )}
                </div>
              </div>

              {/* NAME */}

              <div className="text-center mb-8">
                <h2
                  className="
                    text-lg
                    font-bold

                    text-slate-900
                    dark:text-white

                    truncate
                  "
                >
                  {user?.name || "-"}
                </h2>

                <p
                  className="
                    mt-1

                    text-sm
                    text-slate-500

                    truncate
                  "
                >
                  {user?.email || "-"}
                </p>
              </div>

              {/* META */}

              <div className="space-y-4 mb-8">
                <InfoItem label="Rol" value={user?.role} />

                <InfoItem label="Empresa" value={company?.name} />

                <InfoItem label="Sucursal" value={branch?.name} />

                <InfoItem
                  label="Estado"
                  value={user?.isActive ? "Activo" : "Inactivo"}
                />
              </div>

              {/* BUTTON */}

              <ModernButton
                text="Editar Perfil"
                size="sm"
                icon={Pencil}
                onClick={() => setOpenEditProfileModal(true)}
                className="w-full"
              />
            </div>

            {/* ========================================
             * RIGHT SIDE
             * ====================================== */}

            <div className="space-y-5">
              {/* ========================================
               * ACTIVITY
               * ====================================== */}

              <section
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-800

                  bg-white/70
                  dark:bg-slate-900/40

                  backdrop-blur-xl

                  p-6

                  shadow-sm
                "
              >
                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center

                      rounded-2xl

                      bg-slate-100
                      dark:bg-slate-800
                    "
                  >
                    <BarChart3
                      size={18}
                      className="
                        text-slate-600
                        dark:text-slate-300
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        text-sm
                        font-semibold

                        text-slate-900
                        dark:text-white
                      "
                    >
                      Actividad
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      Estadísticas recientes
                    </p>
                  </div>
                </div>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                  "
                >
                  <div
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      dark:border-slate-800

                      bg-white/70
                      dark:bg-slate-900/40

                      backdrop-blur-xl

                      p-5

                      shadow-sm
                    "
                  >
                    <p
                      className="
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Accesos
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        font-bold

                        text-slate-900
                        dark:text-white
                      "
                    >
                      {user?.loginAttempts || 0}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      dark:border-slate-800

                      bg-white/70
                      dark:bg-slate-900/40

                      backdrop-blur-xl

                      p-5

                      shadow-sm
                    "
                  >
                    <p
                      className="
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Último acceso
                    </p>

                    <p
                      className="
                        mt-2
                        text-lg
                        font-semibold

                        text-slate-900
                        dark:text-white
                      "
                    >
                      {user?.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString("es-ES")
                        : "—"}
                    </p>
                  </div>
                </div>
              </section>

              {/* ========================================
               * SECURITY
               * ====================================== */}

              <section
                className="
                  flex
                  gap-4

                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-800

                  bg-white/70
                  dark:bg-slate-900/40

                  backdrop-blur-xl

                  p-6

                  shadow-sm
                "
              >
                {/* SECURITY */}

                <div className="flex-1">
                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center

                        rounded-2xl

                        bg-slate-100
                        dark:bg-slate-800
                      "
                    >
                      <Shield
                        size={18}
                        className="
                          text-slate-600
                          dark:text-slate-300
                        "
                      />
                    </div>

                    <div>
                      <h3
                        className="
                          text-sm
                          font-semibold

                          text-slate-900
                          dark:text-white
                        "
                      >
                        Seguridad
                      </h3>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Configuración y protección
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <ModernButton
                      onClick={() => setOpenPasswordModal(true)}
                      variant="secondary"
                      text="Cambiar contraseña"
                    />

                    <ModernButton
                      onClick={() => setOpenTwoFactorModal(true)}
                      variant="secondary"
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <span>Autenticación 2FA</span>

                        <span
                          className={`
                            text-xs
                            px-2
                            py-1
                            rounded-full

                            ${
                              user?.twoFactorEnabled
                                ? `
                                  bg-emerald-100
                                  dark:bg-emerald-900/30

                                  text-emerald-700
                                  dark:text-emerald-400
                                `
                                : `
                                  bg-slate-200
                                  dark:bg-slate-700

                                  text-slate-600
                                  dark:text-slate-300
                                `
                            }
                          `}
                        >
                          {user?.twoFactorEnabled ? "Activado" : "Desactivado"}
                        </span>
                      </div>
                    </ModernButton>

                    <ModernButton
                      onClick={() => setOpenSessionsModal(true)}
                      variant="secondary"
                      text="Sesiones activas"
                    />
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-3">
                {/* DANGER */}
                <h3
                  className="
                      text-sm
                      font-semibold
                      text-red-600
                      dark:text-red-400

                    "
                >
                  Zona de riesgo
                </h3>

                <ModernButton
                  onClick={() => setOpenDeleteModal(true)}
                  text="Eliminar cuenta"
                  variant="danger"
                />
              </section>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <FooterModal>
          <div className="w-full flex justify-end">
            <ModernButton
              text="Cerrar"
              variant="outline"
              icon={X}
              onClick={onClose}
            />
          </div>
        </FooterModal>
      </Modal>

      {/* PASSWORD */}

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        onSubmit={handleChangePassword}
      />

      {/* EDIT */}

      <EditProfileModal
        open={openEditProfileModal}
        onClose={() => setOpenEditProfileModal(false)}
        user={user}
        company={company}
        branch={branch}
        onSubmit={handleUpdateProfile}
      />

      {/* 2FA */}

      <TwoFactorModal
        open={openTwoFactorModal}
        onClose={() => setOpenTwoFactorModal(false)}
        isEnabled={user?.twoFactorEnabled || false}
      />

      {/* SESSIONS */}

      <SessionsModal
        open={openSessionsModal}
        onClose={() => setOpenSessionsModal(false)}
      />

      {/* DELETE */}

      <DeleteAccountModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}

function InfoItem({ label, value }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <span
        className="
          text-sm
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className="
          text-sm
          font-medium

          text-slate-900
          dark:text-white
        "
      >
        {value || "—"}
      </span>
    </div>
  );
}
