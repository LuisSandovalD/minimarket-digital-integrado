// ========================================
// features/employees/pages/EmployeePage.jsx
// ========================================

import EmployeeFormModal from "../components/EmployeeFormModal.jsx";
import EmployeeHeader from "../components/EmployeeHeader.jsx";
import EmployeeSearch from "../components/EmployeeSearch.jsx";
import EmployeeTable from "../components/EmployeeTable";

import { useEmployeeFilters } from "../hooks/useEmployeeFilters";
import { useEmployeeForm } from "../hooks/useEmployeeForm";
import { useEmployees } from "../hooks/useEmployees";
import { useEmployeeStats } from "../hooks/useEmployeeStats.js";

import EmployeeLoading from "../components/EmployeeLoading.jsx";

export default function EmployeesPage() {
  const { employees, loading, fetchEmployees } = useEmployees();

  const {
    form,
    handleChange,

    saving,

    modalOpen,

    openCreate,
    openEdit,
    closeModal,

    save,
    remove,
  } = useEmployeeForm(fetchEmployees);

  const { search, setSearch, filteredEmployees } =
    useEmployeeFilters(employees);

  const stats = useEmployeeStats(employees);

  if (loading) {
    return <EmployeeLoading />;
  }

  return (
    <div className="space-y-6">
      <EmployeeHeader
        total={stats.totalEmployees}
        active={stats.activeEmployees}
        onCreate={openCreate}
      />

      <EmployeeSearch value={search} onChange={setSearch} />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={openEdit}
        onDelete={remove}
      />

      <EmployeeFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={save}
        form={form}
        onChange={handleChange}
        loading={saving}
        isEdit={Boolean(form.id)}
      />
    </div>
  );
}
