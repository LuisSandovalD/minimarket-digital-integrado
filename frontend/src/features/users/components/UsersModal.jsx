// 1. Iconos (Lucide)
import { Building2, Check, Edit2, Layers3, Mail, Phone, User, User2, UserCheck, UserCog, X } from "lucide-react";

// 2. Componentes de UI comunes
import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input, PasswordInput } from "@/components/forms/";
import { ModernImageUpload } from "@/components/media/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

// 3. Hooks personalizados
import { useUserModalData } from "../hooks/useUserModalData";
import useUserForm from "../hooks/useUsersForm";

// 🌟 Importamos el servicio de sesión para validar el rol de quien opera el modal
import { getUser } from "@/features/auth/services/session.service";

// Constantes de configuración originales
const ALL_ROLES = [
  { value: "MANAGER", label: "Gerente", icon: UserCog },
  { value: "SUPERVISOR", label: "Supervisor", icon: Layers3 },
  { value: "EMPLOYEE", label: "Empleado", icon: User },
];

export default function UserModal({ open, onClose, onSuccess, user = null, branches = [], allUsers = [] }) {
  // 🌟 Obtenemos los datos del usuario actualmente logueado
  const currentUser = getUser();
  const currentUserRole = currentUser?.role;

  // Hooks de lógica y estado del formulario
  const { loading, formData, isEdit, handleChange, handleSubmit } = useUserForm({
    user,
    onClose,
    onSuccess,
  });

  const { availableManagers, handleSelectManager, isBranchInherited } = useUserModalData({
    formData,
    allUsers,
    isEdit,
    user,
    handleChange,
  });

  // ============================================================================
  // 🔥 FILTRADO JERÁRQUICO DE ROLES
  // ============================================================================
  const allowedRoles = ALL_ROLES.filter((role) => {
    // Si quien opera es un MANAGER, solo puede crear/editar EMPLEADOS
    if (currentUserRole === "MANAGER") {
      return role.value === "EMPLOYEE";
    }
    // Si fuera un SUPERVISOR (en caso de que tuviese algún acceso de gestión)
    if (currentUserRole === "SUPERVISOR") {
      return role.value === "EMPLOYEE";
    }
    // El ADMIN tiene acceso a todo el listado de roles corporativos
    return true;
  });

  return (
    <Modal open={open} onClose={onClose} size="full">
      {/* HEADER DEL MODAL */}
      <HeaderModal
        icon={isEdit ? Edit2 : User2}
        title={isEdit ? "Editar Usuario" : "Nuevo Usuario"}
        subtitle={
          isEdit
            ? "Modifica los accesos y la información del perfil asignado."
            : "Registra las credenciales corporativas del nuevo integrante."
        }
        onClose={onClose}
      />

      {/* FORMULARIO PRINCIPAL */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full max-h-[calc(100vh-200px)] overflow-hidden text-slate-800 dark:text-slate-100"
      >
        {/* ÁREA DE SCROLL (BODY) */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* SECCIÓN SUPERIOR: AVATAR + INFORMACIÓN BÁSICA */}
          <div className="grid gap-5 lg:grid-cols-[350px_1fr]">
            {/* Contenedor del Avatar */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full flex-1 flex flex-col">
                <ModernImageUpload
                  value={formData.avatar}
                  onChange={(file) => handleChange({ target: { name: "avatar", value: file } })}
                  height="h-full flex-1 min-h-[220px]"
                />
              </div>
              <p className="mt-3 text-[11px] text-center text-slate-400 dark:text-slate-500 leading-relaxed">
                Formatos permitidos: JPG o PNG.
              </p>
            </div>

            <div className="grid gap-3">
              {/* Campos de Entrada */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Información Básica
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Nombre completo"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    icon={User}
                    required
                  />
                  <Input
                    label="Correo electrónico"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="juan@empresa.com"
                    icon={Mail}
                    required
                    disabled={isEdit}
                  />
                  <Input
                    label="Teléfono móvil"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    icon={Phone}
                  />
                  <PasswordInput
                    label="Contraseña de acceso"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password || ""}
                    onChange={handleChange}
                    required={!isEdit}
                    requireStrength={true}
                  />
                </div>
              </div>

              {/* SECCIÓN CENTRAL: SELECCIÓN DE ROL */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Jerarquía y Nivel de Acceso
                </h3>

                <div className="flex flex-wrap gap-3">
                  {allowedRoles.map((role) => {
                    const Icon = role.icon;
                    const active = formData.role === role.value;

                    return (
                      <button
                        type="button"
                        key={role.value}
                        onClick={() => {
                          handleChange({ target: { name: "role", value: role.value } });
                          handleChange({ target: { name: "managerId", value: "" } });
                        }}
                        className={`flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-medium border transition-all duration-200 ${
                          active
                            ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-500/10"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <Icon size={15} className={active ? "text-white" : "text-slate-400"} />
                        {role.label}
                        {active && <Check size={13} className="ml-1 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN RESPONSABLE (JEFE DIRECTO) */}
          {formData.role !== "ADMIN" && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Asignar Jefe Directo
              </h3>

              {availableManagers.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {availableManagers.map((mgr) => {
                    const mgrId = mgr.id || mgr._id;
                    const active = String(formData.managerId) === String(mgrId);

                    return (
                      <button
                        type="button"
                        key={mgrId}
                        onClick={() => handleSelectManager(mgr)}
                        className={`relative rounded-xl flex items-center gap-3 border p-3 text-left transition-all duration-150 ${
                          active
                            ? "bg-violet-500/10 border-violet-500/40"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850"
                        }`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-950 text-slate-500 border border-slate-200/60 dark:border-slate-800">
                          {mgr.avatar ? (
                            <img src={mgr.avatar} alt={mgr.name} className="h-full w-full object-cover" />
                          ) : (
                            <UserCheck size={15} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {mgr.name}
                          </h4>
                          <span className="text-[10px] text-violet-600 dark:text-violet-400 font-semibold tracking-wide uppercase">
                            {mgr.role}
                          </span>
                        </div>

                        {active && (
                          <div className="h-2 w-2 rounded-full bg-violet-600 absolute right-3 top-1/2 -translate-y-1/2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 bg-white/50 dark:bg-slate-900/20">
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                    No hay superiores jerárquicos disponibles para este rol en el sistema.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN SUCURSAL ASIGNADA */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Sucursal Asignada
              </h3>
              {isBranchInherited && (
                <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-md border border-amber-500/10">
                  Heredada del Jefe
                </span>
              )}
            </div>

            <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {Array.isArray(branches) && branches.length > 0 ? (
                branches.map((branch) => {
                  const branchId = branch.id || branch._id;
                  const active = String(formData.branchId) === String(branchId);

                  return (
                    <button
                      type="button"
                      key={branchId}
                      disabled={isBranchInherited}
                      onClick={() => handleChange({ target: { name: "branchId", value: branchId } })}
                      className={`relative rounded-xl flex items-center gap-2.5 border px-3 py-3 text-left transition-all duration-150 ${
                        active
                          ? "bg-violet-500/10 border-violet-500/40"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      } ${
                        isBranchInherited
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-slate-50 dark:hover:bg-slate-850"
                      }`}
                    >
                      <Building2
                        size={14}
                        className={active ? "text-violet-600 dark:text-violet-400" : "text-slate-400"}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                          {branch.name}
                        </h4>
                      </div>
                      {active && <Check size={12} className="text-violet-600 dark:text-violet-400 shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full text-xs text-slate-400 dark:text-slate-500 italic py-2">
                  No hay sucursales disponibles en el sistema.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PIE DE PÁGINA (BOTONES DE ACCIÓN) */}
        <FooterModal>
          <div className="flex w-full items-center justify-between gap-4">
            <div className="hidden text-xs text-slate-500 sm:block">
              La información será guardada automáticamente en el perfil.
            </div>
            <div className="ml-auto flex items-center gap-3">
              <ModernButton type="button" text="Cancelar" variant="outline" icon={X} onClick={onClose} />
              <SubmitButton text={isEdit ? "Guardar Cambios" : "Registrar Usuario"} loading={loading} />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
