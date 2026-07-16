import { X } from "lucide-react";

const SIZE_STYLES = {
  sm: {
    wrapper: "px-4 py-3 gap-3",
    icon: "h-9 w-9 rounded-xl",
    iconSize: 18,
    title: "text-base font-bold",
    subtitle: "mt-0.5 text-xs",
    closeBtn: "h-8 w-8 rounded-lg",
    closeSize: 16,
  },
  md: {
    wrapper: "px-5 py-4 gap-3.5",
    icon: "h-11 w-11 rounded-2xl",
    iconSize: 20,
    title: "text-lg font-extrabold",
    subtitle: "mt-0.5 text-sm",
    closeBtn: "h-9 w-9 rounded-xl",
    closeSize: 18,
  },
  lg: {
    wrapper: "px-6 py-5 gap-4",
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
      className={`flex items-center justify-between border-b border-[#d7e0e7] bg-[#f8fbfd] dark:border-[#365d86]/20 dark:bg-[#0f172a] ${s.wrapper}`}
    >
      {/* PANEL IZQUIERDO: CONTENIDO */}
      <div className="flex items-center min-w-0 flex-1 mr-4 gap-inherit" style={{ gap: "inherit" }}>
        {Icon && (
          <div className={`flex shrink-0 items-center justify-center bg-[#274c77] text-white ${s.icon}`}>
            <Icon size={s.iconSize} />
          </div>
        )}

        {/* TEXTO */}
        <div className="min-w-0">
          <h2 className={`truncate text-[#274c77] dark:text-white ${s.title}`}>{title}</h2>
          {subtitle && <p className={`truncate text-[#6096ba] dark:text-[#8fb8d8] ${s.subtitle}`}>{subtitle}</p>}
        </div>
      </div>

      {/* BOTÓN DE CIERRE (Simplificado sin efectos de escala/rotación pesados) */}
      <button
        type="button"
        onClick={onClose}
        className={`flex shrink-0 items-center justify-center border border-[#d7e0e7] bg-white text-[#274c77] hover:bg-red-50 hover:text-red-500 dark:border-[#365d86]/20 dark:bg-[#0f172a] dark:text-[#a3cef1] dark:hover:bg-red-950/20 dark:hover:text-red-400 ${s.closeBtn}`}
      >
        <X size={s.closeSize} />
      </button>
    </div>
  );
}
