// modules/database/components/DataBaseHeader.jsx

import { Database, Download, RefreshCw } from "lucide-react";

import { ModernButton } from "@/components/buttons";

import { PageHeader } from "@/components/data-display";

export default function DataBaseHeader({
  onRefresh,

  onCreateBackup,

  loading = {},
}) {
  return (
    <PageHeader
      icon={Database}
      badge="v1.0"
      title="Base de Datos"
      description="
        Monitoreo y gestión
        de PostgreSQL + Neon
        en tiempo real
      "
      action={{
        label: "Crear Backup",

        icon: Download,

        onClick: onCreateBackup,

        variant: "success",

        loading: loading?.backups || loading?.backup,
      }}
      headerActions={
        <ModernButton
          icon={RefreshCw}
          onClick={onRefresh}
          variant="secondary"
          size="md"
          className="
            rounded-xl
            px-4
          "
          text="Actualizar"
          loading={
            loading?.health ||
            loading?.metrics ||
            loading?.monitoring ||
            loading?.refresh
          }
        />
      }
      className="mb-8"
    />
  );
}
