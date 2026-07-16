// ========================================
// features/movements/pages/MovementsPage.jsx
// ========================================

import MovementFilters from "../components/MovementFilters";
import MovementsHeader from "../components/MovementsHeader";
import MovementsLoading from "../components/MovementsLoading";
import MovementsTable from "../components/MovementsTable";
import useMovements from "../hooks/useMovements";

export default function MovementsPage() {
  const { movements, pagination, loading, filters, updateFilters, nextPage, prevPage, refetch } = useMovements();

  const handleSearch = (values) => {
    updateFilters(values);
  };

  const handleClear = () => {
    updateFilters({
      search: "",
      branchId: "",
      productId: "",
      type: "",
    });
  };

  // Si está cargando (al buscar o paginar), bloquea y recarga toda la página con el loader global
  if (loading) {
    return <MovementsLoading />;
  }

  return (
    <div className="space-y-6 p-6">
      <MovementsHeader movements={movements} onRefresh={refetch} />

      <MovementFilters loading={loading} onSearch={handleSearch} onClear={handleClear} />

      <MovementsTable
        movements={movements}
        page={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 1}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
}
