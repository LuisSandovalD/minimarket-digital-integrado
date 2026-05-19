export default function SalesChart() {

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
        Ventas del mes
      </h2>

      <div
        className="
          mt-6

          flex
          h-64
          items-center
          justify-center

          rounded-2xl

          border
          border-dashed
          border-slate-300
          dark:border-slate-700
        "
      >

        <span
          className="
            text-sm

            text-slate-400
          "
        >
          Aquí irá el gráfico
        </span>

      </div>

    </div>

  );

}