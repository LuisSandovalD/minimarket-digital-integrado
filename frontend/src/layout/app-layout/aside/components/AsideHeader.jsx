// ========================================
// layout/app-layout/aside/components/AsideHeader.jsx
// ========================================
import { AsideHeaderSkeleton } from "@/components/skeletons";
import { ShieldCheck } from "lucide-react";

export default function AsideHeader({ isCollapsed, company, isLoading = false }) {
  const companyName = company?.name || "Empresa";
  const companyEmail = company?.email || "contacto@empresa.com";
  const tagLabel = company?.tag || "Sede Central";
  const companyLogo = company?.logo || null; // 🚀 1. Capturamos la propiedad del logo

  const companyInitials =
    companyName
      ?.trim()
      ?.split(" ")
      ?.map((w) => w[0])
      ?.slice(0, 2)
      ?.join("")
      ?.toUpperCase() || "EM";

  const logoSize = isCollapsed ? "w-11 h-11 rounded-xl text-sm" : "w-12 h-12 rounded-xl text-base";
  const statusSize = isCollapsed ? "w-3 h-3" : "w-3.5 h-3.5";

  // ==========================================
  // OBTENER URL DEL LOGO EVITANDO CACHÉ RESIDUAL
  // ==========================================
  const getLogoUrl = () => {
    if (!companyLogo || typeof companyLogo !== "string") return null;

    // Si es local/preview o base64 va directo
    if (companyLogo.startsWith("data:") || companyLogo.startsWith("blob:")) {
      return companyLogo;
    }

    // Si viene del servidor, forzamos refresco dinámico
    const separator = companyLogo.includes("?") ? "&" : "?";
    return `${companyLogo}${separator}t=${new Date().getTime()}`;
  };

  const logoUrl = getLogoUrl();

  // ==========================================
  // RENDER DE SKELETON
  // ==========================================
  if (isLoading) {
    return <AsideHeaderSkeleton isCollapsed={isCollapsed} />;
  }

  // ==========================================
  // RENDER COMPONENTE COMPLETO
  // ==========================================
  return (
    <div className="relative border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/10 blur-3xl rounded-full" />

      <div
        className={`relative flex items-center justify-start text-left gap-2.5 transition-all duration-300 ${isCollapsed ? "justify-center px-2 py-5" : "px-5 py-6"}`}
      >
        {/* LOGO O INICIALES DE LA EMPRESA */}
        <div className="relative flex-shrink-0">
          {logoUrl ? (
            // 🚀 2. Si existe logo válido, renderizamos la imagen de forma limpia
            <img
              src={logoUrl}
              alt={companyName}
              className={`${logoSize} object-cover border border-slate-200 dark:border-slate-800 bg-white`}
            />
          ) : (
            // Fallback original: Iniciales en degradado corporativo
            <div
              className={`flex items-center justify-center font-semibold text-white bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-900 transition-all duration-300 ${logoSize}`}
            >
              {companyInitials}
            </div>
          )}

          {/* Indicador de Estado */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 rounded-full border border-white dark:border-slate-950 bg-emerald-500 transition-all duration-300 ${statusSize}`}
          />
        </div>

        {/* INFORMACIÓN DINÁMICA */}
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="text-left truncate text-sm font-medium text-slate-900 dark:text-slate-100">{companyName}</h1>
            <p className="text-left truncate text-xs text-slate-500 dark:text-slate-400 leading-tight">
              {companyEmail}
            </p>

            {/* Etiqueta formal */}
            <div className="mt-1.5 flex items-center justify-start gap-1">
              <ShieldCheck size={13} className="flex-shrink-0 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">{tagLabel}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
