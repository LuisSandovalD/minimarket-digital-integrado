import { movements } from "../constants/movements";

export default function MovementsSection() {
  return (
    <section className="py-24 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 px-4 py-1 text-sm font-medium text-slate-600 dark:text-slate-300">
            Movimientos en Tiempo Real
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Control total de entradas y salidas
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Supervisa todos los movimientos de inventario desde un panel
            moderno, rápido y centralizado.
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Producto
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Tipo
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Cantidad
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Almacén
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Fecha
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody>
                {movements.map((movement) => (
                  <tr
                    key={movement.id}
                    className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-5 font-medium text-slate-800 dark:text-slate-200">
                      {movement.product}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          movement.type === "Entrada"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : movement.type === "Salida"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                        }`}
                      >
                        {movement.type}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-700 dark:text-slate-300">
                      {movement.quantity}
                    </td>

                    <td className="px-6 py-5 text-slate-600 dark:text-slate-400">
                      {movement.warehouse}
                    </td>

                    <td className="px-6 py-5 text-slate-500 dark:text-slate-500">
                      {movement.date}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          movement.status === "Completado"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : movement.status === "Pendiente"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                            : "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                        }`}
                      >
                        {movement.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}