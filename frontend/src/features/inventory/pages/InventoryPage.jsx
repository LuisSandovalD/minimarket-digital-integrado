// ========================================
// features/inventory/pages/InventoryPage.jsx
// ========================================

import { useState } from "react";

import useBranches from "../../branches/hooks/useBranches";
import useCategories from "../../categories/hooks/useCategories";
import { useInventory } from "../hooks/useInventory";

import InventoryFilters from "../components/InventoryFilters";
import InventoryHeader from "../components/InventoryHeader";
import InventoryLoading from "../components/InventoryLoading";
import InventoriesTable from "../components/InventoryTable";
import StockAdjustmentModal from "../components/StockAdjustmentModal";

// ========================================
// PAGE
// ========================================

export default function InventoryPage() {
  // ========================================
  // FILTERS STATE
  // ========================================

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,

    search: "",
    branchId: "",
    categoryId: "",

    stockStatus: "",
    minStock: 5,

    sortBy: "createdAt",
    order: "desc",
  });

  // ========================================
  // EXTERNAL DATA (FOR FILTERS)
  // ========================================

  // Cargamos sucursales y categorías sin filtros restrictivos para poblar los selectores
  const { branches } = useBranches({ limit: 100, isActive: true });
  const { categories } = useCategories();

  // ========================================
  // INVENTORY MAIN HOOK
  // ========================================

  const {
    inventories,
    pagination,
    loading,
    fetching,
    actionLoading,
    executeStockAction,
  } = useInventory(filters);

  // ========================================
  // MODAL STATE
  // ========================================

  const [modal, setModal] = useState({
    isOpen: false,
    type: "ADD",
    item: null,
  });

  // ========================================
  // OPEN MODAL
  // ========================================

  const handleOpenModal = (inventoryId, type) => {
    const selected = inventories.find((item) => item.id === inventoryId);

    setModal({
      isOpen: true,
      type,
      item: selected,
    });
  };

  // ========================================
  // CLOSE MODAL
  // ========================================

  const handleCloseModal = () => {
    setModal({
      isOpen: false,
      type: "ADD",
      item: null,
    });
  };

  // ========================================
  // SEARCH / FILTERS HANDLERS
  // ========================================

  const handleSearch = (values) => {
    setFilters((prev) => ({
      ...prev,
      ...values,
      page: 1, // Resetea a la primera página tras filtrar
    }));
  };

  // ========================================
  // CLEAR FILTERS
  // ========================================

  const handleClear = () => {
    setFilters({
      page: 1,
      limit: 10,

      search: "",
      branchId: "",
      categoryId: "",

      stockStatus: "",
      minStock: 5,

      sortBy: "createdAt",
      order: "desc",
    });
  };

  // ========================================
  // PAGINATION HANDLERS
  // ========================================

  const handleNextPage = () => {
    if (!pagination?.hasNext) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handlePrevPage = () => {
    if (!pagination?.hasPrev) return;

    setFilters((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  // ========================================
  // CHANGE LIMIT
  // ========================================

  const handleLimitChange = (limit) => {
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1,
    }));
  };

  // ========================================
  // SORT
  // ========================================

  const handleSort = (sortBy, order = "asc") => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      order,
      page: 1,
    }));
  };

  // ========================================
  // STOCK ACTION
  // ========================================

  const handleModalSubmit = async (inventoryId, body) => {
    const success = await executeStockAction(inventoryId, modal.type, body);

    if (success) {
      handleCloseModal();
    }
  };

  // ========================================
  // INITIAL LOADING
  // ========================================

  if (loading && inventories.length === 0) {
    return <InventoryLoading />;
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="space-y-6 p-6">
      {/* HEADER METRICS */}
      <InventoryHeader />

      {/* FILTER PANEL */}
      <InventoryFilters
        branches={branches}
        categories={categories}
        loading={loading || fetching}
        onSearch={handleSearch}
        onClear={handleClear}
        globalFilters={filters} // Sincroniza los valores visuales con el estado reactivo
      />

      {/* INVENTORIES DATA TABLE */}
      <div className="overflow-hidden rounded-2xl shadow-sm">
        <div className="overflow-auto">
          <InventoriesTable
            inventories={inventories}
            loading={loading || fetching}
            actionLoading={actionLoading}
            page={pagination?.page ?? 1}
            totalPages={pagination?.totalPages ?? 1}
            total={pagination?.total ?? 0}
            limit={pagination?.limit ?? 10}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            onLimitChange={handleLimitChange}
            onSort={handleSort}
            handleAddStock={(id) => handleOpenModal(id, "ADD")}
            handleRemoveStock={(id) => handleOpenModal(id, "REMOVE")}
            handleDamagedStock={(id) => handleOpenModal(id, "DAMAGED")}
          />
        </div>
      </div>

      {/* STOCK ADJUSTMENT MODAL */}
      <StockAdjustmentModal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
        type={modal.type}
        inventoryItem={modal.item}
        actionLoading={actionLoading}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
