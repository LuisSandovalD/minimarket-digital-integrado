// ========================================
// features/reviews/hooks/useReviewForm.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { createReview, deleteMyReview, getMyReview, updateMyReview } from "../services/review.service";

export const useReviewForm = (onReviewChanged) => {
  // Estados de datos
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Estados de UI/Flujo
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Cargar reseña del usuario actual
  const loadReview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyReview();

      if (data) {
        setReview(data);
        setRating(data.rating);
        setComment(data.comment || "");
      }
    } catch (err) {
      // Si el backend responde 404 es porque el usuario no tiene reseña previa.
      // Esto es un flujo normal, no un error crítico.
      if (err.response?.status !== 404) {
        console.error("Error al cargar la reseña del usuario:", err);
        setError("No se pudo cargar tu reseña anterior.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReview();
  }, [loadReview]);

  // Limpiar el formulario a sus valores iniciales vacíos
  const resetForm = () => {
    setRating(5);
    setComment("");
    setReview(null);
    setError(null);
  };

  const clearError = () => setError(null);

  const selectRating = (value) => setRating(Number(value));

  // Guardar (Crear o Actualizar)
  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);

      const payload = { rating, comment };
      let response;

      if (review) {
        response = await updateMyReview(payload);
      } else {
        response = await createReview(payload);
      }

      setReview(response.data);

      // Disparar callback si se necesita refrescar datos externos (ej. estadísticas)
      if (typeof onReviewChanged === "function") {
        await onReviewChanged();
      }

      return { success: true };
    } catch (err) {
      console.error("Error al guardar la reseña:", err);
      const msg = err.response?.data?.message || "Error al guardar la reseña.";
      setError(msg);
      return { success: false };
    } finally {
      setSaving(false);
    }
  };

  // Eliminar
  const handleDelete = async () => {
    if (!review) return { success: false };

    try {
      setSaving(true);
      setError(null);

      await deleteMyReview();
      resetForm();

      // Disparar callback para notificar el cambio
      if (typeof onReviewChanged === "function") {
        await onReviewChanged();
      }

      return { success: true };
    } catch (err) {
      console.error("Error al eliminar la reseña:", err);
      const msg = err.response?.data?.message || "Error al eliminar.";
      setError(msg);
      return { success: false };
    } finally {
      setSaving(false);
    }
  };

  return {
    // Estados
    review,
    rating,
    comment,
    loading,
    saving,
    error,

    // Setters directo/reducido
    setComment,
    selectRating,

    // Helpers de UI
    resetForm,
    clearError,
    refreshReview: loadReview,

    // Acciones CRUD
    handleSubmit,
    handleDelete,
  };
};

export default useReviewForm;
