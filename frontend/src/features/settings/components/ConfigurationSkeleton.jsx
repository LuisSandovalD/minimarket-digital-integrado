// ========================================
// features/configuration/components/ConfigurationSkeleton.jsx
// ========================================
import { Loader2 } from "lucide-react";

export default function ConfigurationSkeleton() {
  return (
    <div className="w-full min-h-screen px-6 space-y-6 animate-pulse mt-8">
      <div className="h-20 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      <div className="h-[500px] w-full bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    </div>
  );
}
