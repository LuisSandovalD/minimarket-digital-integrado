import { useEffect, useState } from "react";

import {
  Building2,
  Check,
  Layers3,
  Lock,
  Mail,
  Phone,
  User,
  UserCog,
  X,
} from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/modals";

import { Input } from "@/components/inputs";

import { ModernButton, SubmitButton } from "@/components/buttons";

import ModernImageUpload from "@/components/ui/ModernImageUpload";

import useUserForm from "../hooks/useUsersForm";

import { getBranches } from "../../../features/branches/services/branch.service";

/* ========================================
 * ROLES
 * ====================================== */

const ROLES = [
  {
    value: "MANAGER",
    label: "Gerente",
    icon: UserCog,
  },

  {
    value: "SUPERVISOR",
    label: "Supervisor",
    icon: Layers3,
  },
];

/* ========================================
 * COMPONENT
 * ====================================== */

export default function UserModal({ open, onClose, onSuccess, user = null }) {
  const {
    loading,

    formData,

    isEdit,

    handleChange,

    handleSubmit,
  } = useUserForm({
    user,
    onClose,
    onSuccess,
  });

  /* ========================================
   * BRANCHES
   * ====================================== */

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const data = await getBranches();

      setBranches(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="full">
      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title={isEdit ? "Editar Usuario" : "Nuevo Usuario"}
        subtitle={
          isEdit
            ? "Actualiza la información del usuario."
            : "Registra un nuevo usuario."
        }
        onClose={onClose}
      />

      {/* ========================================
       * FORM
       * ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
        "
      >
        {/* BODY */}

        <div
          className="
            max-h-[75vh]
            overflow-y-auto
            px-6
            py-5
          "
        >
          <div
            className="
              grid
              gap-6

              xl:grid-cols-[340px_1fr]
            "
          >
            {/* ========================================
             * IMAGE SECTION
             * ====================================== */}

            <div className="space-y-4">
              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-slate-100
                  "
                >
                  Foto de Perfil
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Imagen representativa del usuario.
                </p>
              </div>

              <ModernImageUpload
                value={formData.avatar}
                onChange={(file) =>
                  handleChange({
                    target: {
                      name: "avatar",
                      value: file,
                    },
                  })
                }
                height="h-90"
              />
            </div>

            {/* ========================================
             * FORM SECTION
             * ====================================== */}

            <div className="space-y-6">
              {/* ========================================
               * GENERAL INFO
               * ====================================== */}

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-800

                  bg-slate-50/70
                  dark:bg-slate-900/40

                  p-5
                "
              >
                <div className="mb-5">
                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                      dark:text-slate-100
                    "
                  >
                    Información General
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Datos principales del usuario.
                  </p>
                </div>

                <div
                  className="
                    grid
                    gap-5
                    lg:grid-cols-2
                    md:grid-cols-2
                  "
                >
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    icon={User}
                    required
                  />

                  <Input
                    label="Correo"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@empresa.com"
                    icon={Mail}
                    required
                  />

                  <Input
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    icon={Phone}
                  />

                  <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    icon={Lock}
                  />
                </div>
              </div>

              {/* ========================================
               * ROLE SECTION
               * ====================================== */}

              <div
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-800

                  bg-slate-50/70
                  dark:bg-slate-900/40

                  p-5
                "
              >
                <div className="mb-5">
                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                      dark:text-slate-100
                    "
                  >
                    Rol del Usuario
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Selecciona un rol para este usuario.
                  </p>
                </div>

                <div className="flex gap-3">
                  {ROLES.map((role) => {
                    const Icon = role.icon;

                    const active = formData.role === role.value;

                    return (
                      <button
                        type="button"
                        key={role.value}
                        onClick={() =>
                          handleChange({
                            target: {
                              name: "role",
                              value: role.value,
                            },
                          })
                        }
                        className={`
                          relative

                          flex
                          w-full
                          items-center
                          gap-4

                          rounded-2xl

                          px-4
                          py-4

                          text-left

                          transition-all
                          duration-200

                          ${
                            active
                              ? `
                                bg-violet-500/10
                              `
                              : `
                                bg-slate-100/70

                                hover:bg-slate-500

                                dark:bg-slate-900
                              `
                          }
                        `}
                      >
                        <div
                          className={`
                            flex
                            h-11
                            w-11

                            items-center
                            justify-center

                            rounded-xl

                            ${
                              active
                                ? `
                                  bg-violet-500
                                  text-white
                                `
                                : `
                                  bg-white
                                  text-slate-600

                                  dark:bg-slate-950
                                `
                            }
                          `}
                        >
                          <Icon size={18} />
                        </div>

                        <div>
                          <h4
                            className="
                              text-sm
                              font-medium
                            "
                          >
                            {role.label}
                          </h4>
                        </div>

                        {active && (
                          <Check
                            size={16}
                            className="
                              ml-auto
                              text-violet-600
                            "
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================
           * BRANCHES SECTION
           * ====================================== */}

          <div className="mt-6">
            <div className="mb-5">
              <h3
                className="
                  text-sm
                  font-semibold
                  text-slate-800
                  dark:text-slate-100
                "
              >
                Sucursales Asignadas
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Selecciona la sucursal asignada a este usuario.
              </p>
            </div>

            <div
              className="
                grid
                gap-4

                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {branches.map((branch) => {
                const active = formData.branchId === branch.id;

                return (
                  <button
                    type="button"
                    key={branch.id}
                    onClick={() =>
                      handleChange({
                        target: {
                          name: "branchId",
                          value: branch.id,
                        },
                      })
                    }
                    className={`
                      relative

                      overflow-hidden

                      rounded-2xl

                      flex
                      gap-3

                      border
                      border-slate-200
                      dark:border-slate-800

                      p-5

                      text-left

                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-violet-500/10
                          `
                          : `
                            bg-slate-50/70

                            hover:bg-slate-500/70

                            dark:bg-slate-900/40
                          `
                      }
                    `}
                  >
                    <div
                      className={`
                        mb-4

                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-xl

                        ${
                          active
                            ? `
                              bg-violet-500
                              text-white
                            `
                            : `
                              bg-white
                              text-slate-600

                              dark:bg-slate-950
                            `
                        }
                      `}
                    >
                      <Building2 size={18} />
                    </div>

                    <div>
                      <h4
                        className="
                          truncate

                          text-sm
                          font-semibold
                          text-slate-800
                          dark:text-slate-100
                        "
                      >
                        {branch.name}
                      </h4>

                      <p
                        className="
                          mt-1

                          truncate

                          text-xs

                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {branch.city || "Sin ciudad"}
                      </p>
                    </div>

                    {active && (
                      <Check
                        size={16}
                        className="
                          absolute
                          right-5
                          top-5

                          text-violet-600
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================
         * FOOTER
         * ====================================== */}

        <FooterModal>
          <div
            className="
              flex
              w-full
              items-center
              justify-between
              gap-4
              pb-5
            "
          >
            <div
              className="
                hidden
                text-xs
                text-slate-500

                sm:block
              "
            >
              La información será guardada automáticamente en el usuario.
            </div>

            <div
              className="
                ml-auto
                flex
                items-center
                gap-3
              "
            >
              <ModernButton
                type="button"
                text="Cancelar"
                variant="outline"
                icon={X}
                onClick={onClose}
              />

              <SubmitButton
                text={isEdit ? "Guardar Cambios" : "Crear Usuario"}
                loading={loading}
              />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
