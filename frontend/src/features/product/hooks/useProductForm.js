// ========================================
// features/product/hooks/useProductForm.js
// ========================================

import { useState } from "react";

const initialState = {
  id: "",
  name: "",
  description: "",

  purchasePrice: 0,
  profitMargin: 0,
  costPrice: 0,
  salePrice: 0,
  profitAmount: 0,

  stock: 0,
  minStock: 5,
  maxStock: "",

  requiresExpiration: false,
  isActive: true,
  isFeatured: false,

  categoryId: "",
  unitId: "",
};

export default function useProductForm() {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let finalValue = type === "checkbox" ? checked : value;

    if (name === "isActive" || name === "isFeatured" || name === "requiresExpiration") {
      finalValue = value === "true";
    }

    const updatedForm = {
      ...form,
      [name]: finalValue,
    };

    const purchasePrice = Number(updatedForm.purchasePrice || 0);
    const profitMargin = Number(updatedForm.profitMargin || 0);

    const safePurchase = Math.max(0, purchasePrice);
    const safeMargin = Math.max(0, profitMargin);

    const costPrice = safePurchase;
    const salePrice = costPrice * (1 + safeMargin / 100);
    const profitAmount = salePrice - costPrice;

    updatedForm.costPrice = Number(costPrice.toFixed(2));
    updatedForm.salePrice = Number(salePrice.toFixed(2));
    updatedForm.profitAmount = Number(profitAmount.toFixed(2));

    setForm(updatedForm);
  };

  const resetForm = () => {
    setForm(initialState);
  };

  const setFormValues = (values = {}) => {
    const purchasePrice = Number(values.purchasePrice || 0);
    const profitMargin = Number(values.profitMargin || 0);

    const costPrice = purchasePrice;
    const salePrice = costPrice * (1 + profitMargin / 100);
    const profitAmount = salePrice - costPrice;

    setForm({
      ...initialState,
      ...values,

      id: values.id || "",
      name: values.name || "",
      description: values.description || "",

      purchasePrice,
      profitMargin,
      costPrice: Number(costPrice.toFixed(2)),
      salePrice: Number(salePrice.toFixed(2)),
      profitAmount: Number(profitAmount.toFixed(2)),

      stock: Number(values.stock || 0),
      minStock: Number(values.minStock ?? 5),
      maxStock: values.maxStock ?? "",

      requiresExpiration: values.requiresExpiration ?? false,
      isActive: values.isActive ?? true,
      isFeatured: values.isFeatured ?? false,

      categoryId: values.categoryId ?? values.category?.id ?? "",

      unitId: values.unitId ?? values.unit?.id ?? "",
    });
  };

  return {
    form,
    setForm,
    handleChange,
    resetForm,
    setFormValues,
  };
}
