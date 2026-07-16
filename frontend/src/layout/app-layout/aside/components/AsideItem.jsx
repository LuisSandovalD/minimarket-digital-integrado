import { Link, useParams } from "react-router-dom";
import AsideBadge from "./AsideBadge";

export default function AsideItem({ label, icon: Icon, href, badge, isActive, isCollapsed, onClick }) {
  const { companySlug } = useParams();

  return (
    <Link
      to={`/${companySlug}/${href}`}
      onClick={onClick}
      className={`relative group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 border border-indigo-500"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
      } ${isCollapsed ? "md:justify-center" : ""}`}
    >
      {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />}

      <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : ""}`} />

      {!isCollapsed && (
        <>
          <span className="flex-1 text-sm font-medium truncate">{label}</span>

          <AsideBadge value={badge} />
        </>
      )}
    </Link>
  );
}
