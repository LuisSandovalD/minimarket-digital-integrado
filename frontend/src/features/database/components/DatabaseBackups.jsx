// modules/database/components/DatabaseBackups.jsx

import { Database, Download } from "lucide-react";

import { MetricCard } from "@/components/card/";

export default function DatabaseBackups({ backups = [] }) {
  return (
    <div className="space-y-5">
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Copias de Seguridad
      </h2>

      {/* Estado Vacío */}

      {backups.length === 0 && (
        <MetricCard
          icon={Download}
          label="Backups"
          value="0"
          subtext="No hay copias de seguridad disponibles"
          variant="warning"
        />
      )}

      {/* Lista de Backups */}

      {backups.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-4

            md:grid-cols-2

            xl:grid-cols-3
          "
        >
          {backups.map((backup, index) => (
            <MetricCard
              key={index}
              icon={Database}
              label={backup.name}
              value={`${(backup.size / 1024).toFixed(2)} KB`}
              subtext={new Date(backup.createdAt).toLocaleString()}
              variant="success"
            />
          ))}
        </div>
      )}
    </div>
  );
}
