import { Checkbox, Input } from "@/components/forms/";

export default function InventorySection({ form, updateField, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">
        Inventario y Alertas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Checkbox
            label="Notificar cuando haya stock bajo"
            name="notifyLowStock"
            checked={form.notifyLowStock}
            onChange={updateField}
          />
          <Input
            label="Umbral de stock bajo (Unidades mínimo)"
            type="number"
            name="lowStockThreshold"
            value={form.lowStockThreshold}
            onChange={updateField}
            error={errors?.lowStockThreshold}
            disabled={!form.notifyLowStock}
          />
        </div>
        <div className="space-y-3">
          <Checkbox
            label="Notificar vencimiento próximo de productos"
            name="notifyExpiring"
            checked={form.notifyExpiring}
            onChange={updateField}
          />
          <Input
            label="Días de anticipación para alerta de vencimiento"
            type="number"
            name="expiringDaysAlert"
            value={form.expiringDaysAlert}
            onChange={updateField}
            error={errors?.expiringDaysAlert}
            disabled={!form.notifyExpiring}
          />
        </div>
      </div>
    </div>
  );
}
