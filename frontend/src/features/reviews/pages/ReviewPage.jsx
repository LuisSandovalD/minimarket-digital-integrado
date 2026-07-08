// ========================================
// features/reviews/pages/ReviewPage.jsx
// ========================================

import { useState } from "react";
import { useReviewForm } from "../hooks/useReviewForm";
import { useReviewStatistics } from "../hooks/useReviewStatistics";

import { MetricCard } from "@/components/card";
import MyReviewsList from "../components/MyReviewsList";
import ReviewFormModal from "../components/ReviewFormModal";
import ReviewHeader from "../components/ReviewHeader";

import { AlertTriangle, BarChart3, Star } from "lucide-react";

export default function ReviewPage() {
  // 1. Estados y peticiones de las estadísticas generales
  const { statistics, loadingStats, refreshStatistics } = useReviewStatistics();

  // 2. Control del formulario de la reseña propia del usuario
  const {
    review,
    rating,
    comment,
    loading: loadingForm,
    saving,
    error,
    selectRating,
    setComment,
    handleSubmit,
    handleDelete,
  } = useReviewForm(refreshStatistics);

  // 3. Estado de interfaz para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ========================================
  // ACCIONES / ACCIONES DE INTERFAZ
  // ========================================

  const handleOpenForm = () => {
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const response = await handleSubmit();
    if (response.success) {
      setIsModalOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas eliminar tu reseña definitivamente?",
      )
    ) {
      await handleDelete();
    }
  };

  const isPageLoading = loadingStats || loadingForm;
  const userReviewsArray = review ? [review] : [];

  return (
    <div className="space-y-6 transition-all duration-300 ease-in-out">
      {/* ========================================
       * HEADER PRINCIPAL DE SECCIÓN
       * ====================================== */}
      <ReviewHeader
        total={statistics?.total || 0}
        averageRating={statistics?.average || 0}
        pendingResponse={statistics?.pendingResponse || 0}
        onCreate={handleOpenForm}
      />

      {/* ========================================
       * NOTIFICACIÓN DE ERROR ESTILIZADA
       * ====================================== */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50/80 border border-red-200/60 text-red-700 rounded-2xl text-sm backdrop-blur-sm dark:bg-red-950/30 dark:border-red-900/40 dark:text-red-400 animate-in fade-in duration-200">
          <AlertTriangle size={18} className="shrink-0 text-red-500" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* ========================================
       * GRID DE CONTENIDO PRINCIPAL (ASYMMETRIC)
       * ====================================== */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* COLUMNA IZQUIERDA/CENTRO: LISTADO DE MIS RESEÑAS (66% del ancho) */}
        <div className="lg:col-span-8 space-y-6">
          <MyReviewsList
            reviews={userReviewsArray}
            loading={isPageLoading}
            onEdit={handleOpenForm}
            onDelete={handleConfirmDelete}
          />
        </div>

        {/* COLUMNA DERECHA: DISTRIBUCIÓN DE CALIFICACIONES (33% del ancho) */}
        <div className="lg:col-span-4 space-y-6">
          <MetricCard
            icon={BarChart3}
            title="Distribución"
            subtitle="Estrellas"
            description="Frecuencia de puntuaciones otorgadas en la plataforma."
            loading={isPageLoading}
            className="shadow-sm border border-slate-100 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-900/50"
          >
            <div className="space-y-4 mt-4">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = statistics?.distribution?.[star] || 0;
                const total = statistics?.total || 1;
                const percentage = Math.min((count / total) * 100, 100);

                return (
                  <div
                    key={star}
                    className="flex items-center gap-3 text-sm group"
                  >
                    {/* Indicador numérico e Icono */}
                    <div className="flex items-center gap-1 w-10 shrink-0 select-none">
                      <span className="font-semibold text-slate-600 dark:text-slate-400 group-hover:text-amber-500 transition-colors">
                        {star}
                      </span>
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400 transition-transform group-hover:scale-110"
                      />
                    </div>

                    {/* Barra de Progreso Dinámica */}
                    <div className="h-2.5 flex-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Contador de votos totalizado */}
                    <span className="w-8 text-right font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </MetricCard>
        </div>
      </div>

      {/* ========================================
       * MODAL DINÁMICO DE CREACIÓN / EDICIÓN
       * ====================================== */}
      <ReviewFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        rating={rating}
        comment={comment}
        onRatingChange={selectRating}
        onCommentChange={setComment}
        loading={saving}
        isEdit={!!review}
      />
    </div>
  );
}
