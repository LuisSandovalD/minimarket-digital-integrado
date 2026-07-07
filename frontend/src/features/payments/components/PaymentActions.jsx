import { ModernButton } from "@/components/buttons";
import { Eye } from "lucide-react";

export default function PaymentActions({ payment, onView }) {
  return (
    <ModernButton
      size="sm"
      variant="ghost"
      icon={Eye}
      text="Mostrar"
      onClick={() => onView(payment)}
    />
  );
}
