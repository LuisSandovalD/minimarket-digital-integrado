// modules/database/components/DatabaseBranches.jsx

import { GitBranch } from "lucide-react";

import { MetricCard } from "@/components/card/";

export default function DatabaseBranches({ branches }) {
  return (
    <div className="space-y-5">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Ramas de Neon
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4

          md:grid-cols-2

          xl:grid-cols-3
        "
      >
        {branches.map((branch) => (
          <MetricCard
            key={branch.id}
            icon={GitBranch}
            label={branch.name}
            value={branch.current_state}
            subtext={branch.created_at}
            variant={branch.primary ? "success" : "default"}
          >
            <div
              className="
                mt-4
                space-y-1
                text-xs
                text-slate-400
              "
            >
              <p>CPU usada: {branch.cpu_used_sec}s</p>

              <p>Tiempo activo: {branch.active_time_seconds}s</p>
            </div>
          </MetricCard>
        ))}
      </div>
    </div>
  );
}
