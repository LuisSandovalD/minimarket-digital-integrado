import { UserCheck, UserPlus, Users } from "lucide-react";

import { PageHeader } from "@/components/data-display";

export default function EmployeeHeader({ total = 0, active = 0, onCreate }) {
  return (
    <PageHeader
      icon={Users}
      badge="Personal"
      title="Gestión de Empleados"
      description="
        Administra empleados,
        información laboral,
        contactos y estado.
      "
      action={{
        label: "Nuevo Empleado",
        icon: UserPlus,
        onClick: onCreate,
      }}
      stats={[
        {
          icon: Users,
          label: "Empleados",
          value: total,
        },

        {
          icon: UserCheck,
          label: "Activos",
          value: active,
        },

        {
          icon: Users,
          label: "Inactivos",
          value: total - active,
        },
      ]}
    />
  );
}
