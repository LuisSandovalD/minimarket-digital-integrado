import { ShieldCheck, UserCog, Layers3, User, Eye } from "lucide-react";

export default function UserAvatar({
  user,
  size = "md",
  showStatus = true,
  showInfo = true,
  showEmail = true,
  className = "",
  onClick,
}) {
  const fullName = user?.name || "Usuario";
  const email = user?.email || "correo@empresa.com";
  const avatar = user?.avatar || null;
  const isActive = user?.isActive ?? true;
  const role = user?.role || "EMPLOYEE";

  const initials = fullName
    ?.trim()
    ?.split(" ")
    ?.map((w) => w[0])
    ?.slice(0, 2)
    ?.join("")
    ?.toUpperCase();

  const roleConfig = {
    ADMIN: {
      icon: ShieldCheck,
      label: "Admin",
      color: "text-violet-600 dark:text-violet-400",
    },
    MANAGER: {
      icon: UserCog,
      label: "Manager",
      color: "text-blue-600 dark:text-blue-400",
    },
    SUPERVISOR: {
      icon: Layers3,
      label: "Supervisor",
      color: "text-amber-600 dark:text-amber-400",
    },
    EMPLOYEE: {
      icon: User,
      label: "Employee",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    VIEWER: {
      icon: Eye,
      label: "Viewer",
      color: "text-slate-600 dark:text-slate-400",
    },
  };

  const currentRole = roleConfig[role] || roleConfig.EMPLOYEE;
  const RoleIcon = currentRole.icon;

  const sizes = {
    sm: { avatar: "w-9 h-9 rounded-xl text-xs", status: "w-2.5 h-2.5" },
    md: { avatar: "w-11 h-11 rounded-xl text-sm", status: "w-3 h-3" },
    lg: { avatar: "w-13 h-13 rounded-2xl text-base", status: "w-3.5 h-3.5" },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-2.5
        transition-opacity duration-200
        hover:opacity-75 active:scale-95
        ${className}
      `}
    >
      {/* AVATAR */}
      <div className="relative flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={fullName}
            className={`${currentSize.avatar} object-cover border border-slate-200 dark:border-slate-700`}
          />
        ) : (
          <div
            className={`
              flex items-center justify-center
              font-semibold text-white
              bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-900
              ${currentSize.avatar}
            `}
          >
            {initials}
          </div>
        )}

        {showStatus && (
          <span
            className={`
              absolute -bottom-0.5 -right-0.5
              rounded-full border border-white dark:border-slate-950
              ${isActive ? "bg-emerald-500" : "bg-slate-300"}
              ${currentSize.status}
            `}
          />
        )}
      </div>

      {/* INFO */}
      {showInfo && (
        <div className="min-w-0 flex-1">
          <p className="text-left truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {fullName}
          </p>

          {showEmail && (
            <p className="truncate text-xs text-slate-500 dark:text-slate-400 leading-tight">
              {email}
            </p>
          )}

          <div className="mt-1.5 flex items-center gap-1">
            <RoleIcon
              size={13}
              className={`flex-shrink-0 ${currentRole.color}`}
            />
            <span className={`text-xs font-medium ${currentRole.color}`}>
              {currentRole.label}
            </span>
          </div>
        </div>
      )}
    </button>
  );
}
