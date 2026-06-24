import { Input } from "@/components/forms/";

export default function CompanySection({ form, updateField, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">
        Empresa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre Empresa"
          name="name" // Mapeo plano directo
          value={form.name || ""}
          onChange={updateField}
          error={errors?.name || errors?.["company.name"]} // Captura el error clásico u objeto Zod
        />
        <Input
          label="RUC de la Empresa"
          name="ruc"
          value={form.ruc || ""}
          onChange={updateField}
          error={errors?.ruc || errors?.["company.ruc"]}
        />
        <Input
          label="Correo Corporativo"
          name="email"
          value={form.email || ""}
          onChange={updateField}
          error={errors?.email || errors?.["company.email"]}
        />
        <Input
          label="URL del Logo"
          name="logo"
          value={form.logo || ""}
          onChange={updateField}
          error={errors?.logo || errors?.["company.logo"]}
          placeholder="https://ejemplo.com/logo.png"
        />
      </div>
    </div>
  );
}
