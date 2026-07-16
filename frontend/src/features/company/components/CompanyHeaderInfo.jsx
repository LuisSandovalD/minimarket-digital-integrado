import ModernButton from "@/components/buttons/ModernButton";
import { Building2, Pencil } from "lucide-react";
import { useState } from "react";

export default function CompanyHeaderInfo({ company, onEdit }) {
  const [imageError, setImageError] = useState(false);
  const companyLogo = company?.logo || null;

  // ==========================================
  // OBTENER URL EVITANDO CACHÉ RESIDUAL
  // ==========================================
  const getLogoUrl = () => {
    if (!companyLogo || typeof companyLogo !== "string" || imageError) return null;

    if (companyLogo.startsWith("data:") || companyLogo.startsWith("blob:")) {
      return companyLogo;
    }

    const separator = companyLogo.includes("?") ? "&" : "?";
    return `${companyLogo}${separator}t=${new Date().getTime()}`;
  };

  const logoUrl = getLogoUrl();
  const showLogo = !!logoUrl;

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-center md:justify-between md:p-6">
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-4">
        {/* LOGO */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
          {showLogo ? (
            <img
              src={logoUrl}
              alt={company?.name || "Empresa"}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2 size={26} strokeWidth={1.8} className="text-slate-500 dark:text-slate-400" />
          )}
        </div>

        {/* INFO */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {company?.name || "Empresa"}
            </h2>

            {company?.isActive && <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />}
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Panel corporativo y gestión empresarial</p>

          {/* META */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {company?.email && <span className="text-xs text-slate-400 dark:text-slate-500">{company.email}</span>}

            {company?.ruc && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                RUC {company.ruc}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex shrink-0 items-center">
        <ModernButton
          text="Editar"
          icon={Pencil}
          variant="secondary"
          onClick={() => onEdit?.(company?.id)}
          className="rounded-xl px-4"
        />
      </div>
    </section>
  );
}
