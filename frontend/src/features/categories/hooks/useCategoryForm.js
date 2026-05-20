// ========================================
// hooks/useCategoryForm.js
// ========================================

import { useEffect, useState } from "react";

import { createCategory, updateCategory } from "../services/category.service";

export default function useCategoryForm({ category, onClose, onSuccess }) {
  // ========================================
  // STATE
  // ========================================

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    parentId: "",
    isActive: true,
    isParent: false,
  });

  // ========================================
  // EDIT MODE
  // ========================================

  const isEdit = Boolean(category);

  // ========================================
  // LOAD CATEGORY
  // ========================================

  useEffect(() => {
    if (category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        icon: category.icon || "",
        parentId: category.parentId || "",
        isActive: category.isActive ?? true,
        isParent: !category.parentId,
      });
    }
  }, [category]);

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ========================================
      // AUTO SLUG
      // ========================================

      const payload = {
        ...formData,
        slug: formData.slug?.trim()?.toLowerCase()?.replaceAll(" ", "-"),
        parentId:
          formData.parentId && !formData.isParent
            ? Number(formData.parentId)
            : null,
      };

      // ========================================
      // UPDATE
      // ========================================

      if (isEdit) {
        await updateCategory(category.id, payload);
      }

      // ========================================
      // CREATE
      // ========================================
      else {
        await createCategory(payload);
      }

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    formData,
    isEdit,
    handleChange,
    handleSubmit,
  };
}
