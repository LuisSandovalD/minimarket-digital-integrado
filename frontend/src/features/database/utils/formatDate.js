// modules/database/utils/formatDate.js

export default function formatDate(date, locale = "es-PE") {
  if (!date) {
    return "-";
  }

  try {
    return new Date(date).toLocaleString(locale, {
      year: "numeric",

      month: "short",

      day: "numeric",

      hour: "2-digit",

      minute: "2-digit",
    });
  } catch {
    return date;
  }
}
