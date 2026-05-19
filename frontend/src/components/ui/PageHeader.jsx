// ========================================
// components/layout/PageHeader.jsx
// ========================================

import {
  ArrowUpRight,
} from "lucide-react";

import ModernButton
  from "../buttons/ModernButton";

export default function PageHeader({
  icon: Icon,
  badge,
  title,
  description,
  action,
  stats = [],
  children,
  className = "",

  // ========================================
  // EXTRA ACTIONS
  // ========================================

  headerActions,
}) {

  return (

    <section
      className={`
        relative
        overflow-hidden

        rounded-3xl

        border
        border-white/10

        bg-white/[0.04]

        backdrop-blur-2xl

        shadow-[0_10px_40px_rgba(0,0,0,0.18)]

        ${className}
      `}
    >

      {/* ========================================
       * GLASS GLOW
       * ====================================== */}

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

      <div className="relative z-10">

        {/* ========================================
         * TOP
         * ====================================== */}

        <div
          className="
            flex
            flex-col
            gap-8

            px-6
            py-7

            md:px-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* ========================================
           * LEFT
           * ====================================== */}

          <div className="flex items-start gap-5">

            {/* ICON */}

            {Icon && (

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-white/10

                  bg-white/[0.05]

                  backdrop-blur-xl
                "
              >

                <Icon
                  size={26}
                  strokeWidth={1.7}
                  className="
                    text-slate-700
                    dark:text-slate-200
                  "
                />

              </div>

            )}

            {/* CONTENT */}

            <div className="space-y-4">

              {/* BADGE */}

              {badge && (

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-white/10

                    bg-white/[0.05]

                    px-3
                    py-1

                    backdrop-blur-xl

                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.18em]

                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {badge}
                </div>

              )}

              {/* TITLE */}

              <div>

                <h1
                  className="
                    text-3xl
                    font-semibold
                    tracking-tight

                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  {title}
                </h1>

                {description && (

                  <p
                    className="
                      mt-3
                      max-w-2xl

                      text-sm
                      leading-relaxed

                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    {description}
                  </p>

                )}

              </div>

              {/* EXTRA */}

              {children}

            </div>

          </div>

          {/* ========================================
           * RIGHT ACTIONS
           * ====================================== */}

          {(action || headerActions) && (

            <div
              className="
                flex
                items-center
                gap-3

                shrink-0
              "
            >

              {/* PRIMARY ACTION */}

              {action && (

                <ModernButton
                  icon={action.icon}
                  text={action.label}
                  onClick={action.onClick}
                  variant={
                    action.variant ||
                    "primary"
                  }
                  className="
                    rounded-xl
                    px-5
                  "
                />

              )}

              {/* CUSTOM ACTIONS */}

              {headerActions}

            </div>

          )}

        </div>

        {/* ========================================
         * STATS
         * ====================================== */}

        {stats.length > 0 && (

          <div
            className="
              grid

              border-t
              border-white/10

              sm:grid-cols-2
              xl:grid-cols-3
            "
          >

            {stats.map(

              (
                {
                  icon: StatIcon,
                  label,
                  value,
                },
                index
              ) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4

                    border-b
                    border-white/10

                    px-6
                    py-5

                    sm:border-b-0
                    sm:border-r

                    last:border-r-0
                  "
                >

                  {/* LEFT */}

                  <div className="flex items-center gap-3">

                    {/* ICON */}

                    {StatIcon && (

                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center

                          rounded-xl

                          border
                          border-white/10

                          bg-white/[0.05]

                          backdrop-blur-xl
                        "
                      >

                        <StatIcon
                          size={18}
                          className="
                            text-slate-600
                            dark:text-slate-300
                          "
                        />

                      </div>

                    )}

                    {/* TEXT */}

                    <div>

                      <p
                        className="
                          text-xs
                          uppercase
                          tracking-wider

                          text-slate-400
                        "
                      >
                        {label}
                      </p>

                      <h3
                        className="
                          mt-1
                          text-sm
                          font-medium

                          text-slate-900
                          dark:text-slate-100
                        "
                      >
                        {value}
                      </h3>

                    </div>

                  </div>

                  {/* ARROW */}

                  <ArrowUpRight
                    size={16}
                    className="
                      text-slate-400
                    "
                  />

                </div>

              )

            )}

          </div>

        )}

      </div>

    </section>

  );

}