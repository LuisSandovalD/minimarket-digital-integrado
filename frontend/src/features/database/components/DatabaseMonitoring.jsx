import MetricCard from "@/components/card/MetricCard";
import { Cpu, MemoryStick } from "lucide-react";
import formatBytes from "../utils/formatBytes";
import formatUptime from "../utils/formatUptime";

export default function DatabaseMonitoring({ monitoring }) {
  if (!monitoring) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-foreground">Monitoreo</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MetricCard
          icon={Cpu}
          title="Tiempo Activo"
          value={formatUptime(monitoring.uptime)}
          description="Tiempo de ejecución del servidor"
          className="border border-neutral-200 dark:border-neutral-800 bg-background"
        />

        <MetricCard
          icon={MemoryStick}
          title="Uso de Memoria"
          value={formatBytes(monitoring.memoryUsage?.heapUsed)}
          description="Memoria Heap utilizada actualmente"
          className="border border-neutral-200 dark:border-neutral-800 bg-background"
        />
      </div>
    </div>
  );
}
