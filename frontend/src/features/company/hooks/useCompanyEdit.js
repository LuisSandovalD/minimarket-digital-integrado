// ============================================================================
// hooks/useCompanyEdit.js
// ============================================================================

import { useEffect, useState } from "react";
import { companyService } from "../services/company.service";

const INITIAL_STATE = {
  name: "",
  slug: "",
  ruc: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  taxId: "",
  legalRepresentative: "",
  logo: null, // Guardará la URL del string existente o el archivo File binario
};

export default function useCompanyEdit({
  open,
  companyId,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);

  /* ========================================
   * FETCH COMPANY
   * ====================================== */
  useEffect(() => {
    if (!open || !companyId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(INITIAL_STATE);
      return;
    }

    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await companyService.getCompanyById(companyId);
        const company = response.data || response;

        setFormData({
          name: company.name || "",
          slug: company.slug || "",
          ruc: company.ruc || "",
          email: company.email || "",
          phone: company.phone || "",
          address: company.address || "",
          website: company.website || "",
          taxId: company.taxId || "",
          legalRepresentative: company.legalRepresentative || "",
          logo: company.logo || null, // URL string que viene de la base de datos
        });
      } catch (error) {
        console.error("Error al obtener la empresa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [open, companyId]);

  /* ========================================
   * HANDLE CHANGE (Texto convencional)
   * ====================================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ========================================
   * HANDLE FILE CHANGE (Para capturar el archivo binario del input)
   * ====================================== */
  // 🌟 Agrega este método para manejar el input de tipo file en tu formulario
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file, // Guardamos el File nativo de JS (binario) en el estado temporal
      }));
    }
  };

  /* ========================================
   * SUBMIT (Empaqueta todo en Multipart/FormData)
   * ====================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🌟 CONVERSIÓN CRÍTICA: Mapeamos el objeto de React a un FormData nativo del navegador
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("slug", formData.slug);
      dataToSend.append("ruc", formData.ruc);
      dataToSend.append("address", formData.address);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("email", formData.email);
      dataToSend.append("website", formData.website);
      dataToSend.append("taxId", formData.taxId);
      dataToSend.append("legalRepresentative", formData.legalRepresentative);

      // Solo si el usuario seleccionó un ARCHIVO NUEVO a través del input, lo inyectamos.
      // Si "formData.logo" sigue siendo la URL (String) vieja, no la enviamos o la enviamos según requiera tu frontend,
      // pero Multer no creará req.file de un string, protegiendo al backend.
      if (formData.logo instanceof File) {
        dataToSend.append("logo", formData.logo);
      }

      // UPDATE enviando el FormData binario
      const response = await companyService.updateCompany(
        companyId,
        dataToSend,
      );

      // ESPERA REFRESH
      await onSuccess?.(response);

      // CIERRA DESPUÉS
      onClose?.();
    } catch (error) {
      console.error("Error en la actualización:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    handleChange,
    handleFileChange, // 🌟 Recuerda enlazar esto a tu <input type="file" name="logo" onChange={handleFileChange} />
    handleSubmit,
  };
}
