// ========================================
// components/ui/FormatDate.jsx
// ========================================

export default function FormatDate({
  date,

  locale = "es-PE",

  options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },

  emptyText = "-",

  className = "",
}) {
  // ========================================
  // VALIDATE DATE
  // ========================================

  if (!date) {
    return <span className={className}>{emptyText}</span>;
  }

  // ========================================
  // FORMAT DATE
  // ========================================

  const formattedDate = new Date(date).toLocaleDateString(locale, options);

  return <span className={className}>{formattedDate}</span>;
}
