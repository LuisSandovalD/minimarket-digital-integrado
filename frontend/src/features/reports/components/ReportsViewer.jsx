import { reportsRegistry } from "../constants/reportsRegistry";

export default function ReportsViewer({ reportType, filters, innerRef }) {
  if (!reportType) {
    return null;
  }

  const Component = reportsRegistry[reportType];

  if (!Component) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Tipo de reporte no soportado: {reportType}
      </div>
    );
  }

  return (
    <div ref={innerRef} className="printable">
      <Component filters={filters} />
    </div>
  );
}
