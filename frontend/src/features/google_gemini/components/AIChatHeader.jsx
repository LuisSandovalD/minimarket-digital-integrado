import { Bot, Sparkles } from "lucide-react";

export default function AIChatHeader() {
  return (
    <header className="shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-colors duration-200">
      <div className="flex items-center justify-between py-4">
        {/* Información principal */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-muted dark:bg-muted/40">
            <Bot className="h-5 w-5 text-primary" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-foreground">
                Asistente IA
              </h1>
              <span className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Conectado
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Consultas sobre ventas, inventario, compras y rendimiento.
            </p>
          </div>
        </div>

        {/* Indicador IA */}
        <div className="hidden md:flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-muted/50 dark:bg-muted/20 px-3 py-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Análisis inteligente
          </span>
        </div>
      </div>
    </header>
  );
}
