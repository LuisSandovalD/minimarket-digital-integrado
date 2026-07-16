// ========================================
// components/units/UnitsTable.jsx
// ========================================

import { ModernButton } from "@/components/buttons/";
import { Table, TFooter, THead } from "@/components/data-display/";
import {
  Activity,
  Calculator,
  CheckCircle2,
  Hash,
  Pencil,
  Ruler,
  Scale,
  Settings2,
  Trash2,
  XCircle,
} from "lucide-react";
import { UNIT_OPTIONS } from "../utils/unitTypes";

export default function UnitsTable({ units = [], onEdit, onDelete, page = 1, totalPages = 1, onPrevPage, onNextPage }) {
  const columns = [
    {
      key: "name",
      label: (
        <div className="flex items-center gap-2">
          <Scale size={14} />
          Unidad
        </div>
      ),
    },
    {
      key: "abbreviation",
      label: (
        <div className="flex items-center gap-2">
          <Hash size={14} />
          Abreviación
        </div>
      ),
    },
    {
      key: "type",
      label: (
        <div className="flex items-center gap-2">
          <Ruler size={14} />
          Tipo
        </div>
      ),
    },
    {
      key: "conversion",
      label: (
        <div className="flex items-center gap-2">
          <Calculator size={14} />
          Conversión
        </div>
      ),
    },
    {
      key: "status",
      label: (
        <div className="flex items-center gap-2">
          <Activity size={14} />
          Estado
        </div>
      ),
    },
    {
      key: "actions",
      label: (
        <div className="flex items-center gap-2">
          <Settings2 size={14} />
          Acciones
        </div>
      ),
    },
  ];

  const getTypeLabel = (type) => {
    return UNIT_OPTIONS.find((item) => item.value === type)?.label || type;
  };

  const safeUnits = Array.isArray(units) ? units : [];

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Gestión de Unidades</h2>
        <p className="mt-1 text-sm text-slate-500">Administra las unidades de medida del sistema.</p>
      </div>

      {/* TABLE */}
      <Table>
        <THead columns={columns} />

        <tbody>
          {safeUnits.length > 0 ? (
            safeUnits.map((unit) => (
              <tr
                key={unit.id}
                className="border-b border-slate-100 dark:border-slate-800/50 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-white/[0.02]"
              >
                {/* NAME */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70">
                      <Scale className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{unit.name}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Unidad registrada</p>
                    </div>
                  </div>
                </td>

                {/* ABBREVIATION */}
                <td className="px-6 py-5">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-white/80">
                    {unit.abbreviation}
                  </div>
                </td>

                {/* TYPE */}
                <td className="px-6 py-5">
                  <span className="text-sm text-slate-600 dark:text-slate-300">{getTypeLabel(unit.type)}</span>
                </td>

                {/* CONVERSION */}
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {Number(unit.conversion || unit.conversionFactor || 0).toFixed(4)}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  {unit.isActive ? (
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={14} /> Activo
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
                      <XCircle size={14} /> Inactivo
                    </div>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-2">
                    <ModernButton size="sm" variant="ghost" icon={Pencil} text="Editar" onClick={() => onEdit(unit)} />
                    <ModernButton
                      size="sm"
                      variant="danger"
                      icon={Trash2}
                      text="Eliminar"
                      onClick={() => onDelete(unit)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            /* EMPTY STATE */
            <tr>
              <td colSpan={6} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                    <Scale className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    No hay unidades registradas
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Empieza creando tu primera unidad de medida.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>

        {/* CONTROLES DE PAGINACIÓN */}
        {safeUnits.length > 0 && (
          <TFooter page={page} totalPages={totalPages} onPrev={onPrevPage} onNext={onNextPage} />
        )}
      </Table>
    </div>
  );
}
