// modules/database/components/DatabaseMonitoring.jsx

import MetricCard from "@/components/card/MetricCard";

import { Cpu, MemoryStick } from "lucide-react";

import formatBytes from "../utils/formatBytes";
import formatUptime from "../utils/formatUptime";

export default function DatabaseMonitoring({ monitoring }) {
  if (!monitoring) return null;

  return (
    <div className="space-y-5">
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Monitoreo
      </h2>

      <div
        className="
          grid
          grid-cols-1
          gap-4

          md:grid-cols-2
        "
      >
        <MetricCard
          icon={Cpu}
          label="Tiempo Activo"
          value={formatUptime(monitoring.uptime)}
          subtext="Tiempo de ejecución del servidor"
        />

        <MetricCard
          icon={MemoryStick}
          label="Uso de Memoria"
          value={formatBytes(monitoring.memoryUsage?.heapUsed)}
          subtext="Memoria Heap utilizada"
        />
      </div>
    </div>
  );
}
