import { StatsGrid } from "@/components/card";
import { CheckCircle2, TrendingUp } from "lucide-react";

export default function FlowGrid({ flows = [], columns = 3, animate = true }) {
  // 1. Aplanamos y distribuimos las categorías en elementos individuales para el Grid
  const gridItems = flows.flatMap((flow) => {
    // Procesamos las categorías operativas (features)
    const featuresItems = Object.entries(flow.features || {}).map(([category, items], index) => ({
      id: `${flow.id}-${category}`,
      icon: flow.icon, // Mantiene el ícono principal del flujo
      subtitle: flow.title, // Pone arriba a qué flujo pertenece (ej: "Automatización de Correos")
      title: category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // Nombre limpio de la subcategoría
      description: (
        <div className="grid gap-2 mt-3">
          {items.map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      ),
    }));

    // Si el flujo tiene analíticas/métricas, creamos una tarjeta dedicada exclusivamente a métricas en la grilla
    const statsItem =
      flow.stats?.length > 0
        ? [
            {
              id: `${flow.id}-analytics-card`,
              icon: TrendingUp, // Cambia dinámicamente al ícono de analíticas
              subtitle: flow.title,
              title: "Métricas y Analítica",
              description: (
                <div className="grid grid-cols-1 gap-2.5 mt-3">
                  {flow.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between rounded-xl border border-border/50 bg-background/40 p-2.5"
                    >
                      <div className="text-xs text-muted-foreground pr-2 font-medium leading-tight">{stat.label}</div>
                      <div className="text-sm font-black text-primary shrink-0 bg-primary/5 px-2 py-0.5 rounded-md">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
          ]
        : [];

    // Retorna todo separado por columnas individuales
    return [...featuresItems, ...statsItem];
  });

  return (
    <StatsGrid
      items={gridItems}
      columns={columns}
      animate={animate}
      cardClassName="min-h-[280px] rounded-2xl transition-all duration-200 hover:-translate-y-1 bg-gradient-to-b from-background to-background/60"
    />
  );
}
