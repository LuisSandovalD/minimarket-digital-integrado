// ============================================================================
// company/components/CompanyList.jsx
// VISTA PURA: Renderiza la tarjeta de la empresa delegando estados al padre
// ============================================================================

import CompanyCard from "./CompanyCard";

// Recibe "companies" directamente por props desde la página padre
export default function CompanyList({ companies = [], onEdit }) {
  // Si la colección está vacía tras la carga del padre, mostramos el estado vacío limpio
  if (companies.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 animate-in fade-in duration-300">
        No se encontró información de la empresa.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {companies.map((comp) => (
        <CompanyCard
          key={comp.id || "single-company"}
          company={comp}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
