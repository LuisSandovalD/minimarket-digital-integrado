import { useEffect } from "react";

import useSupplierActions from "./useSupplierActions";
import useSupplierFilters from "./useSupplierFilters";
import useSupplierForm from "./useSupplierForm";
import useSupplierLoad from "./useSupplierLoad";

export default function useSupplier() {
  const {
    search,
    setSearch,

    isActive,
    setIsActive,

    page,
    setPage,

    limit,
    setLimit,

    resetFilters,
  } = useSupplierFilters();

  const { suppliers, meta, loading, loadSuppliers } = useSupplierLoad();

  useEffect(() => {
    loadSuppliers({
      search,
      isActive,
      page,
      limit,
    });
  }, [search, isActive, page, limit]);

  const {
    form,
    editingId,

    handleChange,
    handleEdit,

    resetForm,
  } = useSupplierForm();

  const {
    saving,

    handleSubmit,
    handleDelete,
  } = useSupplierActions({
    form,
    editingId,
    resetForm,
    loadSuppliers,
  });

  return {
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

    limit,
    setLimit,

    resetFilters,

    form,
    editingId,

    loadSuppliers,

    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,

    resetForm,
  };
}
