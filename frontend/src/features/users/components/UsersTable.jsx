// ========================================
// components/UsersTable.jsx
// ========================================

import { ModernButton } from "@/components/buttons/";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { useMemo, useState } from "react";
import UserActions from "./UserActions";
import UserAvatar from "./UserAvatar";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

export default function UsersTable({
  users = [],
  onEdit,
  onToggleStatus,
  onDelete,
  loading,
  page = 1,
  totalPages = 1,
  onPrevPage,
  onNextPage,
}) {
  // El stack maneja la navegación:
  // []           -> Nivel 0: Solo Gerentes (MANAGERS)
  // [manager]    -> Nivel 1: Solo Supervisores del manager seleccionado
  // [mgr, sup]   -> Nivel 2: Solo Empleados del supervisor seleccionado
  const [navigationStack, setNavigationStack] = useState([]);

  const currentTarget = navigationStack[navigationStack.length - 1] || null;
  const currentLevel = navigationStack.length; // 0 = Managers, 1 = Supervisors, 2 = Employees

  // ========================================
  // CONTROL JERÁRQUICO ESTRICTO (SIN ADMINS)
  // ========================================
  const displayedUsers = useMemo(() => {
    // 1. Siempre filtramos y quitamos a los ADMIN de cualquier capa
    const cleanUsers = users.filter((user) => user.role !== "ADMIN");

    // Nivel 0: Mostramos estrictamente los MANAGERS
    if (currentLevel === 0) {
      return cleanUsers.filter((user) => user.role === "MANAGER");
    }

    // Nivel 1 o 2: Desglosamos los subordinados directos del usuario en el stack (excluyendo admins)
    if (currentTarget) {
      return (currentTarget.subordinates || []).filter(
        (user) => user.role !== "ADMIN",
      );
    }

    return [];
  }, [users, currentLevel, currentTarget]);

  // ========================================
  // NAVIGATION HANDLERS
  // ========================================
  const handleDrillDown = (user) => {
    setNavigationStack((prev) => [...prev, user]);
  };

  const handlePopStack = () => {
    setNavigationStack((prev) => prev.slice(0, -1));
  };

  const handleResetStack = () => {
    setNavigationStack([]);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-5">
      {/* BREADCRUMBS MODIFICADOS EN EL ORDEN CORRECTO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            <span
              onClick={handleResetStack}
              className={`transition-colors ${navigationStack.length > 0 ? "cursor-pointer hover:text-violet-600 font-medium" : "text-slate-900 dark:text-white font-semibold"}`}
            >
              Gerentes (Manager)
            </span>
            {navigationStack.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="text-slate-400" />
                <span
                  onClick={() =>
                    setNavigationStack((prev) => prev.slice(0, idx + 1))
                  }
                  className={`transition-colors max-w-[140px] truncate ${idx < navigationStack.length - 1 ? "cursor-pointer hover:text-violet-600 font-medium" : "text-slate-900 dark:text-white font-semibold"}`}
                >
                  {step.role === "MANAGER"
                    ? `Supervisores de ${step.name.split(" ")[0]}`
                    : `Personal de ${step.name.split(" ")[0]}`}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {currentLevel === 0 &&
              "Nivel 1: Lista global de Gerentes de la Sucursal."}
            {currentLevel === 1 &&
              `Nivel 2: Supervisores a cargo de: ${currentTarget?.name}`}
            {currentLevel === 2 &&
              `Nivel 3: Empleados operativos a cargo de: ${currentTarget?.name}`}
          </p>
        </div>

        {currentLevel > 0 && (
          <ModernButton
            text="Volver"
            variant="outline"
            icon={ArrowLeft}
            onClick={handlePopStack}
          />
        )}
      </div>

      {/* GLASSMORPHISM TABLE CONTAINER */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:bg-white/[0.03]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02]" />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {[
                  "Usuario",
                  "Contacto",
                  "Rol",
                  "Sucursal",
                  "Estado",
                  "Último acceso",
                  "Creado",
                  "",
                ].map((item) => (
                  <th
                    key={item}
                    className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-white/40"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className={`${loading ? "opacity-50 pointer-events-none transition-opacity" : ""}`}
            >
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/[0.05] transition-all duration-300 hover:bg-white/[0.03]"
                  >
                    {/* USUARIO */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <UserAvatar user={user} />
                        <div>
                          <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                            {user.name}
                          </h3>
                          <p className="text-xs text-slate-500">
                            @{user.slug || user.email.split("@")[0]}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CONTACTO */}
                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <Mail size={14} className="shrink-0" />
                          <span className="truncate max-w-[180px]">
                            {user.email}
                          </span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Phone size={14} className="shrink-0" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* ROL */}
                    <td className="px-6 py-5">
                      <UserRoleBadge role={user.role} />
                    </td>

                    {/* SUCURSAL */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Building2 size={15} className="shrink-0" />
                        <span className="truncate max-w-[140px]">
                          {user.branch?.name || "Sin sucursal"}
                        </span>
                      </div>
                    </td>

                    {/* ESTADO */}
                    <td className="px-6 py-5">
                      <UserStatusBadge active={user.isActive} />
                    </td>

                    {/* ÚLTIMO ACCESO */}
                    <td className="px-6 py-5">
                      <span className="text-sm text-slate-500">
                        {formatDate(user.lastLogin)}
                      </span>
                    </td>

                    {/* CREADO */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={14} className="shrink-0" />
                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </td>

                    {/* ACCIONES */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {currentLevel < 2 &&
                          user.subordinates &&
                          user.subordinates.length > 0 && (
                            <ModernButton
                              icon={ChevronRight}
                              variant="ghost"
                              text={
                                user.role === "MANAGER"
                                  ? "Ver Supervisores"
                                  : "Ver Empleados"
                              }
                              size="sm"
                              onClick={() => handleDrillDown(user)}
                            />
                          )}
                        <UserActions
                          user={user}
                          onEdit={onEdit}
                          onToggleStatus={onToggleStatus}
                          onDelete={onDelete}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-16 text-center text-sm text-slate-500"
                  >
                    No hay registros asignados en este nivel jerárquico.
                  </td>
                </tr>
              )}
            </tbody>

            {/* ESTRUCTURA TFOOT CORRECTA PARA LA PAGINACIÓN */}
            {currentLevel === 0 && totalPages > 1 && (
              <tfoot>
                <tr>
                  <td colSpan={8} className="p-0">
                    <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-6 py-4 backdrop-blur-md">
                      <div className="text-xs text-slate-400">
                        Página{" "}
                        <span className="font-semibold text-slate-700 dark:text-white">
                          {page}
                        </span>{" "}
                        de{" "}
                        <span className="font-semibold text-slate-700 dark:text-white">
                          {totalPages}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ModernButton
                          icon={ChevronLeft}
                          variant="outline"
                          size="sm"
                          text="Anterior"
                          onClick={onPrevPage}
                          disabled={page <= 1 || loading}
                        />
                        <ModernButton
                          icon={ChevronRight}
                          variant="outline"
                          size="sm"
                          text="Siguiente"
                          onClick={onNextPage}
                          disabled={page >= totalPages || loading}
                          iconPosition="right"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
