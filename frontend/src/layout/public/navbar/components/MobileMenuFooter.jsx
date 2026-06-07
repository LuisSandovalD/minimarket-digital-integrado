import { ModernButton } from "@/components/buttons";
import { LogIn, UserPlus } from "lucide-react";

export default function MobileMenuFooter({ onOpenLogin, onOpenRegister }) {
  return (
    <div className="mt-auto border-t border-[#e7ecef] p-6 dark:border-[#365d86]/20">
      <div className="space-y-3">
        {/* LOGIN */}
        <ModernButton
          text="Iniciar Sesión"
          icon={LogIn}
          variant="primary"
          fullWidth
          onClick={onOpenLogin}
        />

        {/* REGISTER */}
        <ModernButton
          text="Registrarse"
          icon={UserPlus}
          fullWidth
          variant="secundary"
          onClick={onOpenRegister}
        />
      </div>
    </div>
  );
}
