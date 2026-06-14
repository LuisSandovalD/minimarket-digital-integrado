import { SkeletonTable } from "@/components/skeletons";
import { useEffect, useState } from "react";
import { getTopProducts } from "../../sales/services/sale.service";

export default function TopProductsReportPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getTopProducts();
        setItems(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) return <SkeletonTable />;

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/[0.06]">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-transparent">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500">
                Producto
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500">
                Cantidad
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr
                key={it.id || it.name}
                className="border-b border-slate-200 dark:border-slate-800"
              >
                <td className="px-6 py-3 text-sm text-slate-900 dark:text-white">
                  {it.productName || it.name}
                </td>
                <td className="px-6 py-3 text-sm text-right">
                  {it.quantity || it.count || 0}
                </td>
                <td className="px-6 py-3 text-sm text-right">
                  {new Intl.NumberFormat("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  }).format(Number(it.total || it.amount || 0))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
