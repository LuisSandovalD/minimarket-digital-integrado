import { Checkbox, Select } from "@/components/forms/";

export default function BackupSection({ form, updateField, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">
        Copias de Seguridad y Datos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Checkbox
            label="Realizar respaldos automáticos en la nube"
            name="autoBackup"
            checked={form.autoBackup}
            onChange={updateField}
          />
          <Select
            label="Frecuencia del Backup"
            name="backupFrequency"
            value={form.backupFrequency}
            onChange={updateField}
            error={errors?.backupFrequency}
            disabled={!form.autoBackup}
            options={[
              { value: "DAILY", label: "Cada 24 horas (Diario)" },
              { value: "WEEKLY", label: "Cada 7 días (Semanal)" },
              { value: "MONTHLY", label: "Cada mes (Mensual)" },
            ]}
          />
        </div>
        <div className="space-y-3 pt-2">
          <Checkbox
            label="Permitir exportación masiva de reportes y tablas (.xlsx / .csv)"
            name="allowExport"
            checked={form.allowExport}
            onChange={updateField}
          />
          <Checkbox
            label="Permitir importación externa de catálogos e inventarios"
            name="allowImport"
            checked={form.allowImport}
            onChange={updateField}
          />
        </div>
      </div>
    </div>
  );
}
