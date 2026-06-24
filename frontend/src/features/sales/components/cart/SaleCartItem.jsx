import { ModerButton } from "@/component/buttons";
import { Layers, Minus, Plus, Trash2 } from "lucide-react";

export default function SaleCartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const fmt = (value) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(value || 0));

  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-slate-200/70
        dark:border-slate-800/80
        bg-white
        dark:bg-slate-900/40
        p-4
        shadow-sm
        hover:shadow-md
        hover:border-slate-300
        dark:hover:border-slate-700
        transition-all
        duration-200
      "
    >
      {/* SECCIÓN SUPERIOR: INFO DEL PRODUCTO Y ELIMINAR */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4
            className="
              text-sm
              font-bold
              text-slate-800
              dark:text-slate-200
              truncate
              group-hover:text-blue-600
              dark:group-hover:text-blue-400
              transition-colors
            "
          >
            {item.productName}
          </h4>

          {/* Fila de Meta-datos (Precio Unitario + Stock Restante) */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
              {fmt(item.unitPrice)} c/u
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700/50">
              <Layers size={10} />
              Stock: {item.stock}
            </span>
          </div>
        </div>

        {/* 1. BOTÓN ELIMINAR REFACTORIZADO A MODERBUTTON */}
        <ModerButton
          type="button"
          text=""
          variant="danger"
          icon={Trash2}
          onClick={() => onRemove(item.productId)}
          title="Eliminar del carrito"
          className="shrink-0"
        />
      </div>

      {/* DIVIDER SUTIL */}
      <div className="my-3 border-t border-dashed border-slate-100 dark:border-slate-800" />

      {/* SECCIÓN INFERIOR: CONTROLES DE CANTIDAD Y SUBTOTAL */}
      <div className="flex items-center justify-between">
        {/* Controles de Cantidad */}
        <div
          className="
            flex
            items-center
            gap-1
            bg-slate-50
            dark:bg-slate-950/50
            p-1
            rounded-xl
            border
            border-slate-100
            dark:border-slate-800/60
          "
        >
          {/* 2. BOTÓN DISMINUIR REFACTORIZADO A MODERBUTTON */}
          <ModerButton
            type="button"
            text=""
            variant="ghost"
            icon={Minus}
            onClick={() => onDecrease(item.productId)}
            disabled={item.quantity <= 1}
          />

          <span
            className="
              min-w-[32px]
              text-center
              font-mono
              text-sm
              font-bold
              text-slate-800
              dark:text-slate-200
            "
          >
            {item.quantity}
          </span>

          {/* 3. BOTÓN INCREMENTAR (MANTENIDO) */}
          <ModerButton
            type="button"
            text=""
            variant="primary"
            icon={Plus}
            onClick={() => onIncrease(item.productId)}
            disabled={item.quantity >= item.stock}
          />
        </div>

        {/* Contenedor del Subtotal */}
        <div className="text-right">
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-slate-400
              dark:text-slate-500
            "
          >
            Subtotal
          </p>

          <p
            className="
              font-mono
              text-base
              font-bold
              text-blue-600
              dark:text-blue-400
            "
          >
            {fmt(item.subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
