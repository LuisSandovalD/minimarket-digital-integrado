const products = [

  "Arroz",
  "Azúcar",
  "Leche",
  "Aceite",

];

export default function LowStockProducts() {

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
        Stock bajo
      </h2>

      <div className="mt-5 space-y-3">

        {products.map((product) => (

          <div
            key={product}
            className="
              rounded-2xl

              bg-slate-100
              dark:bg-slate-800

              px-4
              py-3

              text-sm
              font-medium

              text-slate-700
              dark:text-slate-200
            "
          >
            {product}
          </div>

        ))}

      </div>

    </div>

  );

}