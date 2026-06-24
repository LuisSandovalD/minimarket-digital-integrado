// ============================================================================
// hooks/useCompany.js
// CONTROLADOR: Gestiona el estado y persistencia de la empresa activa
// ============================================================================

import { useCallback, useEffect, useState } from "react";
import { companyService } from "../services/company.service";

export default function useCompany() {
  const [company, setCompany] = useState(null);

  // CRÍTICO: Si ya tenemos datos previos de la empresa, iniciamos en false
  // para evitar parpadeos innecesarios en la interfaz del usuario.
  const [loading, setLoading] = useState(!company);
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

  // UPDATE COMPANY
  const updateCompany = async (companyId, data) => {
    try {
      setError(null);
      const response = await companyService.updateCompany(companyId, data);
      const updatedCompany = response.data || response;

      setCompany(updatedCompany);
      return updatedCompany;
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la empresa");
      throw err;
    }
  };

  // ========================================
  // CONTROL DE APARICIÓN DE DATOS
  // ========================================
  useEffect(() => {
    // PROTECCIÓN: Solo ejecuta la petición al servidor si el estado
    // local está vacío. Si ya "apareció" la empresa, no volvemos a cargar.
    if (!company) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchCompany();
    }
  }, [fetchCompany, company]);

  return {
    company,
    companies: company ? [company] : [], // Si existe la empresa, se expone como array para la grilla
    loading,
    error,
    fetchCompany,
    fetchCompanies: fetchCompany,
    updateCompany,
    setCompany,
  };
}
