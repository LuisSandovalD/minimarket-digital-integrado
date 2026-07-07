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

export default function CustomerPage() {
  // ========================================
  // HOOK DE CLIENTES (FILTROS Y DATOS)
  // ========================================
  const {
    customers,
    pagination,
    loading,
    filters,
    updateFilters,
    clearFilters,
    refresh,
  } = useCustomers();

  // ========================================
  // ESTADOS LOCALES PARA ELIMINACIÓN
  // ========================================
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ========================================
  // HOOK DE FORMULARIO (CREAR / EDITAR)
  // ========================================
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

  // Estadísticas calculadas en base a los clientes actuales
  const stats = useCustomerStats(customers);

  // ========================================
  // MANEJADORES DE ELIMINACIÓN
  // ========================================
  const handleOpenDelete = (customer) => {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    await remove(selectedCustomer.id);
    handleCloseDelete();
  };

  // ========================================
  // MANEJADORES DE FILTROS (CORREGIDO)
  // ========================================
  const handleFilterChange = useCallback(
    (newFilters) => {
      // Al filtrar, siempre reiniciamos a la página 1 para evitar bugs de desborde
      updateFilters({
        ...newFilters,
        page: 1,
      });
    },
    [updateFilters],
  );

  // ========================================
  // MANEJADORES DE PAGINACIÓN
  // ========================================
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

  // ========================================
  // VISTA DE CARGA
  // ========================================
  if (loading) {
    return <CustomerLoading />;
  }

  // ========================================
  // RENDER COMPONENTE PRINCIPAL
  // ========================================
  return (
    <div className="space-y-6">
      {/* HEADER DE LA SECCIÓN */}
      <CustomerHeader
        total={stats.totalCustomers}
        active={stats.activeCustomers}
        onCreate={openCreate}
      />

      {/* BARRA DE FILTROS Y BÚSQUEDA CORREGIDA */}
      <CustomerFilters
        filters={filters}
        loading={loading}
        onChange={handleFilterChange} // 💡 Cambiado de onSearch a onChange si tu componente lo maneja de forma reactiva
        onSearch={handleFilterChange} // 💡 Mantenemos onSearch por si acaso tu botón lo ejecuta así
        onClear={clearFilters}
      />

      {/* TABLA DE DATOS */}
      <CustomerTable
        customers={customers}
        page={filters.page}
        totalPages={pagination?.totalPages ?? 1}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onEdit={openEdit}
        onDelete={handleOpenDelete}
      />

      {/* MODAL DE CREACIÓN Y EDICIÓN */}
      <CustomerFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={save}
        form={form}
        onChange={handleChange}
        loading={saving}
        isEdit={Boolean(form.id)}
      />

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      <CustomerDeleteModal
        open={deleteModalOpen}
        onClose={handleCloseDelete}
        selectedCustomer={selectedCustomer}
        reload={handleDelete}
      />
    </div>
  );
}
