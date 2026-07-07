export default function AsideGroupTitle({ title, isCollapsed }) {
  return (
    <p
      className={`mb-3 px-3 text-xs font-semibold uppercase text-slate-500 transition-all dark:text-slate-400 ${isCollapsed ? "md:hidden" : ""}`}
    >
      {title}
    </p>
  );
}
