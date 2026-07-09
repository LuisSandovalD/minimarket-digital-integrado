// ========================================
// features/suppliers/pages/SupplierPage.jsx
// ========================================

import { getUser } from "@/features/auth/services/session.service";
import { useState } from "react";

import SupplierFilters from "../components/SupplierFilters";
import SupplierFormModal from "../components/SupplierFormModal";
import SupplierHeader from "../components/SupplierHeader";
import SupplierLoading from "../components/SupplierLoading";
import SupplierTable from "../components/SupplierTable";

import useSupplier from "../hooks/useSuppliers";

export default function SupplierPage() {
  const user = getUser();
  const canManageSuppliers = ["ADMIN", "MANAGER"].includes(user?.role);

  const {
    suppliers,
    meta,
    loading,
    saving,
    search,
    setSearch,
    isActive,
    setIsActive,
    page,
    setPage,
    form,
    editingId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useSupplier();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenCreate = () => {
    if (!canManageSuppliers) return;
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEdit = (supplier) => {
    if (!canManageSuppliers) return;
    handleEdit(supplier);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setOpenModal(false);
  };

  const handleSaveSupplier = async () => {
    if (!canManageSuppliers) return;
    const success = await handleSubmit();
    if (success) {
      setOpenModal(false);
    }
  };

  const handleSearch = (filters) => {
    setSearch(filters.search);
    setIsActive(filters.isActive);
    setPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setIsActive(undefined);
    setPage(1);
  };

  const total = meta.total;
  const active = suppliers.filter((supplier) => supplier.isActive).length;
  const inactive = suppliers.filter((supplier) => !supplier.isActive).length;

  if (loading) {
    return <SupplierLoading />;
  }

  return (
    <div className="space-y-6 p-6">
      <SupplierHeader
        total={total}
        active={active}
        inactive={inactive}
        // 🛡️ Solo permitimos crear si tiene permisos
        onCreate={canManageSuppliers ? handleOpenCreate : undefined}
      />

      <SupplierFilters
        loading={loading}
        globalFilters={{ search, isActive }}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <SupplierTable
        suppliers={suppliers}
        page={meta.page}
        totalPages={meta.totalPages}
        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
        onNextPage={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
        // 🛡️ Pasamos las acciones solo si tiene permisos
        handleEdit={canManageSuppliers ? handleOpenEdit : undefined}
        handleDelete={canManageSuppliers ? handleDelete : undefined}
      />

      {/* 🛡️ Solo renderizamos el modal si tiene permisos */}
      {canManageSuppliers && (
        <SupplierFormModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleSaveSupplier}
          form={form}
          onChange={handleChange}
          loading={saving}
          isEdit={!!editingId}
        />
      )}
    </div>
  );
}
