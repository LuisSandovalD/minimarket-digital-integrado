// ========================================
// components/CompanyHeader.jsx
// ========================================

import { Building2, ShieldCheck, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/data-display/";

export default function CompanyHeader({ onCreate }) {
  return (
    <PageHeader
      icon={Building2}
      badge="Enterprise Workspace"
      title="Información de la Empresa"
      description="
        Administra la información,
        configuración y actividad
        corporativa desde una plataforma
        centralizada y moderna.
      "
      stats={[
        {
          icon: Building2,
          label: "Gestión",
          value: "Información centralizada",
        },

        {
          icon: ShieldCheck,
          label: "Seguridad",
          value: "Datos protegidos",
        },

        {
          icon: Sparkles,
          label: "Experiencia",
          value: "Acceso rápido",
        },
      ]}
    />
  );
}
