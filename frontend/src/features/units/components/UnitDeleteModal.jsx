import { deleteUnit } from "../services/unit.service";

export default function UnitDeleteModal({
  open,
  onClose,
  reload,
  selectedUnit,
}) {
  if (!open || !selectedUnit) {
    return null;
  }

  const handleDelete = async () => {
    try {
      await deleteUnit(selectedUnit.id);

      reload();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Eliminar Unidad</h2>

        <p className="mb-4">
          ¿Deseas eliminar la unidad <strong>{selectedUnit.name}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>

          <button onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
