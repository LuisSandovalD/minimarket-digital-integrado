// ========================================
// components/users/UsersTable.jsx
// ========================================

import { Building2, Calendar, ChevronRight, Mail, Phone } from "lucide-react";

import { useMemo, useState } from "react";

import UserAvatar from "./UserAvatar";

import UserRoleBadge from "./UserRoleBadge";

import UserStatusBadge from "./UserStatusBadge";

import UserActions from "./UserActions";

import { ModernButton } from "@/components/buttons/";

import { getSession } from "../../auth/services/session.service";

export default function UsersTable({
  users = [],

  onEdit,

  onToggleStatus,
}) {
  const session = getSession();

  const currentUser = session?.user;

  const currentRole = currentUser?.role;

  const [selectedManagerId, setSelectedManagerId] = useState(null);

  // ========================================
  // FILTER USERS
  // ========================================

  const filteredUsers = useMemo(() => {
    if (currentRole === "ADMIN") {
      if (!selectedManagerId) {
        return users.filter((user) => user.role === "MANAGER");
      }

      return users.filter((user) => user.managerId === selectedManagerId);
    }

    if (currentRole === "MANAGER") {
      if (!selectedManagerId) {
        return users.filter(
          (user) =>
            user.role === "SUPERVISOR" && user.managerId === currentUser.id,
        );
      }

      return users.filter(
        (user) =>
          user.role === "EMPLOYEE" && user.managerId === selectedManagerId,
      );
    }

    if (currentRole === "SUPERVISOR") {
      return users.filter(
        (user) => user.role === "EMPLOYEE" && user.managerId === currentUser.id,
      );
    }

    return [];
  }, [users, currentRole, currentUser, selectedManagerId]);

  // ========================================
  // FORMAT DATE
  // ========================================

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
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
              tracking-tight
              text-slate-900

              dark:text-white
            "
          >
            Jerarquía Usuarios
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Gestión jerárquica de usuarios
          </p>
        </div>

        {selectedManagerId && (
          <ModernButton
            text="Volver"
            variant="outline"
            onClick={() => setSelectedManagerId(null)}
          />
        )}
      </div>

      {/* TABLE */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/[0.05]
          shadow-[0_8px_32px_rgba(0,0,0,0.12)]
          backdrop-blur-2xl

          dark:bg-white/[0.03]
        "
      >
        {/* GLASS EFFECT */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-white/[0.05]
            via-transparent
            to-white/[0.02]
          "
        />

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* HEADER */}

            <thead>
              <tr
                className="
                  border-b
                  border-white/10
                  bg-white/[0.03]
                "
              >
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
                    className="
                      px-6
                      py-4
                      text-left
                      text-[11px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-slate-500

                      dark:text-white/40
                    "
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="
                      border-b
                      border-white/[0.05]
                      transition-all
                      duration-300
                      hover:bg-white/[0.03]
                    "
                >
                  {/* USER */}

                  <td className="px-6 py-5">
                    <div
                      className="
                          flex
                          items-center
                          gap-4
                        "
                    >
                      <UserAvatar user={user} />

                      <div>
                        <h3
                          className="
                              text-sm
                              font-semibold
                              text-slate-800

                              dark:text-white
                            "
                        >
                          {user.name}
                        </h3>

                        <p
                          className="
                              text-xs
                              text-slate-500
                            "
                        >
                          @{user.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}

                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate-600

                            dark:text-slate-300
                          "
                      >
                        <Mail size={14} />

                        <span>{user.email}</span>
                      </div>

                      {user.phone && (
                        <div
                          className="
                              flex
                              items-center
                              gap-2
                              text-sm
                              text-slate-500
                            "
                        >
                          <Phone size={14} />

                          <span>{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* ROLE */}

                  <td className="px-6 py-5">
                    <UserRoleBadge role={user.role} />
                  </td>

                  {/* BRANCH */}

                  <td className="px-6 py-5">
                    <div
                      className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-600

                          dark:text-slate-300
                        "
                    >
                      <Building2 size={15} />

                      <span>{user.branch?.name || "Sin sucursal"}</span>
                    </div>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">
                    <UserStatusBadge active={user.isActive} />
                  </td>

                  {/* LAST LOGIN */}

                  <td className="px-6 py-5">
                    <span
                      className="
                          text-sm
                          text-slate-500
                        "
                    >
                      {formatDate(user.lastLogin)}
                    </span>
                  </td>

                  {/* CREATED */}

                  <td className="px-6 py-5">
                    <div
                      className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-500
                        "
                    >
                      <Calendar size={14} />

                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div
                      className="
                          flex
                          items-center
                          justify-end
                          gap-2
                        "
                    >
                      {(user.role === "MANAGER" ||
                        user.role === "SUPERVISOR") && (
                        <ModernButton
                          icon={ChevronRight}
                          variant="ghost"
                          text="Ver Supervisores"
                          size="sm"
                          onClick={() => setSelectedManagerId(user.id)}
                        />
                      )}

                      <UserActions
                        user={user}
                        onEdit={onEdit}
                        onToggleStatus={onToggleStatus}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
