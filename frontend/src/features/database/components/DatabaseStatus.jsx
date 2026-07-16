// ========================================
// features/database/components/DatabaseStatus.jsx
// ========================================

import MetricCard from "@/components/card/MetricCard";
import { Activity, Check } from "lucide-react";

export default function DatabaseStatus({ health, loading }) {
  if (!loading && !health) {
    return <p className="text-sm text-muted-foreground p-2">Sin datos disponibles</p>;
  }

  const isGood = health?.status === "good";

  return (
    <MetricCard
      loading={loading}
      icon={isGood ? Check : Activity}
      variant={isGood ? "success" : "warning"}
      title={isGood ? "Sistema Saludable" : "Revisar Estado"}
      value={health?.database}
      className="border border-neutral-200 dark:border-neutral-800 bg-background"
    >
      {/* Detalles adicionales inyectados como children en el espacio inferior */}
      <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2">
        <div>
          <p className="text-muted-foreground text-xs mb-0.5">Latencia</p>
          <p className="text-slate-900 dark:text-slate-100 font-medium">{health?.latency}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs mb-0.5">Versión</p>
          <p className="text-slate-900 dark:text-slate-100 font-medium">
            PostgreSQL {health?.version?.split(" ")[1] || "16"}
          </p>
        </div>
      </div>
    </MetricCard>
  );
}
