// ========================================
// features/reviews/components/ReviewFormModal.jsx
// ========================================

import { MessageSquare, Star, X } from "lucide-react";

import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

export default function ReviewFormModal({
  open,
  onClose,
  onSubmit,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  loading = false,
  isEdit = false,
}) {
  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      {/* HEADER */}
      <HeaderModal
        title={isEdit ? "Editar Reseña" : "Escribir Reseña"}
        icon={MessageSquare}
        subtitle="Comparte tu opinión y calificación con nosotros."
        onClose={onClose}
      />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="max-h-[72vh] overflow-y-auto space-y-8 px-6 py-6">
          {/* ========================================
           * CALIFICACIÓN Y OPINIÓN
           * ====================================== */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <MessageSquare size={20} />
              <div>
                <h3 className="text-sm font-semibold">Tu Experiencia</h3>
                <p className="text-xs text-slate-500">Ayuda a otros usuarios evaluando el servicio</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Selector de Estrellas Interactivo */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Calificación</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => onRatingChange(star)}
                      className="transition-transform active:scale-95 focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-slate-600 dark:text-slate-400">({rating} de 5)</span>
                </div>
              </div>

              {/* Comentario / Feedback */}
              <Input
                label="Comentario"
                name="comment"
                placeholder="Cuéntanos qué te pareció el producto o servicio..."
                value={comment}
                onChange={(e) => onCommentChange(e.target.value)}
                icon={MessageSquare}
                required
              />
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <FooterModal>
          <div className="flex w-full items-center justify-end gap-3 pb-5">
            <ModernButton type="button" text="Cancelar" variant="outline" icon={X} onClick={onClose} />

            <SubmitButton
              text={loading ? "Guardando..." : isEdit ? "Actualizar Reseña" : "Publicar Reseña"}
              loading={loading}
            />
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
