export default function AsideGroupTitle({
  title,
  isCollapsed,
}) {
  return (
    <p
      className={`
        text-xs
        font-semibold
        uppercase
        text-slate-500
        dark:text-slate-400
        px-3
        mb-3
        transition-all

        ${isCollapsed ? 'md:hidden' : ''}
      `}
    >
      {title}
    </p>
  );
}