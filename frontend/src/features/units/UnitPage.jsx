import { useState } from "react";

import { useUnits } from "./hooks/useUnits";

import UnitHeader from "./components/UnitHeader";

import UnitsTable from "./components/UnitsTable";

import UnitFormModal from "./components/UnitFormModal";

import UnitDeleteModal from "./components/UnitDeleteModal";

import UnitLoading from "./components/UnitLoading";

export default function UnitPage() {
  const { units, loading, reload } = useUnits();

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
    setSelectedUnit(unit);

    setOpenDelete(true);
  };

  if (loading) {
    return <UnitLoading />;
  }

  return (
    <div className="space-y-4 p-4">
      <UnitHeader onCreate={handleCreate} />

      <UnitsTable units={units} onEdit={handleEdit} onDelete={handleDelete} />

      <UnitFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        reload={reload}
        selectedUnit={selectedUnit}
      />

      <UnitDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        reload={reload}
        selectedUnit={selectedUnit}
      />
    </div>
  );
}
