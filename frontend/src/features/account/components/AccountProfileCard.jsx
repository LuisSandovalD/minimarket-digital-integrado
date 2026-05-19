// ========================================
// features/account/components/AccountProfileCard.jsx
// ========================================

import {

  User2,

} from "lucide-react";

function InfoItem({

  label,
  value,

}) {

  return (

    <div>

      <p
        className="
          text-xs
          text-slate-500
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-sm
          font-semibold

          text-slate-900
          dark:text-white
        "
      >
        {value || "—"}
      </p>

    </div>

  );

}

export default function AccountProfileCard({

  user,
  company,
  branch,

}) {

  return (

    <div
      className="
        rounded-lg
        border

        border-slate-200
        dark:border-slate-800

        bg-white
        dark:bg-slate-900

        p-5
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center

            rounded-2xl

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

                rounded-2xl
                object-cover
              "
            />

          ) : (

            <User2
              className="
                h-7
                w-7

                text-slate-500
              "
            />

          )}

        </div>

        <div className="flex-1">

          <h2
            className="
              text-lg
              font-bold

              text-slate-900
              dark:text-white
            "
          >
            {user?.name || "-"}
          </h2>

          <p
            className="
              mt-1
              text-sm

              text-slate-500
            "
          >
            {user?.email || "-"}
          </p>

          <div
            className="
              mt-4
              grid
              gap-4

              md:grid-cols-2
            "
          >

            <InfoItem
              label="Rol"
              value={user?.role}
            />

            <InfoItem
              label="Empresa"
              value={company?.name}
            />

            <InfoItem
              label="Sucursal"
              value={branch?.name}
            />

            <InfoItem
              label="Estado"
              value={
                user?.isActive
                  ? "Activo"
                  : "Inactivo"
              }
            />

          </div>

        </div>

      </div>

    </div>

  );

}