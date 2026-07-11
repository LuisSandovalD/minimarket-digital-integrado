// ========================================
// features/reviews/services/review.service.js
// ========================================

import api from "../../../api/axios";

const BASE_URL = "/review";

/* ======================================
 * CREATE REVIEW
 * ==================================== */
export const createReview = async (data) => {
  try {
    const response = await api.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

/* ======================================
 * GET MY REVIEW
 * ==================================== */
export const getMyReview = async () => {
  try {
    const response = await api.get(`${BASE_URL}/my-review`);
    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching my review:", error);
    throw error;
  }
};

/* ======================================
 * UPDATE MY REVIEW
 * ==================================== */
export const updateMyReview = async (data) => {
  try {
    const response = await api.put(`${BASE_URL}/my-review`, data);

    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

/* ======================================
 * DELETE MY REVIEW
 * ==================================== */
export const deleteMyReview = async () => {
  try {
    const response = await api.delete(`${BASE_URL}/my-review`);

    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

/* ======================================
 * GET ALL REVIEWS (ADMIN)
 * ==================================== */
export const getReviews = async () => {
  try {
    const response = await api.get(BASE_URL);

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

/* ======================================
 * GET REVIEW BY ID
 * ==================================== */
export const getReview = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);

    return response.data?.data || null;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

/* ======================================
 * GET STATISTICS
 * ==================================== */
export const getStatistics = async () => {
  try {
    const response = await api.get(`${BASE_URL}/statistics`);

    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

/* ======================================
 * PUBLIC REVIEWS
 * ==================================== */
export const getPublicReviews = async (companyId) => {
  try {
    const response = await api.get(`${BASE_URL}/public`, {
      params: {
        companyId,
      },
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching public reviews:", error);
    throw error;
  }
};

/* ======================================
 * PUBLIC LATEST REVIEWS
 * ==================================== */
export const getLatestReviews = async (companyId, limit = 5) => {
  try {
    const response = await api.get(`${BASE_URL}/public/latest`, {
      params: {
        companyId,
        limit,
      },
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching latest reviews:", error);
    throw error;
  }
};

/* ======================================
 * PUBLIC STATISTICS
 * ==================================== */
export const getPublicStatistics = async (companyId) => {
  try {
    const response = await api.get(`${BASE_URL}/public/statistics`, {
      params: {
        companyId,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching public statistics:", error);
    throw error;
  }
};
