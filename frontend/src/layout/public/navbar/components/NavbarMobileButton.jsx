import { ModernButton } from "@/components/buttons";
import { Menu } from "lucide-react";

export default function NavbarMobileButton({ onClick }) {
  return (
    <ModernButton
      onClick={onClick}
      icon={Menu}
      variant="outline"
      size="sm"
      text=""
      className="md:hidden" // 👈 esto lo oculta en pantallas ≥ 768px
    />
  );
}
