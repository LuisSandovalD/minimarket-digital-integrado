import { Select } from "@/components/forms/";
import { useTranslation } from "react-i18next"; // O la librería de i18n que use tu ERP

export default function AppearanceSection({ form, updateField, errors }) {
  const { i18n } = useTranslation();

  // Interceptamos el cambio de idioma para aplicarlo instantáneamente en la UI
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;

    // 1. Ejecuta el updateField nativo del formulario para guardarlo en el estado/DB
    updateField(e);

    // 2. Cambia el idioma en caliente en todo el frontend
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(newLang);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">
        Apariencia y Localización
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Tema de la Interfaz"
          name="theme"
          value={form.theme}
          onChange={updateField}
          error={errors?.theme}
          options={[
            { value: "system", label: "Predeterminado del Sistema" },
            { value: "light", label: "Modo Claro" },
            { value: "dark", label: "Modo Oscuro" },
          ]}
        />
        <Select
          label="Idioma General"
          name="language"
          value={form.language}
          onChange={handleLanguageChange} // 👈 Usamos nuestro interceptor dinámico
          error={errors?.language}
          options={[
            { value: "es", label: "Español (ES)" },
            { value: "en", label: "English (EN)" },
          ]}
        />
        <Select
          label="Moneda Base"
          name="currency"
          value={form.currency}
          onChange={updateField}
          error={errors?.currency}
          options={[
            { value: "PEN", label: "Soles (PEN)" },
            { value: "USD", label: "Dólares (USD)" },
          ]}
        />
      </div>
    </div>
  );
}
