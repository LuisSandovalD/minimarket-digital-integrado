// ========================================
// components/users/UserRow.jsx
// ========================================

import {
  Building2,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

import UserAvatar
  from "./UserAvatar";

import UserRoleBadge
  from "./UserRoleBadge";

import UserStatusBadge
  from "./UserStatusBadge";

import UserActions
  from "./UserActions";

export default function UserRow({

  user,

  onEdit,

  onToggleStatus,

  onViewChildren,

}) {

  const formatDate = (
    date
  ) => {

    if (!date)
      return "-";

    return new Date(date)
      .toLocaleDateString(
        "es-PE",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );

  };

  return (

    <tr
      className="
        border-b
        border-slate-100
        transition-all
        duration-300
        hover:bg-slate-50/80

        dark:border-slate-900
        dark:hover:bg-slate-900/30
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

          <UserAvatar
            user={user}
          />

          <div>

            <h3
              className="
                text-sm
                font-semibold
                text-slate-900

                dark:text-slate-100
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

            <span>
              {user.email}
            </span>

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

              <span>
                {user.phone}
              </span>

            </div>

          )}

        </div>

      </td>

      {/* ROLE */}

      <td className="px-6 py-5">

        <UserRoleBadge
          role={user.role}
        />

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

          <span>
            {
              user.branch?.name ||
              "Sin sucursal"
            }
          </span>

        </div>

      </td>

      {/* STATUS */}

      <td className="px-6 py-5">

        <UserStatusBadge
          active={user.isActive}
        />

      </td>

      {/* LOGIN */}

      <td className="px-6 py-5">

        <span
          className="
            text-sm
            text-slate-500
          "
        >
          {
            formatDate(
              user.lastLogin
            )
          }
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

          <span>
            {
              formatDate(
                user.createdAt
              )
            }
          </span>

        </div>

      </td>

      {/* ACTIONS */}

      <td className="px-6 py-5">

        <UserActions
          user={user}
          onEdit={onEdit}
          onToggleStatus={
            onToggleStatus
          }
          onViewChildren={
            onViewChildren
          }
        />

      </td>

    </tr>

  );

}