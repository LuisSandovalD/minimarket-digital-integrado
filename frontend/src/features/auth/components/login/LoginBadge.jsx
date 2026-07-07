import { LockKeyhole } from "lucide-react";

export default function LoginBadge() {
  return (
    <div className="mb-6 inline-flex items-center gap-2 self-center rounded-full border border-[#d7e0e7] bg-[#e7ecef] px-4 py-2 text-xs font-semibold tracking-wide text-[#274c77] dark:border-[#365d86]/20 dark:bg-[#274c77]/20 dark:text-[#a3cef1]">
      <LockKeyhole size={14} />
      Acceso Seguro
    </div>
  );
}
