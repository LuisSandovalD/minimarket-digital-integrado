const sales = [
  {
    id: 1,
    customer: "Juan Pérez",
    total: "S/ 120",
  },

  {
    id: 2,
    customer: "María López",
    total: "S/ 250",
  },
];

export default function RecentSales() {
  return (
    <div
      className="
        rounded-3xl

        border
        border-slate-200/70
        dark:border-slate-800/70

        bg-white/70
        dark:bg-slate-900/70

        p-6

        shadow-sm
        backdrop-blur-xl
      "
    >
      <h2
        className="
          text-lg
          font-semibold

          text-slate-800
          dark:text-white
        "
      >
        Ventas recientes
      </h2>

      <div className="mt-5 space-y-4">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="
              flex
              items-center
              justify-between

              rounded-2xl

              bg-slate-100
              dark:bg-slate-800

              px-4
              py-3
            "
          >
            <span
              className="
                text-sm
                font-medium

                text-slate-700
                dark:text-slate-200
              "
            >
              {sale.customer}
            </span>

            <span
              className="
                text-sm
                font-semibold

                text-emerald-500
              "
            >
              {sale.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
