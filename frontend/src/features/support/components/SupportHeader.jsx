import { PageHeader } from "@/components/data-display/";
import { Input } from "@/components/forms/";
import { CheckCircle, Clock, Layers, LifeBuoy, Plus, Search } from "lucide-react";

export default function SupportHeader({
  search = "",
  onSearchChange,
  stats = { total: 0, pending: 0, resolved: 0 },
  onCreate,
}) {
  return (
    <PageHeader
      // Ícono Principal del Módulo
      icon={LifeBuoy}
      // Badge superior
      badge="Soporte"
      // Título Principal
      title="Centro de Soporte"
      // Descripción
      description="Gestiona los tickets de asistencia técnica, prioridades y canales de comunicación."
      // Acción Principal (Botón Crear)
      action={{
        label: "Nuevo Ticket",
        icon: Plus,
        onClick: onCreate,
      }}
      // Acciones Extra: Aquí inyectamos el Buscador de manera limpia
      headerActions={
        <div className="relative w-full max-w-xs md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar tickets..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      }
      // Mapeo Estándar de Estadísticas
      stats={[
        {
          icon: Layers,
          label: "Totales",
          value: stats.total,
        },
        {
          icon: Clock,
          label: "Pendientes",
          value: stats.pending,
        },
        {
          icon: CheckCircle,
          label: "Resueltos",
          value: stats.resolved,
        },
      ]}
    />
  );
}
