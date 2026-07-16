// ========================================
// hooks/useBranchForm.js
// ========================================

import { getUser } from "@/features/auth/services/session.service";
import { useEffect, useState } from "react";
import { createBranch, updateBranch } from "../services/branch.service";

// Obtenemos dinámicamente la información del usuario logueado en esta sesión
const getSessionCompanyId = () => {
  const user = getUser();
  return user?.companyId ? Number(user.companyId) : null;
};

const getInitialState = () => ({
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
  companyId: getSessionCompanyId(), // 🌟 Dinámico desde el primer render
});

export default function useBranchForm({ branch, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(getInitialState());
  const [previewUrl, setPreviewUrl] = useState("");

  const isEdit = !!branch;

  useEffect(() => {
    if (!branch) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(getInitialState());
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
      companyId: branch.companyId ? Number(branch.companyId) : getSessionCompanyId(),
    });
    setPreviewUrl(branch.logo || "");
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    setFormData(getInitialState());
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      let response;

      // 1. 🌟 Evitamos colisiones de códigos vacíos en Prisma generándolos dinámicamente si no se ingresan
      const finalCode = formData.code.trim() === "" ? `BR-${Date.now().toString().slice(-6)}` : formData.code.trim();

      const currentCompanyId = getSessionCompanyId();

      const payload = {
        ...formData,
        code: finalCode,
        isActive: String(formData.isActive) === "true",
        companyId: Number(formData.companyId || currentCompanyId),
      };

      // 2. ❌ Removemos propiedades que Prisma no acepta como columnas nativas
      delete payload.slug;

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
