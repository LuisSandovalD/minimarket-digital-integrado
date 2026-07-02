import { Input } from "@/components/forms/";
import { Building, MapPin, Phone } from "lucide-react";

export default function BranchStep({ form, handleChange }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* NOTA ACLARATORIA INTEGRADA */}
      <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 dark:bg-white/[0.02] dark:border-white/5">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          💡 <strong>Nota:</strong> Tu plan incluye la gestión de una sucursal
          base de manera gratuita. Si dejas estos campos vacíos, el sistema la
          configurará automáticamente como tu <strong>"Casa Matriz"</strong>{" "}
          usando los datos de la empresa.
        </p>
      </div>

      {/* ======================================
          INFORMACIÓN DE LA SUCURSAL
      ====================================== */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Input
            label="Nombre de la Sucursal"
            name="branchName"
            placeholder="Sede Principal / Tienda Central"
            value={form.branchName || ""}
            onChange={handleChange}
            icon={Building}
          />
        </div>

        <div>
          <Input
            label="Código Interno"
            name="branchCode"
            placeholder="MAIN"
            value={form.branchCode || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* ======================================
          DATOS DE CONTACTO
      ====================================== */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <Input
            label="Dirección de la Sede"
            name="branchAddress"
            placeholder="Calle Principal 123"
            value={form.branchAddress || ""}
            onChange={handleChange}
            icon={MapPin}
          />
        </div>

        <div>
          <Input
            label="Teléfono de Contacto"
            name="branchPhone"
            placeholder="999 999 999"
            value={form.branchPhone || ""}
            onChange={handleChange}
            icon={Phone}
          />
        </div>
      </div>

      {/* ======================================
          UBICACIÓN GEOGRÁFICA (Estructura Limpia de 3 Columnas)
      ====================================== */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
        <Input
          label="Distrito / Ciudad"
          name="branchCity"
          placeholder="Lima"
          value={form.branchCity || ""}
          onChange={handleChange}
        />

        <Input
          label="Provincia / Departamento"
          name="branchState"
          placeholder="Lima"
          value={form.branchState || ""}
          onChange={handleChange}
        />

        <Input
          label="País"
          name="branchCountry"
          placeholder="Perú"
          value={form.branchCountry || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
