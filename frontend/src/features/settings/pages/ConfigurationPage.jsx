// ========================================
// features/configuration/pages/ConfigurationPage.jsx
// ========================================

import { getUser } from "@/features/auth/services/session.service";
import { Navigate } from "react-router-dom";
import AppearanceSection from "../components/AppearanceSection";
import BackupSection from "../components/BackupSection";
import CompanySection from "../components/CompanySection";
import ConfigurationHeader from "../components/ConfigurationHeader";
import ConfigurationLoading from "../components/ConfigurationLoading";
import FinanceSection from "../components/FinanceSection";
import InventorySection from "../components/InventorySection";
import SecuritySection from "../components/SecuritySection";
import { useConfiguration } from "../hooks/useConfiguration";

export default function ConfigurationPage() {
  const user = getUser();
  const isAdmin = user?.role === "ADMIN";

  const { form, loading, saving, errors, updateField, saveConfiguration } =
    useConfiguration();

  // 🛡️ Guard de Seguridad: Redirección inmediata si no es Admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return <ConfigurationLoading />;
  }

  return (
    <div className="space-y-6">
      <ConfigurationHeader
        currency={form.currency}
        sessionTimeout={form.sessionTimeout}
        isBackupEnabled={form.autoBackup}
        onSave={saveConfiguration}
        isSubmitting={saving}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveConfiguration();
        }}
        className="w-full rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/50 dark:bg-transparent backdrop-blur-xl p-6 space-y-10 shadow-sm"
      >
        <CompanySection form={form} updateField={updateField} errors={errors} />
        <AppearanceSection
          form={form}
          updateField={updateField}
          errors={errors}
        />
        <FinanceSection form={form} updateField={updateField} errors={errors} />
        <InventorySection
          form={form}
          updateField={updateField}
          errors={errors}
        />
        <SecuritySection
          form={form}
          updateField={updateField}
          errors={errors}
        />
        <BackupSection form={form} updateField={updateField} errors={errors} />

        <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
          <button
            type="submit"
            disabled={saving}
            className={`w-full md:w-auto md:px-12 rounded-xl bg-slate-950 dark:bg-slate-100 p-3.5 text-sm font-medium text-white dark:text-slate-950 transition-all duration-200 shadow-md ${
              saving
                ? "opacity-50 cursor-not-allowed scale-[0.99]"
                : "hover:opacity-90 active:scale-[0.98]"
            }`}
          >
            {saving
              ? "Guardando cambios en el sistema..."
              : "Guardar todas las configuraciones"}
          </button>
        </div>
      </form>
    </div>
  );
}
