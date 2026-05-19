export default function UnitActions({
  unit,
  onEdit,
  onDelete
}) {

  return (
    <div className="flex gap-2">

      <button
        onClick={() => onEdit(unit)}
      >
        Editar
      </button>

      <button
        onClick={() => onDelete(unit)}
      >
        Eliminar
      </button>

    </div>
  );

}