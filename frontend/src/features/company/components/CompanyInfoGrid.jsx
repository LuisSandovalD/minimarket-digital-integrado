import {
  BadgeCheck,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  User2,
} from "lucide-react";

export default function CompanyInfoGrid({ company }) {
  const items = [
    { label: "Nombre Empresarial", value: company?.name, icon: Building2 },
    { label: "Slug", value: company?.slug, icon: BadgeCheck },
    { label: "RUC", value: company?.ruc, icon: ReceiptText },
    { label: "Correo Corporativo", value: company?.email, icon: Mail },
    { label: "Teléfono", value: company?.phone, icon: Phone },
    { label: "Dirección", value: company?.address, icon: MapPin },
    { label: "Sitio Web", value: company?.website, icon: Globe },
    {
      label: "Representante Legal",
      value: company?.legalRepresentative,
      icon: User2,
    },
    { label: "Tax ID", value: company?.taxId, icon: ShieldCheck },
  ];

  return (
    <section className="mt-6 rounded-2xl border border-slate-200/60 bg-white/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-slate-300/80 dark:border-slate-800/60 dark:bg-slate-950/60 dark:hover:border-slate-700/80 md:p-7">
      {/* HEADER */}
      <div className="mb-6 border-b border-slate-100 pb-4 dark:border-slate-900">
        <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Información General
        </h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          Datos corporativos y administrativos de la empresa
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group flex items-start gap-3.5 min-w-0 py-1"
            >
              {/* ICON */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200/40 bg-slate-50/50 text-slate-400 transition-colors duration-300 group-hover:bg-blue-50/50 group-hover:text-blue-500 dark:border-slate-800/40 dark:bg-slate-900/50 dark:text-slate-500 dark:group-hover:bg-blue-950/30 dark:group-hover:text-blue-400">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>

              {/* CONTENT */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400/90 dark:text-slate-500">
                  {item.label}
                </p>
                <div className="break-words text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  {item.value || (
                    <span className="text-slate-400/70 dark:text-slate-600 font-normal italic">
                      No registrado
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
