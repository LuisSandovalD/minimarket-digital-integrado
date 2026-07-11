// ========================================
// features/categories/hooks/useCategories.js
// ========================================

import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../services/category.service";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados de control para Filtros y Paginación
  const [searchQuery, setSearchQuery] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState(undefined);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Memorizamos fetchCategories con useCallback para evitar bucles infinitos en los efectos
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Enviamos los filtros estructurados que el backend espera recibir
      const response = await getCategories({
        search: searchQuery || undefined,
        isActive: isActiveFilter,
        page,
        limit: 10, // El tamaño de página por defecto en el sistema
      });

      // Extraemos la estructura basada en el nuevo JSON del backend
      setCategories(response.data || []);

      // Mapeamos los metadatos de paginación calculados por el servidor
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages || 1);
        setTotalItems(response.pagination.totalItems || 0);
      }
    } catch (err) {
      setError(err.message || "Error al cargar las categorías");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, isActiveFilter, page]);

  // Se ejecuta automáticamente cada vez que cambia la página o se aplica un filtro
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  // Handler para disparar una nueva búsqueda (resetea a la página 1)
  const handleSearch = ({ search, isActive }) => {
    setSearchQuery(search || "");
    setIsActiveFilter(isActive);
    setPage(1);
  };

  // Handler para limpiar filtros por completo
  const handleClearFilters = () => {
    setSearchQuery("");
    setIsActiveFilter(undefined);
    setPage(1);
  };

  // Controles de navegación de página
  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return {
    categories,
    loading,
    error,
    page,
    totalPages,
    totalItems,
    search: handleSearch,
    clearFilters: handleClearFilters,
    nextPage,
    prevPage,
    reload: fetchCategories, // Mapeado como 'reload' para mantener la consistencia del modal de borrado
  };
}
