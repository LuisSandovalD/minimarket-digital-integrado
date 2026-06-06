import CustomerFormModal from "../components/CustomerFormModal";
import CustomerHeader from "../components/CustomerHeader";
import CustomerSearch from "../components/CustomerSearch";
import CustomerTable from "../components/CustomerTable";

import { useCustomerFilters } from "../hooks/useCustomerFilters";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { useCustomers } from "../hooks/useCustomers";
import { useCustomerStats } from "../hooks/useCustomerStats";

import CustomerLoading from "../components/CustomerLoading";

export default function CustomerPage() {
  const { customers, loading, fetchCustomers } = useCustomers();

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
  } = useCustomerForm(fetchCustomers);

  const { search, setSearch, filteredCustomers } =
    useCustomerFilters(customers);

  const stats = useCustomerStats(customers);

  if (loading) {
    return <CustomerLoading />;
  }

  return (
    <div className="space-y-6">
      <CustomerHeader
        total={stats.totalCustomers}
        active={stats.activeCustomers}
        onCreate={openCreate}
      />

      <CustomerSearch value={search} onChange={setSearch} />

      <CustomerTable
        customers={filteredCustomers}
        onEdit={openEdit}
        onDelete={remove}
      />

      <CustomerFormModal
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
