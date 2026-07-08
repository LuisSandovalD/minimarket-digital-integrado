// ============================================================================
// hooks/useCompany.js
// CONTROLADOR: Gestiona el estado y persistencia de la empresa activa
// ============================================================================

import { useCallback, useEffect, useState } from "react";
import { companyService } from "../services/company.service";

export default function useCompany() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH COMPANY
  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await companyService.getMyCompany();
      setCompany(response.data || response);
    } catch (err) {
      console.error(err);
      setError("Error al obtener la información de la empresa");
    } finally {
      setLoading(false);
    }
  }, []);

  // UPDATE COMPANY (Soporta FormData para el envío de archivos binarios)
  const updateCompany = async (companyId, formData) => {
    try {
      setError(null);
      // 'formData' debe ser una instancia de new FormData() enviada desde tu formulario
      const response = await companyService.updateCompany(companyId, formData);
      const updatedCompany = response.data || response;

      setCompany(updatedCompany);
      return updatedCompany;
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la empresa");
      throw err;
    }
  };

  // CONTROL DE APARICIÓN DE DATOS (Se ejecuta una sola vez al montar)
  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return {
    company,
    companies: company ? [company] : [], // Expone como array para la grilla si es necesario
    loading,
    error,
    fetchCompany,
    fetchCompanies: fetchCompany,
    updateCompany,
    setCompany,
  };
}
