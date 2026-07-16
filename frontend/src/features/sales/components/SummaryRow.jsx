// ========================================
// features/sales/components/SummaryRow.jsx
// ========================================

export function SummaryRow({ label, value, bold = false }) {
  return (
    <tr className="align-middle">
      {/* Label en la celda izquierda */}
      <td
        className={`
          py-1 text-left text-xs tracking-wide
          ${
            bold ? "text-slate-600 dark:text-slate-300 font-semibold" : "text-slate-500 dark:text-slate-500 font-normal"
          }
        `}
      >
        {label}
      </td>

      {/* Valor en la celda derecha */}
      <td
        className={`
          py-1 text-right tabular-nums
          ${bold ? "text-base font-semibold" : "text-sm font-medium"}
        `}
      >
        {value}
      </td>
    </tr>
  );
}
