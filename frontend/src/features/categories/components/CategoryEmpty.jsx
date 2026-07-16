// ========================================
// components/categories/CategoryEmpty.jsx
// ========================================

import { Table, THead } from "@/components/data-display/";
import { FolderOpen } from "lucide-react";

export default function CategoryEmpty() {
  const columns = [
    { key: "name", label: "Categoría" },
    { key: "description", label: "Descripción" },
    { key: "parent", label: "Padre" },
    { key: "createdAt", label: "Creado" },
    { key: "actions", label: "Acciones" },
  ];

  return (
    <div className="space-y-4">
      <Table>
        <THead columns={columns} />
        <tbody>
          <tr>
            <td colSpan={columns.length} className="px-6 py-16 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
                  <FolderOpen size={24} className="text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  No se encontraron categorías
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  No hay registros que coincidan con los criterios de búsqueda o filtros aplicados.
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
