export function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8fb] text-slate-900 transition-colors duration-300 dark:bg-[#020617] dark:text-slate-100">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl dark:bg-slate-700/20"></div>
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl dark:bg-slate-600/10"></div>
      </div>

      {/* Card principal */}
      <div className="relative z-10 w-[340px] rounded-3xl border border-slate-200/60 bg-white/70 p-10 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60">
        {/* Logo/Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-slate-100 shadow-inner dark:bg-slate-800">
          <i className="ti ti-shopping-cart text-5xl text-slate-900 dark:text-slate-100 animate-pulse"></i>
        </div>

        {/* Título */}
        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Abriendo tu tienda
        </h1>

        {/* Descripción */}
        <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Estamos preparando todo para que ingreses a tu minimarket digital.
        </p>

        {/* Loader elegante */}
        <div className="flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"></span>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-500 dark:bg-slate-400 [animation-delay:0.15s]"></span>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-700 dark:bg-slate-200 [animation-delay:0.3s]"></span>
        </div>
      </div>
    </div>
  );
}
