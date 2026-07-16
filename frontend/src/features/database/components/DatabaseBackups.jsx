import MetricCard from "@/components/card/MetricCard";
import { Database, Download } from "lucide-react";

export default function DatabaseBackups({ backups = [] }) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-foreground">Copias de Seguridad</h2>

      {/* Estado Vacío */}
      {backups.length === 0 && (
        <MetricCard
          icon={Download}
          title="Backups"
          value="0"
          description="No hay copias de seguridad disponibles actualmente"
          variant="warning"
          className="border border-neutral-200 dark:border-neutral-800 bg-background"
        />
      )}

      {/* Lista de Backups */}
      {backups.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {backups.map((backup, index) => (
            <MetricCard
              key={index}
              icon={Database}
              title={backup.name}
              value={`${(backup.size / 1024).toFixed(2)} KB`}
              description={new Date(backup.createdAt || backup.date).toLocaleString()}
              variant="success"
              className="border border-neutral-200 dark:border-neutral-800 bg-background"
            />
          ))}
        </div>
      )}
    </div>
  );
}
