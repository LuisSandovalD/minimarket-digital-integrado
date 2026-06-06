import { Minus, Plus, Trash2 } from "lucide-react";

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
        rounded-2xl

        border
        border-slate-200/80
        dark:border-slate-800

        bg-white/80
        dark:bg-slate-950/60

        backdrop-blur-xl

        p-4

        transition-all
        duration-200
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h4
            className="
              text-sm
              font-semibold

              text-slate-900
              dark:text-slate-100

              truncate
            "
          >
            {item.productName}
          </h4>

          <p
            className="
              mt-1

              text-xs

              text-slate-500
              dark:text-slate-400
            "
          >
            {fmt(item.unitPrice)} c/u
          </p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.productId)}
          className="
            h-9
            w-9

            rounded-xl

            flex
            items-center
            justify-center

            text-red-500

            hover:bg-red-50
            dark:hover:bg-red-950/30

            transition-colors
          "
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* FOOTER */}

      <div className="flex items-center justify-between mt-4">
        <div
          className="
            flex
            items-center

            gap-2
          "
        >
          <button
            type="button"
            onClick={() => onDecrease(item.productId)}
            className="
              h-8
              w-8

              rounded-xl

              border
              border-slate-200
              dark:border-slate-700

              flex
              items-center
              justify-center

              hover:bg-slate-50
              dark:hover:bg-slate-900

              transition-colors
            "
          >
            <Minus size={14} />
          </button>

          <span
            className="
              min-w-[32px]

              text-center

              text-sm
              font-semibold

              text-slate-900
              dark:text-slate-100
            "
          >
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onIncrease(item.productId)}
            disabled={item.quantity >= item.stock}
            className="
              h-8
              w-8

              rounded-xl

              border
              border-slate-200
              dark:border-slate-700

              flex
              items-center
              justify-center

              hover:bg-slate-50
              dark:hover:bg-slate-900

              disabled:opacity-30
              disabled:pointer-events-none

              transition-colors
            "
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="text-right">
          <p
            className="
              text-xs

              text-slate-500
              dark:text-slate-400
            "
          >
            Subtotal
          </p>

          <p
            className="
              text-sm
              font-bold

              text-slate-900
              dark:text-slate-100
            "
          >
            {fmt(item.subtotal)}
          </p>
        </div>
      </div>
    </div>
  );
}
