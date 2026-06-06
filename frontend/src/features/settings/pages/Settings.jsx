import { useConfiguration } from "../hooks/useConfiguration";

import { PageHeader } from "@/components/data-display/";
import { Building2, Settings } from "lucide-react";

// forms reutilizables
import { Checkbox, Input, Select } from "@/components/forms/";

// loading

export default function ConfigurationPage() {
  const { form, loading, saving, updateField, saveConfiguration } =
    useConfiguration();

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return <div>cargando</div>;
  }

  return (
    <div className="w-full min-h-screen px-6 space-y-6">
      {/* =========================
          HEADER
      ========================= */}
      <PageHeader
        icon={Settings}
        badge="Sistema"
        title="Configuración"
        description="Administra la configuración general del sistema."
        stats={[
          {
            icon: Building2,
            label: "Empresa",
            value: form.companyName || "Sin nombre",
          },
        ]}
      />

      {/* =========================
          FORM
      ========================= */}
      <form
        onSubmit={saveConfiguration}
        className="
          w-full
          rounded-2xl
          border border-white/10
          bg-transparent
          backdrop-blur-xl
          p-6
          space-y-10
        "
      >
        {/* 🏢 EMPRESA */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Empresa
          </h2>

          <Input
            label="Nombre Empresa"
            name="companyName"
            value={form.companyName || ""}
            onChange={updateField}
          />
        </div>

        {/* 🎨 APARIENCIA */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Apariencia
          </h2>

          <Select
            label="Tema"
            name="theme"
            value={form.theme}
            onChange={updateField}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />

          <Select
            label="Idioma"
            name="language"
            value={form.language}
            onChange={updateField}
            options={[
              { value: "es", label: "Español" },
              { value: "en", label: "Inglés" },
            ]}
          />

          <Select
            label="Moneda"
            name="currency"
            value={form.currency}
            onChange={updateField}
            options={[
              { value: "PEN", label: "PEN" },
              { value: "USD", label: "USD" },
            ]}
          />
        </div>

        {/* 💰 IMPUESTOS */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Impuestos
          </h2>

          <Input
            label="IGV (%)"
            type="number"
            name="taxRate"
            value={form.taxRate}
            onChange={updateField}
          />

          <Checkbox
            label="Impuesto por defecto"
            name="defaultTaxEnabled"
            checked={form.defaultTaxEnabled}
            onChange={updateField}
          />
        </div>

        {/* 📦 INVENTARIO */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Inventario
          </h2>

          <Checkbox
            label="Notificar stock bajo"
            name="notifyLowStock"
            checked={form.notifyLowStock}
            onChange={updateField}
          />

          <Input
            label="Umbral stock bajo"
            type="number"
            name="lowStockThreshold"
            value={form.lowStockThreshold}
            onChange={updateField}
          />

          <Checkbox
            label="Notificar vencimiento"
            name="notifyExpiring"
            checked={form.notifyExpiring}
            onChange={updateField}
          />

          <Input
            label="Días alerta vencimiento"
            type="number"
            name="expiringDaysAlert"
            value={form.expiringDaysAlert}
            onChange={updateField}
          />
        </div>

        {/* 🔐 SEGURIDAD */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Seguridad
          </h2>

          <Checkbox
            label="Requerir 2FA"
            name="requireTwoFactor"
            checked={form.requireTwoFactor}
            onChange={updateField}
          />

          <Input
            label="Timeout sesión (segundos)"
            type="number"
            name="sessionTimeout"
            value={form.sessionTimeout}
            onChange={updateField}
          />

          <Input
            label="Min password length"
            type="number"
            name="passwordMinLength"
            value={form.passwordMinLength}
            onChange={updateField}
          />

          <Input
            label="Max intentos login"
            type="number"
            name="maxLoginAttempts"
            value={form.maxLoginAttempts}
            onChange={updateField}
          />
        </div>

        {/* 🔄 SISTEMA */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Sistema
          </h2>

          <Checkbox
            label="Backup automático"
            name="autoBackup"
            checked={form.autoBackup}
            onChange={updateField}
          />

          <Select
            label="Frecuencia backup"
            name="backupFrequency"
            value={form.backupFrequency}
            onChange={updateField}
            options={[
              { value: "DAILY", label: "Diario" },
              { value: "WEEKLY", label: "Semanal" },
            ]}
          />

          <Checkbox
            label="Permitir exportación"
            name="allowExport"
            checked={form.allowExport}
            onChange={updateField}
          />

          <Checkbox
            label="Permitir importación"
            name="allowImport"
            checked={form.allowImport}
            onChange={updateField}
          />
        </div>

        {/* =========================
            BUTTON
        ========================= */}
        <button
          type="submit"
          disabled={saving}
          className="
            w-full
            rounded-xl
            bg-slate-900
            p-3
            text-white
            hover:opacity-90
            transition
          "
        >
          {saving ? "Guardando..." : "Guardar configuración"}
        </button>
      </form>
    </div>
  );
}
