export function formatDateISO(dateStr) {
  if (!dateStr) return null;
  // Expecting YYYY-MM-DD from <input type="date">, ensure ISO date string
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  // return date-only ISO (yyyy-mm-dd)
  return d.toISOString().slice(0, 10);
}

export function formatDateReadable(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(d);
}

export function formatCurrency(value, locale = "es-PE", currency = "PEN") {
  const n = Number(value || 0);
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    n,
  );
}
