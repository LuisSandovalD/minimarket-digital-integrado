import { useState } from "react";
import { useInventory } from "../hooks/useInventory";
import InventoryHeader from "../components/InventoryHeader";
import InventoriesTable from "../components/InventoryTable";
import StockAdjustmentModal from "../components/StockAdjustmentModal"; // 1. Importamos el modal

export default function InventoryPage() {
  const {
    inventories,
    loading,
    actionLoading,
    loadInventories,
    executeStockAction, // Asegúrate de que tu hook useInventory exponga una función genérica o individual para procesar los servicios
  } = useInventory();

  // 2. Estado unificado para controlar el Modal
  const [modal, setModal] = useState({
    isOpen: false,
    type: "ADD", // "ADD" | "REMOVE" | "DAMAGED"
    item: null, // El objeto del inventario de la fila clickeada
  });

  // 3. Funciones puentes que se activan al hacer click en los botones de la tabla
  const handleOpenModal = (id, type) => {
    const selectedItem = inventories.find((inv) => inv.id === id);
    setModal({
      isOpen: true,
      type: type,
      item: selectedItem,
    });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, type: "ADD", item: null });
  };

  // 4. Procesador del formulario del modal
  const handleModalSubmit = async (inventoryId, body) => {
    // Aquí ejecutas la petición usando la lógica de tu hook
    // Ejemplo ficticio (puedes adaptarlo a cómo definiste tus funciones en el hook):
    const success = await executeStockAction(inventoryId, modal.type, body);

    if (success) {
      handleCloseModal();
      loadInventories(); // Recargamos la tabla para ver los nuevos números reflejados
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <InventoryHeader onCreate={loadInventories} />

      {/* TABLE */}
      <div className="rounded-2xl overflow-hidden">
        <div className="overflow-auto">
          <InventoriesTable
            inventories={inventories}
            loading={loading}
            actionLoading={actionLoading}
            // Pasamos las funciones que interceptan el click y abren el modal configurado
            handleAddStock={(id) => handleOpenModal(id, "ADD")}
            handleRemoveStock={(id) => handleOpenModal(id, "REMOVE")}
            handleDamagedStock={(id) => handleOpenModal(id, "DAMAGED")}
          />
        </div>
      </div>

      {/* 5. EL MODAL COMPARTIDO */}
      <StockAdjustmentModal
        isOpen={modal.isOpen}
        onClose={handleCloseModal}
        type={modal.type}
        inventoryItem={modal.item}
        onSubmit={handleModalSubmit}
        actionLoading={actionLoading}
      />
    </div>
  );
}
