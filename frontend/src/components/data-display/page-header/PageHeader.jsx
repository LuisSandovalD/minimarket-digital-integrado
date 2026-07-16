import { ArrowUpRight } from "lucide-react";
import ModernButton from "../../buttons/ModernButton";

export default function PageHeader({
  icon: Icon,
  badge,
  title,
  description,
  action,
  stats = [],
  children,
  className = "",
  headerActions,
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-lg ${className}`}
    >
      {/* Glass Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02]" />

      <div className="relative z-10">
        {/* Top Header Content */}
        <div className="flex flex-col gap-6 px-6 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side: Icon & Titles */}
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
                <Icon size={24} strokeWidth={1.7} className="text-slate-700 dark:text-slate-200" />
              </div>
            )}

            <div className="space-y-3">
              {badge && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 backdrop-blur-xl text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {badge}
                </div>
              )}

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
                {description && (
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                )}
              </div>

              {children}
            </div>
          </div>

          {/* Right Side: Actions */}
          {(action || headerActions) && (
            <div className="flex items-center gap-3 shrink-0">
              {action && (
                <ModernButton
                  icon={action.icon}
                  text={action.label}
                  onClick={action.onClick}
                  variant={action.variant || "primary"}
                  className="rounded-xl px-4 py-2 text-sm"
                />
              )}
              {headerActions}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {stats.length > 0 && (
          <div className="grid border-t border-white/10 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map(({ icon: StatIcon, label, value }, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 sm:border-b-0 sm:border-r last:border-r-0"
              >
                <div className="flex items-center gap-3">
                  {StatIcon && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">
                      <StatIcon size={16} className="text-slate-600 dark:text-slate-300" />
                    </div>
                  )}

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400">{label}</p>
                    <h3 className="mt-0.5 text-sm font-medium text-slate-900 dark:text-slate-100">{value}</h3>
                  </div>
                </div>

                <ArrowUpRight size={15} className="text-slate-400" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
