import { Checkbox, Input } from "@/components/forms/";

export default function FinanceSection({ form, updateField, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">
        Impuestos y Finanzas
      </h2>
      <div className="max-w-md space-y-4">
        <Input
          label="Tasa de Impuesto / IGV (%)"
          type="number"
          name="taxRate"
          value={form.taxRate}
          onChange={updateField}
          error={errors?.taxRate}
          min="0"
          max="100"
          step="0.01"
        />
        <Checkbox
          label="Habilitar impuesto por defecto en transacciones"
          name="defaultTaxEnabled"
          checked={form.defaultTaxEnabled}
          onChange={updateField}
        />
      </div>
    </div>
  );
}
