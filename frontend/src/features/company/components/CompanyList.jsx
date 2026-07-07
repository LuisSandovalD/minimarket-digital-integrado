// ============================================================================
// company/components/CompanyList.jsx
// VISTA PURA: Renderiza la lista de empresas delegando animaciones a StatsGrid
// ============================================================================

import { StatsGrid } from "@/components/card"; // Ajusta la ruta según tu estructura
import CompanyCard from "./CompanyCard"; // Importamos el componente detallado que me diste

export default function CompanyList({ companies = [], onEdit }) {
  // Si la colección está vacía, mostramos el estado vacío limpio
  if (companies.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-950 animate-in fade-in duration-300">
        No se encontró información de la empresa.
      </div>
    );
  }

  return (
    <StatsGrid
      items={companies}
      animate={false}
      columns={1}
      renderItem={(comp) => <CompanyCard company={comp} onEdit={onEdit} />}
    />
  );
}
