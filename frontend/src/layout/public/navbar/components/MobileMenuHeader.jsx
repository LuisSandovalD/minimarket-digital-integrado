import { ModernButton } from "@/components/buttons";
import { X } from "lucide-react";
import NavbarBrand from "./NavbarBrand";

export default function MobileMenuHeader({ onClose }) {
  return (
    <div
      className="
        flex items-center justify-between
        border-b border-[#e7ecef] dark:border-[#365d86]/20
        px-6 py-4
      "
    >
      {/* BRAND */}
      <NavbarBrand />

      {/* CLOSE BUTTON */}
      <ModernButton onClick={onClose} icon={X} variant="outline" text="" />
    </div>
  );
}
