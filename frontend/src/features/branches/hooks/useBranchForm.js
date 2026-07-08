// ========================================
// hooks/useBranchForm.js
// ========================================

import { useEffect, useState } from "react";
import { createBranch, updateBranch } from "../services/branch.service";

const INITIAL_STATE = {
  name: "",
  code: "",
  address: "",
  phone: "",
  email: "",
  logo: null,
  description: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  isActive: true,
};

export default function useBranchForm({ branch, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [previewUrl, setPreviewUrl] = useState("");

  const isEdit = !!branch;

  useEffect(() => {
    if (!branch) {
      setFormData(INITIAL_STATE);
      setPreviewUrl("");
      return;
    }

    setFormData({
      name: branch.name || "",
      code: branch.code || "",
      address: branch.address || "",
      phone: branch.phone || "",
      email: branch.email || "",
      logo: branch.logo || null,
      description: branch.description || "",
      city: branch.city || "",
      state: branch.state || "",
      country: branch.country || "",
      postalCode: branch.postalCode || "",
      isActive: branch.isActive ?? true,
    });
    setPreviewUrl(branch.logo || "");
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Normalizamos aquí por si acaso cambia el select manualmente
    const normalizedValue = name === "isActive" ? value === "true" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: normalizedValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData(INITIAL_STATE);
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      let response;

      // 🌟 SEGURO TOTAL: Forzamos que 'isActive' viaje como un Boolean puro (true/false) al Backend
      // Esto evita fallos si el usuario guardó sin interactuar primero con tu componente <Select />
      const payload = {
        ...formData,
        isActive: String(formData.isActive) === "true",
      };

      if (isEdit) {
        response = await updateBranch(branch.id, payload);
      } else {
        response = await createBranch(payload);
      }

      onSuccess?.(response, isEdit);
      onClose?.();
      resetForm();
    } catch (error) {
      console.error("Error saving branch:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    previewUrl,
    isEdit,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm,
  };
}
