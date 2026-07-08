import MetricCard from "@/components/card/MetricCard";
import { GitBranch } from "lucide-react";

export default function DatabaseBranches({ branches = [] }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Ramas de Neon</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch) => (
          <MetricCard
            key={branch.id}
            icon={GitBranch}
            title={branch.name}
            value={branch.current_state}
            description={`Creado el: ${new Date(branch.created_at).toLocaleDateString()}`}
            badge={branch.primary ? "Principal" : null}
            className="border border-neutral-200 dark:border-neutral-800 bg-background"
          >
            <div className="mt-2 space-y-1 text-xs text-muted-foreground border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
              <p className="flex justify-between">
                <span>CPU usada:</span>{" "}
                <span className="font-medium text-foreground">
                  {branch.cpu_used_sec}s
                </span>
              </p>
              <p className="flex justify-between">
                <span>Tiempo activo:</span>{" "}
                <span className="font-medium text-foreground">
                  {branch.active_time_seconds}s
                </span>
              </p>
            </div>
          </MetricCard>
        ))}
      </div>
    </div>
  );
}
