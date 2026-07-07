// ========================================
// features/units/pages/UnitPage.jsx
// ========================================

import { useState } from "react";
import { useUnits } from "../hooks/useUnits";

import UnitDeleteModal from "../components/UnitDeleteModal";
import UnitFilters from "../components/UnitFilters";
import UnitFormModal from "../components/UnitFormModal";
import UnitHeader from "../components/UnitHeader";
import UnitLoading from "../components/UnitLoading";
import UnitsTable from "../components/UnitsTable";

export default function UnitPage() {
  const {
    units,
    loading,
    reload,
    search,
    clearFilters,
    page,
    totalPages,
    nextPage,
    prevPage,
  } = useUnits();

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleCreate = () => {
    setSelectedUnit(null);
    setOpenForm(true);
  };

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setOpenForm(true);
  };

  const handleDelete = (unit) => {
    setSelectedUnit(unit); // Setea la unidad antes de abrir el modal
    setOpenDelete(true); // Abre el modal de confirmación
  };

  // ========================================
  // CONTROL DE CARGA (Aquí lo querías)
  // ========================================
  if (loading) {
    return <UnitLoading />;
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header: Muestra contadores de tus datos en tiempo real */}
      <UnitHeader units={units} onCreate={handleCreate} />

      {/* Filtros de Búsqueda */}
      <UnitFilters loading={loading} onSearch={search} onClear={clearFilters} />

      {/* Tabla con carga directa normal */}
      <UnitsTable
        units={units}
        page={page}
        totalPages={totalPages}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para Crear / Editar */}
      <UnitFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        reload={reload}
        selectedUnit={selectedUnit}
      />

      {/* Modal para Confirmar Eliminación */}
      <UnitDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        reload={reload}
        selectedUnit={selectedUnit}
      />
    </div>
  );
}
