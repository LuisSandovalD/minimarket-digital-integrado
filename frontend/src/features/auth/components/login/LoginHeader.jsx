import {
  ShieldCheck,
} from "lucide-react";

import {
  HeaderModal,
} from "@/components/modals";

export default function LoginHeader({
  onClose,
}) {
  return (
    <HeaderModal
      title="Iniciar Sesión"
      subtitle="Accede a tu cuenta y administra tu empresa desde un solo lugar."
      icon={ShieldCheck}
      onClose={onClose}
    />
  );
}