import { FolderOpen } from "lucide-react";

export default function CategoryEmpty() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-white/10
        bg-white/[0.04]
        py-20
        text-center
        backdrop-blur-2xl
      "
    >
      <div
        className="
          mx-auto
          mb-5
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/[0.05]
        "
      >
        <FolderOpen size={30} />
      </div>

      <h3
        className="
          text-lg
          font-semibold
        "
      >
        No hay categorías
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        Aún no existen categorías registradas.
      </p>
    </div>
  );
}
