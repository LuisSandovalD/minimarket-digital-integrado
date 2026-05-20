// ========================================
// components/UserHeader.jsx
// ========================================

import { ShieldCheck, Users, UserCog, Eye, Plus, Layers3 } from "lucide-react";

import { PageHeader } from "@/components/ui/";

export default function UserHeader({ onCreate }) {
  return (
    <PageHeader
      icon={Users}
      badge="Gestión de acceso y seguridad"
      title="Administración de usuarios"
      description="
        Controla usuarios, permisos,
        accesos y roles operativos
        dentro de toda la organización
        desde un entorno centralizado.
      "
      action={{
        label: "Crear usuario",
        icon: Plus,
        onClick: onCreate,
      }}
      stats={[
        {
          icon: ShieldCheck,

          label: "Administradores",

          value: "Control total del sistema",
        },

        {
          icon: UserCog,

          label: "Roles operativos",

          value: "Manager • Supervisor • Employee",
        },

        {
          icon: Eye,

          label: "Acceso inteligente",

          value: "Permisos y visibilidad segura",
        },
      ]}
    />
  );
}
