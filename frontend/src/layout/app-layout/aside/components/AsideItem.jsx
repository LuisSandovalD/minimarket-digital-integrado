import { Link, useParams } from "react-router-dom";

import AsideBadge from "./AsideBadge";

export default function AsideItem({
  label,
  icon: Icon,
  href,
  badge,
  isActive,
  isCollapsed,
  onClick,
}) {
  const { companySlug } = useParams();

  return (
    <Link
      to={`/${companySlug}/${href}`}
      onClick={onClick}
      className={`
        group

        flex
        items-center
        gap-3

        px-3
        py-3

        rounded-xl

        transition-all
        duration-200

        ${
          isActive
            ? `
              bg-indigo-500
              text-white
              shadow-lg
            `
            : `
              text-slate-600
              dark:text-slate-300

              hover:bg-slate-100
              dark:hover:bg-slate-800
            `
        }

        ${isCollapsed ? "md:justify-center" : ""}
      `}
    >
      {/* ICON */}
      <Icon
        className="
          h-5
          w-5
          flex-shrink-0
        "
      />

      {/* CONTENT */}
      {!isCollapsed && (
        <>
          <span
            className="
              flex-1

              text-sm
              font-medium
            "
          >
            {label}
          </span>

          <AsideBadge value={badge} />
        </>
      )}
    </Link>
  );
}
