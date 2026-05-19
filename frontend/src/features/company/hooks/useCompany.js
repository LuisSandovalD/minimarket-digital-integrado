// ========================================
// hooks/useCompany.js
// ========================================

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { companyService }
  from "../services/company.service";

export default function useCompany() {

  const [company, setCompany] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* ========================================
   * FETCH COMPANY
   * ====================================== */

  const fetchCompany =
    useCallback(async () => {

      try {

        setLoading(true);

        setError(null);

        const response =
          await companyService.getMyCompany();

        setCompany(
          response.data || response
        );

      } catch (err) {

        console.error(err);

        setError(
          "Error al obtener la empresa"
        );

      } finally {

        setLoading(false);

      }

    }, []);

  /* ========================================
   * UPDATE COMPANY
   * ====================================== */

  const updateCompany =
    async (companyId, data) => {

      try {

        setError(null);

        // UPDATE BACKEND
        const response =
          await companyService.updateCompany(
            companyId,
            data
          );

        // ACTUALIZAR INMEDIATAMENTE
        const updatedCompany =
          response.data || response;

        setCompany(updatedCompany);

        // OPCIONAL:
        // volver a sincronizar desde backend
        await fetchCompany();

        return updatedCompany;

      } catch (err) {

        console.error(err);

        setError(
          "Error al actualizar empresa"
        );

        throw err;

      }

    };

  /* ========================================
   * INITIAL LOAD
   * ====================================== */

  useEffect(() => {

    fetchCompany();

  }, [fetchCompany]);

  return {

    company,

    loading,

    error,

    fetchCompany,

    updateCompany,

    setCompany,

  };

}