import { Checkbox, Input } from "@/components/forms/";

export default function SecuritySection({ form, updateField, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold tracking-wide uppercase text-slate-400 dark:text-slate-500">
        Políticas de Seguridad
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Tiempo de expiración de sesión (Segundos)"
          type="number"
          name="sessionTimeout"
          value={form.sessionTimeout}
          onChange={updateField}
          error={errors?.sessionTimeout}
        />
        <Input
          label="Longitud mínima requerida de contraseña"
          type="number"
          name="passwordMinLength"
          value={form.passwordMinLength}
          onChange={updateField}
          error={errors?.passwordMinLength}
        />
        <Input
          label="Límite máximo de intentos de login fallidos"
          type="number"
          name="maxLoginAttempts"
          value={form.maxLoginAttempts}
          onChange={updateField}
          error={errors?.maxLoginAttempts}
        />
        <div className="flex items-center pt-6">
          <Checkbox
            label="Requerir Autenticación de Dos Factores (2FA)"
            name="requireTwoFactor"
            checked={form.requireTwoFactor}
            onChange={updateField}
          />
        </div>
      </div>
    </div>
  );
}
