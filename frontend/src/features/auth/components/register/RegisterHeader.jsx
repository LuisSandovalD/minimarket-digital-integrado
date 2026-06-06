import { ShieldCheck } from "lucide-react";

import { HeaderModal } from "@/components/overlays/";

export default function RegisterHeader({ onClose }) {
  return (
    <HeaderModal
      title="Crear Cuenta"
      subtitle="Regístrate ahora y accede a todas las funciones de tu cuenta."
      icon={ShieldCheck}
      onClose={onClose}
    />
  );
}
