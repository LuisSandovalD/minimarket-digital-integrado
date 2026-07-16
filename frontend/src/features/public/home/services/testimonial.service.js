import api from "../../../../api/axios";

// ========================================
// OBTENER TODAS LAS RESEÑAS
// ========================================
export const getTestimonials = async () => {
  try {
    const response = await api.get("/review/public");

    return response.data?.data || [];
  } catch (error) {
    console.error("❌ Error obteniendo las reseñas:", error);

    return [];
  }
};

// ========================================
// OBTENER ÚLTIMAS RESEÑAS
// ========================================
export const getLatestTestimonials = async (limit = 10) => {
  try {
    const response = await api.get("/review/public/latest", {
      params: {
        limit,
      },
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("❌ Error obteniendo las últimas reseñas:", error);

    return [];
  }
};

// ========================================
// OBTENER ESTADÍSTICAS
// ========================================
export const getTestimonialsStatistics = async () => {
  try {
    const response = await api.get("/review/public/statistics");

    return (
      response.data?.data || {
        average: 0,
        total: 0,
        distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      }
    );
  } catch (error) {
    console.error("❌ Error obteniendo estadísticas:", error);

    return {
      average: 0,
      total: 0,
      distribution: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    };
  }
};
