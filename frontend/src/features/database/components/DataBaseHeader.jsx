import { ModernButton } from "@/components/buttons";
import { PageHeader } from "@/components/data-display";
import {
  CheckCircle2,
  Database,
  Download,
  HardDrive,
  RefreshCw,
  Server,
} from "lucide-react";

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
      description="Monitoreo y gestión de PostgreSQL + Neon en tiempo real"
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
          className="rounded-xl px-4 border border-neutral-200 dark:border-neutral-800 bg-muted/50 dark:bg-muted/20 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-foreground transition-colors"
          text="Actualizar"
          loading={
            loading?.health ||
            loading?.metrics ||
            loading?.monitoring ||
            loading?.refresh
          }
        />
      }
      stats={[
        {
          icon: Server,
          label: "Motor / Servidor",
          value: "PostgreSQL 16",
        },
        {
          icon: HardDrive,
          label: "Proveedor Cloud",
          value: "Neon Tech",
        },
        {
          icon: CheckCircle2,
          label: "Estado Conexión",
          value: "Activo / SSL",
        },
      ]}
      className="mb-8"
    />
  );
}
