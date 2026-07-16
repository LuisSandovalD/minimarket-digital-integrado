export default function CompanyStatus({ company }) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md transition-all duration-300 hover:border-slate-300/80 dark:border-slate-800/60 dark:bg-slate-950/60 dark:hover:border-slate-700/80">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        {/* STATUS */}
        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full transition-all duration-500 ${company?.isActive ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" : "bg-slate-300 dark:bg-slate-700"}`}
          />
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {company?.isActive ? "Empresa activa" : "Empresa inactiva"}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Estado operacional actual</p>
          </div>
        </div>

        {/* PLAN */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
            Suscripción
          </span>
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-500/10 dark:bg-blue-500/5 dark:text-blue-400">
            {company?.subscriptionTier || "Free"}
          </div>
        </div>
      </div>
    </section>
  );
}
