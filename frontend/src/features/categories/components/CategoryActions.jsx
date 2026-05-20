import { Edit2, Trash2 } from "lucide-react";

export default function CategoryActions({
  onEdit,

  onDelete,
}) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-2xl
          border
          border-amber-500/10
          bg-amber-500/[0.06]
        "
      >
        <Edit2 size={16} />
      </button>

      <button
        onClick={onDelete}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-2xl
          border
          border-red-500/10
          bg-red-500/[0.06]
        "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
