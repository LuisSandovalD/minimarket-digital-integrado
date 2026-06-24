import { X } from "lucide-react";

const SIZE_STYLES = {
  sm: {
    wrapper: "px-4 py-3",
    blobTop: "h-24 w-24 -right-6 -top-6",
    blobBottom: "h-16 w-16",
    gap: "gap-3",
    icon: "h-9 w-9 rounded-xl",
    iconSize: 18,
    title: "text-base font-bold",
    subtitle: "mt-0.5 text-xs",
    closeBtn: "h-8 w-8 rounded-lg",
    closeSize: 16,
  },
  md: {
    wrapper: "px-5 py-4",
    blobTop: "h-32 w-32 -right-8 -top-8",
    blobBottom: "h-20 w-20",
    gap: "gap-3.5",
    icon: "h-11 w-11 rounded-2xl",
    iconSize: 20,
    title: "text-lg font-extrabold",
    subtitle: "mt-0.5 text-sm",
    closeBtn: "h-9 w-9 rounded-xl",
    closeSize: 18,
  },
  lg: {
    wrapper: "px-6 py-5",
    blobTop: "h-40 w-40 -right-10 -top-10",
    blobBottom: "h-24 w-24",
    gap: "gap-4",
    icon: "h-14 w-14 rounded-3xl",
    iconSize: 24,
    title: "text-xl font-black",
    subtitle: "mt-1 text-sm",
    closeBtn: "h-11 w-11 rounded-2xl",
    closeSize: 20,
  },
};

export default function HeaderModal({
  title = "Título del Modal",
  subtitle = "Descripción breve",
  icon: Icon,
  size = "md",
  onClose,
}) {
  const s = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <div
      className={`relative overflow-hidden border-b border-[#d7e0e7] bg-gradient-to-r from-[#f8fbfd] via-[#eef4f8] to-[#f8fbfd] dark:border-[#365d86]/20 dark:from-[#0f172a] dark:via-[#13263b] dark:to-[#0f172a] ${s.wrapper}`}
    >
      {/* BACKGROUND EFFECT */}
      <div
        className={`absolute rounded-full bg-[#6096ba]/10 blur-3xl ${s.blobTop}`}
      />

      <div
        className={`absolute bottom-0 left-0 rounded-full bg-[#274c77]/10 blur-2xl ${s.blobBottom}`}
      />

      <div className="relative flex items-center justify-between">
        {/* LEFT */}
        <div className={`flex items-center min-w-0 ${s.gap}`}>
          {Icon && (
            <div
              className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-[#6096ba]/20 bg-gradient-to-br from-[#274c77] via-[#365d86] to-[#6096ba] text-white shadow-lg shadow-[#274c77]/20 ${s.icon}`}
            >
              {/* SHINE */}
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />

              <Icon size={s.iconSize} className="relative z-10" />
            </div>
          )}

          {/* TEXT */}
          <div className="min-w-0">
            <h2
              className={`truncate tracking-tight text-[#274c77] dark:text-white ${s.title}`}
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className={`max-w-md truncate leading-relaxed text-[#6096ba] dark:text-[#8fb8d8] ${s.subtitle}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className={`group flex shrink-0 items-center justify-center border border-[#d7e0e7] bg-white/70 text-[#274c77] shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-[#365d86]/20 dark:bg-[#0f172a]/60 dark:text-[#a3cef1] dark:hover:border-red-900/30 dark:hover:bg-red-950/20 dark:hover:text-red-400 ${s.closeBtn}`}
        >
          <X
            size={s.closeSize}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        </button>
      </div>
    </div>
  );
}
