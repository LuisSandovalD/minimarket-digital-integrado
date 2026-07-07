// ========================================
// features/reviews/components/ReviewHeader.jsx
// ========================================

import {
    Clock,
    MessageSquare,
    MessageSquarePlus,
    Plus,
    Star,
} from "lucide-react";

import { PageHeader } from "@/components/data-display/";

export default function ReviewHeader({
  total = 0,
  averageRating = 0,
  pendingResponse = 0,
  onCreate,
}) {
  return (
    <PageHeader
      icon={MessageSquare}
      badge="Reseñas"
      title="Gestión de Reseñas"
      description="Administra los comentarios, calificaciones y el feedback de los clientes sobre los productos o servicios."
      // ========================================
      // MAIN ACTION
      // ========================================
      action={{
        label: "Escribir Reseña",
        icon: Plus,
        onClick: onCreate,
      }}
      // ========================================
      // EXTRA ACTIONS
      // ========================================
      headerActions={
        <div className="flex items-center gap-3">{/* EXTRA ACTIONS */}</div>
      }
      // ========================================
      // STATS
      // ========================================
      stats={[
        {
          icon: MessageSquarePlus,
          label: "Total Reseñas",
          value: total,
        },
        {
          icon: Star,
          label: "Calificación Promedio",
          value:
            typeof averageRating === "number"
              ? averageRating.toFixed(1)
              : averageRating,
        },
        {
          icon: Clock,
          label: "Por Responder",
          value: pendingResponse,
        },
      ]}
    />
  );
}
