// ========================================
// features/database/components/DatabaseOverview.jsx
// ========================================

import MetricCard from "@/components/card/MetricCard";
import { Activity, Cpu, Database, HardDrive } from "lucide-react";

export default function DatabaseOverview({ health, metrics, monitoring }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={Activity}
        title="Database Status"
        value={health?.status}
        description={health?.latency}
        variant="info"
        className="border border-neutral-200 dark:border-neutral-800 bg-background"
      />

      <MetricCard
        icon={Database}
        title="Database Size"
        value={metrics?.databaseSize}
        description={`${metrics?.tables || 0} tablas detectadas`}
        variant="success"
        className="border border-neutral-200 dark:border-neutral-800 bg-background"
      />

      <MetricCard
        icon={HardDrive}
        title="Connections"
        value={metrics?.activeConnections}
        description="Conexiones activas a PostgreSQL"
        variant="warning"
        className="border border-neutral-200 dark:border-neutral-800 bg-background"
      />

      <MetricCard
        icon={Cpu}
        title="Node Version"
        value={monitoring?.nodeVersion}
        description="Entorno de ejecución (Runtime)"
        variant="default"
        className="border border-neutral-200 dark:border-neutral-800 bg-background"
      />
    </div>
  );
}
