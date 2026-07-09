// ========================================
// features/customers/pages/CustomerPage.jsx
// ========================================

import { useCallback, useState } from "react";

import CustomerDeleteModal from "../components/CustomerDeleteModal";
import CustomerFilters from "../components/CustomerFilters";
import CustomerFormModal from "../components/CustomerFormModal";
import CustomerHeader from "../components/CustomerHeader";
import CustomerLoading from "../components/CustomerLoading";
import CustomerTable from "../components/CustomerTable";

import { useCustomerForm } from "../hooks/useCustomerForm";
import { useCustomers } from "../hooks/useCustomers";
import { useCustomerStats } from "../hooks/useCustomerStats";
// 🌟 Importamos el servicio de sesión para validar el rol
import { getUser } from "@/features/auth/services/session.service";

export default function CustomerPage() {
  // 🌟 Validamos el rol del usuario
  const user = getUser();
  const isAdmin = user?.role === "ADMIN";

  const {
    customers,
    pagination,
    loading,
    filters,
    updateFilters,
    clearFilters,
    refresh,
  } = useCustomers();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
  } = useCustomerForm(refresh);

  const stats = useCustomerStats(customers);

  const handleOpenDelete = (customer) => {
    // 🛡️ Seguridad extra: Si no es admin, ignoramos la acción
    if (!isAdmin) return;
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleDelete = async () => {
    if (!selectedCustomer || !isAdmin) return;

    await remove(selectedCustomer.id);
    handleCloseDelete();
  };

  const handleFilterChange = useCallback(
    (newFilters) => {
      updateFilters({
        ...newFilters,
        page: 1,
      });
    },
    [updateFilters],
  );

  const handleNextPage = () => {
    if (pagination && filters.page < pagination.totalPages) {
      updateFilters({ page: filters.page + 1 });
    }
  };

  const handlePrevPage = () => {
    if (filters.page > 1) {
      updateFilters({ page: filters.page - 1 });
    }
  };

  if (loading) {
    return <CustomerLoading />;
  }

  return (
    <div className="space-y-6">
      <CustomerHeader
        total={stats.totalCustomers}
        active={stats.activeCustomers}
        // 🛡️ Solo permitimos crear si es admin
        onCreate={isAdmin ? openCreate : undefined}
      />

      <CustomerFilters
        filters={filters}
        loading={loading}
        onChange={handleFilterChange}
        onSearch={handleFilterChange}
        onClear={clearFilters}
      />

      <CustomerTable
        customers={customers}
        page={filters.page}
        totalPages={pagination?.totalPages ?? 1}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        // 🛡️ Pasamos la lógica de edición/eliminación limitada
        onEdit={openEdit}
        onDelete={isAdmin ? handleOpenDelete : undefined}
      />

      {/* 🛡️ El modal de formulario también debe protegerse en el onSubmit si fuera necesario */}
      <CustomerFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={save}
        form={form}
        onChange={handleChange}
        loading={saving}
        isEdit={Boolean(form.id)}
      />

      {/* MODAL DE CONFIRMACIÓN */}
      {isAdmin && (
        <CustomerDeleteModal
          open={deleteModalOpen}
          onClose={handleCloseDelete}
          selectedCustomer={selectedCustomer}
          reload={handleDelete}
        />
      )}
    </div>
  );
}
