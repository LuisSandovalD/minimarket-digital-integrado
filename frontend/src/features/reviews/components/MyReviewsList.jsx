// ========================================
// features/reviews/components/MyReviewsList.jsx
// ========================================

import { ModernButton } from "@/components/buttons";
import { MetricCard } from "@/components/card";
import { Calendar, Edit2, MessageSquare, Star, Trash2 } from "lucide-react";

export default function MyReviewsList({
  reviews = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  const totalReviews = reviews.length;

  return (
    <MetricCard
      icon={MessageSquare}
      title="Mis Reseñas Publicadas"
      subtitle="Historial"
      value={totalReviews}
      description="Aquí puedes ver, editar o eliminar todas las opiniones y calificaciones que has compartido en la plataforma."
      loading={loading}
    >
      {/* LISTA DE RESEÑAS (RENDEREADA DENTRO DE CHILDREN) */}
      <div className="mt-4 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">
            Aún no has escrito ninguna reseña. ¡Tu opinión nos importa!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id || rev._id}
              className="group relative rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:bg-slate-900"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {/* Bloque Izquierdo: Estrellas y Fecha */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200 dark:text-slate-700"
                        }
                      />
                    ))}
                  </div>

                  {rev.createdAt && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={12} />
                      <span>
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bloque Derecho: Acciones (Editar/Eliminar) */}
                <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <ModernButton
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={() => onEdit(rev)}
                    className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600"
                  />
                  <ModernButton
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => onDelete(rev)}
                    className="h-8 w-8 p-0 text-slate-500 hover:text-red-600"
                  />
                </div>
              </div>

              {/* Comentario de la Reseña */}
              {rev.comment && (
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {rev.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </MetricCard>
  );
}
