import { ShoppingBag } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] text-slate-900 transition-colors duration-500 dark:bg-[#09090b] dark:text-slate-50">
      {/* Luces de fondo decorativas muy sutiles (sin sombras duras) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-slate-100 blur-[128px] dark:bg-slate-900/40"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-slate-100 blur-[128px] dark:bg-slate-900/30"></div>
      </div>

      {/* Card principal limpia (Flat & Border-focused) */}
      <div className="relative z-10 w-[360px] rounded-2xl border border-slate-200/80 bg-white/40 p-8 text-center backdrop-blur-md transition-all dark:border-slate-800/80 dark:bg-zinc-950/40">
        {/* Contenedor del Icono Lucide */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/60 bg-white dark:border-slate-800 dark:bg-zinc-900">
          <ShoppingBag
            className="h-6 w-6 text-slate-800 dark:text-slate-200 animate-pulse"
            strokeWidth={1.5}
          />
        </div>

        {/* Título */}
        <h1 className="mb-2 text-xl font-medium tracking-tight text-slate-900 dark:text-zinc-100">
          Abriendo tu tienda
        </h1>

        {/* Descripción */}
        <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
          Estamos preparando todo para que ingreses a tu minimarket digital.
        </p>

        {/* Loader elegante lineal y minimalista */}
        <div className="flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400/80 dark:bg-zinc-500"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400/80 dark:bg-zinc-500 [animation-delay:0.15s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-600 dark:bg-zinc-300 [animation-delay:0.3s]"></span>
        </div>
      </div>
    </div>
  );
}
