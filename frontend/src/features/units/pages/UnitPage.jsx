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

// 🌟 Importación del servicio de sesión
import { getUser } from "@/features/auth/services/session.service";

export default function UnitPage() {
  const user = getUser();
  const isAdmin = user?.role === "ADMIN";

  const { units, loading, reload, search, clearFilters, page, totalPages, nextPage, prevPage } = useUnits();

  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleCreate = () => {
    if (!isAdmin) return;
    setSelectedUnit(null);
    setOpenForm(true);
  };

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setOpenForm(true);
  };

  const handleDelete = (unit) => {
    if (!isAdmin) return;
    setSelectedUnit(unit);
    setOpenDelete(true);
  };

  if (loading) {
    return <UnitLoading />;
  }

  return (
    <div className="space-y-6">
      {/* 🛡️ Solo el Admin ve la opción de crear */}
      <UnitHeader units={units} onCreate={isAdmin ? handleCreate : undefined} />

      <UnitFilters loading={loading} onSearch={search} onClear={clearFilters} />

      <UnitsTable
        units={units}
        page={page}
        totalPages={totalPages}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onEdit={handleEdit}
        // 🛡️ Solo el Admin puede disparar la eliminación
        onDelete={isAdmin ? handleDelete : undefined}
      />

      {/* Modal para Crear / Editar */}
      <UnitFormModal open={openForm} onClose={() => setOpenForm(false)} reload={reload} selectedUnit={selectedUnit} />

      {/* 🛡️ Solo renderizamos el modal de eliminación si es Admin */}
      {isAdmin && (
        <UnitDeleteModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          reload={reload}
          selectedUnit={selectedUnit}
        />
      )}
    </div>
  );
}
