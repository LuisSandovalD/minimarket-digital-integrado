import { LogIn, UserPlus } from "lucide-react";

import { ModernButton } from "@/components/buttons";

export default function MobileMenuFooter() {
  return (
    <div className="mt-auto border-t border-[#e7ecef] p-6 dark:border-[#365d86]/20">
      <div className="space-y-3">
        {/* LOGIN */}
        <ModernButton
          text="Iniciar Sesión"
          icon={LogIn}
          variant="outline"
          fullWidth
          className="
            border-[#c7d3dc]
            bg-white/70
            text-[#274c77]
            hover:bg-[#e7ecef]
            hover:border-[#6096ba]

            dark:border-[#365d86]/30
            dark:bg-[#274c77]/10
            dark:text-[#a3cef1]
            dark:hover:bg-[#365d86]/20
          "
        />

        {/* REGISTER */}
        <ModernButton
          text="Registrarse"
          icon={UserPlus}
          fullWidth
          className="
            shadow-lg
            shadow-[#274c77]/20
          "
        />
      </div>
    </div>
  );
}
