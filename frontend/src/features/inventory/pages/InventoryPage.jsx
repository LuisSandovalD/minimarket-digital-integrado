// ========================================
// features/inventory/pages/InventoryPage.jsx
// ========================================

import { useState } from "react";

import { useInventory } from "../hooks/useInventory";

import InventoryHeader from "../components/InventoryHeader";

import InventoriesTable from "../components/InventoryTable";

import StockAdjustmentModal from "../components/StockAdjustmentModal";

import InventoryLoading from "../components/InventoryLoading.jsx";

// ========================================
// PAGE
// ========================================

export default function InventoryPage() {
  // ========================================
  // HOOK
  // ========================================

  const {
    inventories,

    loading,

    actionLoading,

    loadInventories,

    executeStockAction,
  } = useInventory();

  // ========================================
  // STATE
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
    const selectedItem = inventories.find(
      (inventory) => inventory.id === inventoryId,
    );

    setModal({
      isOpen: true,

      type,

      item: selectedItem,
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
  // SUBMIT
  // ========================================

  const handleModalSubmit = async (inventoryId, body) => {
    const success = await executeStockAction(inventoryId, modal.type, body);

    if (success) {
      handleCloseModal();

      await loadInventories();
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return <InventoryLoading />;
  }

  return (
    <>
      <div
        className="
          p-6
          space-y-6
        "
      >
        {/* ======================================== */}
        {/* HEADER */}
        {/* ======================================== */}

        <InventoryHeader onCreate={loadInventories} />

        {/* ======================================== */}
        {/* TABLE */}
        {/* ======================================== */}

        <div
          className="
            rounded-2xl
            overflow-hidden
            bg-transparent
            shadow-sm
          "
        >
          <div className="overflow-auto">
            <InventoriesTable
              inventories={inventories}
              loading={loading}
              actionLoading={actionLoading}
              handleAddStock={(id) => handleOpenModal(id, "ADD")}
              handleRemoveStock={(id) => handleOpenModal(id, "REMOVE")}
              handleDamagedStock={(id) => handleOpenModal(id, "DAMAGED")}
            />
          </div>
        </div>

        {/* ======================================== */}
        {/* MODAL */}
        {/* ======================================== */}

        <StockAdjustmentModal
          isOpen={modal.isOpen}
          onClose={handleCloseModal}
          type={modal.type}
          inventoryItem={modal.item}
          onSubmit={handleModalSubmit}
          actionLoading={actionLoading}
        />
      </div>
    </>
  );
}
