// ========================================
// features/reviews/hooks/useReviewStatistics.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { getStatistics } from "../services/review.service";

export const useReviewStatistics = () => {
    const [statistics, setStatistics] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    const loadStatistics = useCallback(async () => {
        try {
            setLoadingStats(true);
            const data = await getStatistics();
            setStatistics(data);
        } catch (err) {
            console.error("Error al cargar estadísticas de reseñas:", err);
        } finally {
            setLoadingStats(false);
        }
    }, []);

    useEffect(() => {
        loadStatistics();
    }, [loadStatistics]);

    return {
        statistics,
        loadingStats,
        refreshStatistics: loadStatistics,
    };
};

export default useReviewStatistics;
