export default function MetricCard({
  icon: Icon,
  label,
  value,
  subtext,
  variant = "default",
  className = "",
  children,
}) {
  const variants = {
    default: "bg-white/[0.05] border-white/10",
    success: "bg-emerald-500/5 border-emerald-500/20",
    warning: "bg-amber-500/5 border-amber-500/20",
    danger: "bg-rose-500/5 border-rose-500/20",
    info: "bg-blue-500/5 border-blue-500/20",
  };

  return (
    <div
      className={`
        rounded-2xl
        border
        backdrop-blur-xl
        p-5

        transition-all
        duration-300

        hover:shadow-lg
        hover:scale-[1.02]

        ${variants[variant]}
        ${className}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        {/* ICON */}
        {Icon && (
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-xl

              bg-white/10
              backdrop-blur-xl
            "
          >
            <Icon size={20} className="text-slate-600 dark:text-slate-300" />
          </div>
        )}

        {/* CONTENT */}
        <div className="flex-1">
          <p
            className="
              text-xs
              uppercase
              tracking-wider

              text-slate-500
              dark:text-slate-400
            "
          >
            {label}
          </p>

          <h3
            className="
              mt-2
              text-xl
              font-semibold

              text-slate-900
              dark:text-white
            "
          >
            {value}
          </h3>

          {subtext && (
            <p
              className="
                mt-1
                text-xs

                text-slate-500
                dark:text-slate-400
              "
            >
              {subtext}
            </p>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
