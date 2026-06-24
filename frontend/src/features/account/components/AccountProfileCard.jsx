// ========================================
// features/account/components/AccountProfileCard.jsx
// ========================================
import {
  Building2,
  CalendarClock,
  MapPin,
  ShieldAlert,
  User2,
} from "lucide-react";
import {
  formatAccountDateTime,
  getRoleLabel,
  getStatusLabel,
} from "../utils/account.helpers";
// CONECTADO: Acoplamiento modular con el estado global de tu feature
import useAccountProfile from "../hooks/useAccountProfile";

function InfoItem({ icon: Icon, label, value, badgeColor }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
      {Icon && (
        // OPTIMIZACIÓN: Se agregó text-slate-500 dark:text-slate-400 para un balance de contraste óptimo
        <div className="p-2 rounded-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium tracking-wider uppercase text-slate-400 dark:text-slate-500">
          {label}
        </p>
        {badgeColor ? (
          <span
            className={`inline-flex items-center mt-0.5 px-2 py-0.5 text-xs font-semibold rounded-full ${badgeColor}`}
          >
            {value}
          </span>
        ) : (
          <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-full">
            {value || "—"}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AccountProfileCard() {
  // Consumimos el estado del usuario directamente desde el store centralizado
  const { user } = useAccountProfile();

  // NORMALIZACIÓN: Soporta tanto strings planos (EditProfileModal) como sub-objetos comerciales
  const companyName =
    typeof user?.company === "object" ? user?.company?.name : user?.company;
  const branchName =
    typeof user?.branch === "object" ? user?.branch?.name : user?.branch;

  // Definición dinámica de estilos para el estado activo/inactivo
  const statusBadgeColor = user?.isActive
    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/40"
    : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/40";

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Contenedor de Avatar */}
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200/60 dark:border-slate-700">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <User2 className="h-9 w-9 text-slate-400 dark:text-slate-500" />
          )}
          {/* Indicador Online en tiempo real */}
          {user?.isOnline && (
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900 animate-pulse" />
          )}
        </div>

        {/* Bloque de Información Primaria */}
        <div className="flex-1 text-center sm:text-left w-full min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
            ={user?.name || "Usuario Desconocido"}
          </h2>

          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400 truncate">
            {user?.email || "sin-correo@sistema.com"}
          </p>

          {/* Grilla de Atributos del Perfil */}
          <div className="mt-5 grid gap-3 grid-cols-1 md:grid-cols-2">
            <InfoItem
              icon={ShieldAlert}
              label="Rol del Sistema"
              value={getRoleLabel(user?.role)}
            />

            <InfoItem icon={Building2} label="Empresa" value={companyName} />

            <InfoItem
              icon={MapPin}
              label="Sucursal Asignada"
              value={branchName}
            />

            <InfoItem
              label="Estado de Cuenta"
              value={getStatusLabel(user?.isActive)}
              badgeColor={statusBadgeColor}
            />
          </div>

          {/* Sección de Auditoría (Última vez en el sistema) */}
          {user?.lastLogin && (
            <div className="mt-5 pt-4 border-t border-dashed border-slate-100 dark:border-slate-800 flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 dark:text-slate-500">
              <CalendarClock className="h-3.5 w-3.5 shrink-0" />
              <span>Último acceso al sistema:</span>
              <strong className="font-medium text-slate-600 dark:text-slate-400">
                {formatAccountDateTime(user.lastLogin)}
              </strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
