// ========================================
// components/BranchCard.jsx
// ========================================
// Minimal Premium Card
// Inspired by: Linear, Raycast, Vercel
// ========================================

import {
  Calendar,
  Code,
  Edit2,
  Mail,
  MapPin,
  Phone,
  Power,
  Store,
} from "lucide-react";

import BranchStatusBadge from "./BranchStatusBadge";
import ModernButton from "../../../components/buttons/ModernButton";

// ========================================
// STYLES
// ========================================

const actionButtonStyles = `
  h-9
  w-9
  rounded-xl
  border
  border-white/10
  bg-white/5
  text-white/70
  backdrop-blur-sm
  transition-all
  duration-200
  hover:bg-white/10
  hover:text-white
`;

const infoRowStyles = `
  flex
  items-center
  gap-3
  text-sm
  text-slate-300
`;

const iconContainerStyles = `
  flex
  h-9
  w-9
  items-center
  justify-center
  rounded-xl
  bg-white/[0.04]
  text-slate-400
`;

// ========================================
// COMPONENT
// ========================================

export default function BranchCard({
  branch,
  onEdit,
  onToggleStatus,
}) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "es-PE",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const location =
    branch.city && branch.state
      ? `${branch.city}, ${branch.state}`
      : branch.address?.split(",")[0] ||
        "Sin ubicación";

  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/70
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-xl
        hover:shadow-black/[0.04]

        dark:border-slate-800
        dark:bg-slate-950
        dark:hover:border-slate-700
      "
    >
      {/* ========================================
       * BACKGROUND IMAGE
       * ====================================== */}

      {branch.logo && (
        <div className="absolute inset-0 opacity-[0.06]">
          <img
            src={branch.logo}
            alt={branch.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>
      )}

      {/* ========================================
       * CONTENT
       * ====================================== */}

      <div className="relative z-10 flex h-full flex-col p-6">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            {/* ICON */}

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-700

                dark:bg-slate-900
                dark:text-slate-200
              "
            >
              <Store
                size={22}
                strokeWidth={1.7}
              />
            </div>

            {/* TITLE */}

            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-lg
                  font-medium
                  tracking-tight
                  text-slate-900

                  dark:text-slate-100
                "
              >
                {branch.name}
              </h3>

              {branch.code && (
                <div
                  className="
                    mt-2
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-slate-100
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500

                    dark:bg-slate-900
                    dark:text-slate-400
                  "
                >
                  <Code size={12} />
                  {branch.code}
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            <ModernButton
              text=""
              icon={Edit2}
              variant="warning"
              size="sm"
              onClick={() => onEdit?.(branch)}
              className={actionButtonStyles}
            />

            <ModernButton
              text=""
              icon={Power}
              variant="danger"
              size="sm"
              onClick={() =>
                onToggleStatus?.(branch.id)
              }
              className={`
                ${actionButtonStyles}

                ${
                  branch.isActive
                    ? `
                      text-rose-400
                      hover:border-rose-500/20
                      hover:bg-rose-500/10
                      hover:text-rose-300
                    `
                    : `
                      text-emerald-400
                      hover:border-emerald-500/20
                      hover:bg-emerald-500/10
                      hover:text-emerald-300
                    `
                }
              `}
            />
          </div>
        </div>

        {/* INFO */}

        <div className="mt-8 space-y-4">
          {/* LOCATION */}

          <div className={infoRowStyles}>
            <div className={iconContainerStyles}>
              <MapPin size={16} />
            </div>

            <span className="truncate">
              {location}
            </span>
          </div>

          {/* CONTACT */}

          {(branch.phone || branch.email) && (
            <div className={infoRowStyles}>
              <div className={iconContainerStyles}>
                {branch.phone ? (
                  <Phone size={16} />
                ) : (
                  <Mail size={16} />
                )}
              </div>

              <span className="truncate">
                {branch.phone ||
                  branch.email}
              </span>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            border-slate-200/70
            pt-5

            dark:border-slate-800
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-400
            "
          >
            <Calendar size={13} />

            <span>
              {formatDate(branch.createdAt)}
            </span>
          </div>

          <BranchStatusBadge
            active={branch.isActive}
          />
        </div>
      </div>
    </article>
  );
}