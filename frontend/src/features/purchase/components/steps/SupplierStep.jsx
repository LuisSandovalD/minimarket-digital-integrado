import { Select } from "@/components/forms/"; // Importación requerida para que el componente funcione
import { Building2, FileText, Mail, Phone, User } from "lucide-react";
import { useMemo } from "react";

export default function SupplierStep({ suppliers = [], form, setForm }) {
  const handleSelectSupplier = (e) => {
    const supplierId = e.target.value;
    const selected = suppliers.find((s) => String(s.id) === String(supplierId));

    setForm((prev) => ({
      ...prev,
      supplierId: supplierId,
      supplier: selected || null,
    }));
  };

  // Memorizamos las opciones para evitar cálculos innecesarios en renders secundarios
  const supplierOptions = useMemo(() => {
    return (Array.isArray(suppliers) ? suppliers : []).map((supplier) => {
      const nameDisplay = supplier?.companyName || supplier?.name || supplier?.razonSocial || "Proveedor sin nombre";
      const rucDisplay = supplier?.ruc || supplier?.documentId || "";

      return {
        value: supplier.id,
        label: `${nameDisplay} ${rucDisplay ? `(RUC: ${rucDisplay})` : ""}`,
      };
    });
  }, [suppliers]);

  const currentSupplier = suppliers.find((s) => String(s.id) === String(form?.supplierId));

  return (
    <div className="flex-1 overflow-y-auto bg-transparent custom-scrollbar mt-5">
      <div className="space-y-6">
        {/* SELECTOR PRINCIPAL */}
        <Select
          label="Seleccionar Proveedor o Distribuidor"
          name="supplierId"
          value={form?.supplierId || ""}
          onChange={handleSelectSupplier}
          options={supplierOptions}
          placeholder="-- Elige un proveedor de la lista --"
          icon={Building2}
          required
        />

        {/* DETALLES DINÁMICOS DEL PROVEEDOR */}
        {currentSupplier ? (
          <div className="border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 bg-white/60 dark:bg-slate-950/40 backdrop-blur-sm shadow-sm space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-b border-slate-100 dark:border-slate-900/60 pb-2.5 flex items-center gap-2">
              <FileText size={14} />
              Ficha Informativa Comercial
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {/* CONTACTO LEGAL */}
              <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/40 dark:hover:bg-slate-900/30 transition-colors duration-200">
                <User size={16} className="mt-0.5 text-slate-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Contacto Legal
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {currentSupplier?.contactName || currentSupplier?.contact || "No especificado"}
                  </p>
                </div>
              </div>

              {/* IDENTIFICACIÓN */}
              <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/40 dark:hover:bg-slate-900/30 transition-colors duration-200">
                <Building2 size={16} className="mt-0.5 text-slate-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Identificación (RUC/DNI)
                  </p>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 truncate font-mono">
                    {currentSupplier?.ruc || currentSupplier?.documentId || "Sin documento"}
                  </p>
                </div>
              </div>

              {/* TELÉFONO */}
              <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/40 dark:hover:bg-slate-900/30 transition-colors duration-200">
                <Phone size={16} className="mt-0.5 text-slate-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Teléfono / Celular
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {currentSupplier?.phone || currentSupplier?.telephone || "Sin teléfono"}
                  </p>
                </div>
              </div>

              {/* CORREO ELECTRÓNICO */}
              <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-100/40 dark:hover:bg-slate-900/30 transition-colors duration-200">
                <Mail size={16} className="mt-0.5 text-slate-400 shrink-0" />
                <div className="min-w-0 w-full">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Correo Electrónico
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                    {currentSupplier?.email || "Sin correo corporativo"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ESTADO VACÍO (PLACEHOLDER) */
          <div className="p-20 text-center border border-dashed border-slate-200/80 dark:border-slate-800/80 rounded-2xl bg-white/30 dark:bg-slate-950/10 backdrop-blur-xs animate-in fade-in duration-300">
            <Building2 size={28} className="mx-auto text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 max-w-sm mx-auto leading-relaxed">
              Por favor, selecciona un proveedor válido para cargar la Ficha Comercial y poder continuar con la orden.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
