// ========================================
// components/UserModal.jsx
// ========================================

import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import { ModernImageUpload } from "@/components/media/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";
import {
  Building2,
  Check,
  Layers3,
  Lock,
  Mail,
  Phone,
  User,
  UserCheck,
  UserCog,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getBranches } from "../../../features/branches/services/branch.service";
import useUserForm from "../hooks/useUsersForm";
import { getUsers } from "../services/users.service";

const ROLES = [
  { value: "MANAGER", label: "Gerente", icon: UserCog },
  { value: "SUPERVISOR", label: "Supervisor", icon: Layers3 },
  { value: "EMPLOYEE", label: "Empleado", icon: User },
];

export default function UserModal({ open, onClose, onSuccess, user = null }) {
  const { loading, formData, isEdit, handleChange, handleSubmit } = useUserForm(
    {
      user,
      onClose,
      onSuccess,
    },
  );

  const [branches, setBranches] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (open) {
      loadBranches();
      loadUsers();
    }
  }, [open]);

  const loadBranches = async () => {
    try {
      const data = await getBranches();
      setBranches(data?.data || data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setAllUsers(response?.data || response || []);
    } catch (error) {
      console.error(error);
    }
  };

  // ========================================
  // FILTRADO DINÁMICO DE RESPONSABLES
  // ========================================
  const availableManagers = useMemo(() => {
    if (formData.role === "ADMIN") return [];

    return allUsers.filter((u) => {
      if (isEdit && u.id === user?.id) return false;

      if (formData.role === "MANAGER") return u.role === "ADMIN";
      if (formData.role === "SUPERVISOR") return u.role === "MANAGER";
      if (formData.role === "EMPLOYEE") return u.role === "SUPERVISOR";

      return false;
    });
  }, [allUsers, formData.role, isEdit, user]);

  // ========================================
  // CONTROLADOR DE CAMBIO DE JEFE DIRECTO (AUTO-ASIGNA SUCURSAL)
  // ========================================
  const handleSelectManager = (mgr) => {
    // 1. Cambiamos el managerId normalmente
    handleChange({
      target: { name: "managerId", value: mgr.id },
    });

    // 2. Si el jefe tiene una sucursal, la heredamos automáticamente al formulario
    if (mgr.branchId || mgr.branch?.id) {
      const TargetBranchId = mgr.branchId || mgr.branch?.id;
      handleChange({
        target: { name: "branchId", value: TargetBranchId },
      });
    }
  };

  // Determinamos si la sucursal actual proviene de una regla obligatoria por jerarquía
  const isBranchInherited =
    formData.role === "SUPERVISOR" || formData.role === "EMPLOYEE";

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        title={isEdit ? "Editar Usuario" : "Nuevo Usuario"}
        subtitle={
          isEdit
            ? "Actualiza la información del usuario."
            : "Registra un nuevo usuario."
        }
        onClose={onClose}
      />

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
            {/* PANEL IZQUIERDO: AVATAR */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Foto de Perfil
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Imagen representativa del usuario.
                </p>
              </div>

              <ModernImageUpload
                value={formData.avatar}
                onChange={(file) =>
                  handleChange({
                    target: { name: "avatar", value: file },
                  })
                }
                height="h-90"
              />
            </div>

            {/* PANEL DERECHO: FORMULARIOS */}
            <div className="space-y-6">
              {/* SECCIÓN INFORMACIÓN GENERAL */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5">
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Información General
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Datos principales del usuario.
                  </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-2 md:grid-cols-2">
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
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    required={!isEdit}
                  />
                </div>
              </div>

              {/* SECCIÓN ROL DEL USUARIO */}
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5">
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Rol del Usuario
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Selecciona un rol para este usuario.
                  </p>
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                  {ROLES.map((role) => {
                    const Icon = role.icon;
                    const active = formData.role === role.value;

                    return (
                      <button
                        type="button"
                        key={role.value}
                        onClick={() => {
                          handleChange({
                            target: { name: "role", value: role.value },
                          });
                          // Reseteamos el jefe si cambia de rol para evitar inconsistencias
                          handleChange({
                            target: { name: "managerId", value: "" },
                          });
                        }}
                        className={`relative flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-200 ${active ? "bg-violet-500/10 border border-violet-500/30" : "bg-slate-100/70 border border-transparent hover:bg-slate-200/50 dark:bg-slate-900"}`}
                      >
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-violet-500 text-white" : "bg-white text-slate-600 dark:bg-slate-950"}`}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{role.label}</h4>
                        </div>
                        {active && (
                          <Check
                            size={16}
                            className="ml-auto text-violet-600"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECCIÓN: RESPONSABLE / JEFE DIRECTO */}
              {formData.role !== "ADMIN" && (
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5">
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Jefe Directo / Responsable
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Asigna el responsable jerárquico directo para este
                      usuario.
                    </p>
                  </div>

                  {availableManagers.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {availableManagers.map((mgr) => {
                        const active = Number(formData.managerId) === mgr.id;

                        return (
                          <button
                            type="button"
                            key={mgr.id}
                            onClick={() => handleSelectManager(mgr)}
                            className={`relative overflow-hidden rounded-2xl flex items-center gap-3 border p-4 text-left transition-all duration-200 ${active ? "bg-violet-500/10 border-violet-500/30" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"}`}
                          >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600">
                              {mgr.avatar ? (
                                <img
                                  src={mgr.avatar}
                                  alt={mgr.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <UserCheck size={18} />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                                {mgr.name}
                              </h4>
                              <p className="text-xs font-medium text-violet-600 dark:text-violet-400">
                                {mgr.role}
                              </p>
                              {(mgr.branch?.name || mgr.branchId) && (
                                <p className="mt-0.5 truncate text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                  <Building2 size={10} />
                                  {mgr.branch?.name ||
                                    `Sucursal ID: ${mgr.branchId}`}
                                </p>
                              )}
                            </div>

                            {active && (
                              <Check
                                size={16}
                                className="absolute right-4 top-4 text-violet-600"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6 text-center">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        No hay usuarios con el rol requerido disponibles para
                        asignar como responsables.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN SUCURSALES ASIGNADAS */}
          <div className="mt-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Sucursal Asignada
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {isBranchInherited
                    ? "Esta sucursal está bloqueada porque se hereda del Jefe Directo seleccionado arriba."
                    : "Selecciona la sucursal asignada a este usuario corporativo."}
                </p>
              </div>
              {isBranchInherited && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full border border-amber-500/20 animate-pulse">
                  Sucursal Heredada
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {branches.map((branch) => {
                const active = formData.branchId === branch.id;

                return (
                  <button
                    type="button"
                    key={branch.id}
                    disabled={isBranchInherited}
                    onClick={() =>
                      handleChange({
                        target: { name: "branchId", value: branch.id },
                      })
                    }
                    className={`relative overflow-hidden rounded-2xl flex gap-3 border p-5 text-left transition-all duration-200 
                      ${active ? "bg-violet-500/10 border-violet-500/30" : "bg-slate-50/70 border-slate-200 dark:border-slate-800 dark:bg-slate-900/40"}
                      ${isBranchInherited ? "opacity-60 cursor-not-allowed" : "hover:bg-slate-100/70"}`}
                  >
                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-violet-500 text-white" : "bg-white text-slate-600 dark:bg-slate-950"}`}
                    >
                      <Building2 size={18} />
                    </div>

                    <div>
                      <h4 className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {branch.name}
                      </h4>
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                        {branch.city || "Sin ciudad"}
                      </p>
                    </div>

                    {active && (
                      <Check
                        size={16}
                        className="absolute right-5 top-5 text-violet-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <FooterModal>
          <div className="flex w-full items-center justify-between gap-4 pb-5">
            <div className="hidden text-xs text-slate-500 sm:block">
              La información será guardada en la base de datos centralizada.
            </div>

            <div className="ml-auto flex items-center gap-3">
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
