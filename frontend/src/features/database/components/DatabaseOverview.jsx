// modules/database/components/DatabaseOverview.jsx

import { Activity, Cpu, Database, HardDrive } from "lucide-react";

import MetricCard from "@/components/card/MetricCard";

export default function DatabaseOverview({
  health,

  metrics,

  monitoring,
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <MetricCard
        icon={Activity}
        label="Database Status"
        value={health?.status}
        subtext={health?.latency}
        variant="info"
      />

      <MetricCard
        icon={Database}
        label="Database Size"
        value={metrics?.databaseSize}
        subtext={`${metrics?.tables} tables`}
        variant="success"
      />

      <MetricCard
        icon={HardDrive}
        label="Connections"
        value={metrics?.activeConnections}
        subtext="Active PostgreSQL Connections"
        variant="warning"
      />

      <MetricCard
        icon={Cpu}
        label="Node Version"
        value={monitoring?.nodeVersion}
        subtext="Runtime Environment"
        variant="default"
      />
    </div>
  );
}
