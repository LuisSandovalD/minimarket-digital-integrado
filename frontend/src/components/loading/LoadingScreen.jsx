import { ShoppingCart } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8fb] text-slate-900 transition-colors duration-300 dark:bg-[#020617] dark:text-slate-100">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-br from-slate-200/50 to-slate-100/30 blur-3xl dark:from-slate-700/30 dark:to-slate-800/10"></div>
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-tl from-slate-300/40 to-slate-200/20 blur-3xl dark:from-slate-600/20 dark:to-slate-700/5"></div>
      </div>

      {/* Card principal */}
      <div className="relative z-10 w-[340px] rounded-3xl border border-slate-200/70 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-2xl transition-all duration-300 dark:border-slate-700/60 dark:bg-slate-900/70">
        {/* Logo/Icon con animación */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 shadow-lg dark:from-slate-800 dark:to-slate-900 dark:shadow-slate-950/50">
          <ShoppingCart
            className="h-12 w-12 animate-bounce text-slate-800 dark:text-slate-200"
            style={{ animationDuration: "2.5s" }}
            strokeWidth={2}
          />
        </div>

        {/* Título */}
        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Abriendo tu tienda
        </h1>

        {/* Descripción */}
        <p className="mb-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Estamos preparando todo para que ingreses a tu minimarket digital.
        </p>

        {/* Loader elegante */}
        <div className="flex items-center justify-center gap-3">
          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"
            style={{ animationDuration: "1.8s" }}
          ></span>

          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-500 dark:bg-slate-400"
            style={{
              animationDuration: "1.8s",
              animationDelay: "0.25s",
            }}
          ></span>

          <span
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-700 dark:bg-slate-200"
            style={{
              animationDuration: "1.8s",
              animationDelay: "0.5s",
            }}
          ></span>
        </div>

        {/* Texto adicional */}
        <p className="mt-8 text-xs text-slate-500 dark:text-slate-500">
          Por favor espera...
        </p>
      </div>
    </div>
  );
}
