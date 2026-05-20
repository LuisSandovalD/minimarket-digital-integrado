// ========================================
// features/product/hooks/useProductForm.js
// ========================================

import { useState } from "react";

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  // ========================================
  // GENERAL
  // ========================================

  id: "",

  name: "",

  description: "",

  // ========================================
  // PRICES
  // ========================================

  purchasePrice: 0,

  profitMargin: 0,

  costPrice: 0,

  salePrice: 0,

  profitAmount: 0,

  // ========================================
  // STOCK CONFIG
  // ========================================

  stock: 0,

  minStock: 5,

  maxStock: "",

  // ========================================
  // EXPIRATION
  // ========================================

  expirationDate: "",

  batchNumber: "",

  requiresExpiration: false,

  // ========================================
  // STATUS
  // ========================================

  isActive: true,

  isFeatured: false,

  // ========================================
  // RELATIONS
  // ========================================

  categoryId: "",

  unitId: "",

  branchId: "",
};

// ========================================
// HOOK
// ========================================

export default function useProductForm() {
  const [form, setForm] = useState(initialState);

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // ========================================
    // BOOLEANS
    // ========================================

    let finalValue = type === "checkbox" ? checked : value;

    // ========================================
    // BOOLEAN SELECTS
    // ========================================

    if (
      name === "isActive" ||
      name === "isFeatured" ||
      name === "requiresExpiration"
    ) {
      finalValue = value === "true";
    }

    // ========================================
    // UPDATE FORM BASE
    // ========================================

    const updatedForm = {
      ...form,

      [name]: finalValue,
    };

    // ========================================
    // PRICING ENGINE
    // ========================================

    const purchasePrice = Number(updatedForm.purchasePrice || 0);

    const profitMargin = Number(updatedForm.profitMargin || 0);

    // ========================================
    // VALIDATIONS
    // ========================================

    const safePurchase = purchasePrice < 0 ? 0 : purchasePrice;

    const safeMargin = profitMargin < 0 ? 0 : profitMargin;

    // ========================================
    // COST
    // ========================================

    const costPrice = safePurchase;

    // ========================================
    // SALE PRICE
    // ========================================

    const salePrice = costPrice * (1 + safeMargin / 100);

    // ========================================
    // PROFIT
    // ========================================

    const profitAmount = salePrice - costPrice;

    // ========================================
    // SAVE CALCULATIONS
    // ========================================

    updatedForm.costPrice = Number(costPrice.toFixed(2));

    updatedForm.salePrice = Number(salePrice.toFixed(2));

    updatedForm.profitAmount = Number(profitAmount.toFixed(2));

    // ========================================
    // UPDATE STATE
    // ========================================

    setForm(updatedForm);
  };

  // ========================================
  // RESET FORM
  // ========================================

  const resetForm = () => {
    setForm(initialState);
  };

  // ========================================
  // SET FORM VALUES
  // ========================================

  const setFormValues = (values) => {
    const purchasePrice = Number(values?.purchasePrice || 0);

    const profitMargin = Number(values?.profitMargin || 0);

    // ========================================
    // RECALCULATE
    // ========================================

    const costPrice = purchasePrice;

    const salePrice = costPrice * (1 + profitMargin / 100);

    const profitAmount = salePrice - costPrice;

    // ========================================
    // SET FORM
    // ========================================

    setForm({
      ...initialState,

      ...values,

      // ========================================
      // GENERAL
      // ========================================

      id: values?.id || "",

      name: values?.name || "",

      description: values?.description || "",

      // ========================================
      // PRICES
      // ========================================

      purchasePrice,

      profitMargin,

      costPrice: Number(costPrice.toFixed(2)),

      salePrice: Number(salePrice.toFixed(2)),

      profitAmount: Number(profitAmount.toFixed(2)),

      // ========================================
      // STOCK
      // ========================================

      stock: Number(values?.stock || 0),

      minStock: Number(values?.minStock ?? 5),

      maxStock: values?.maxStock || "",

      // ========================================
      // EXPIRATION
      // ========================================

      batchNumber: values?.batchNumber || "",

      expirationDate: values?.expirationDate
        ? values.expirationDate.split("T")[0]
        : "",

      requiresExpiration: values?.requiresExpiration ?? false,

      // ========================================
      // STATUS
      // ========================================

      isActive: values?.isActive ?? true,

      isFeatured: values?.isFeatured ?? false,

      // ========================================
      // RELATIONS
      // ========================================

      categoryId: values?.categoryId || "",

      unitId: values?.unitId || "",

      branchId: values?.branchId || "",
    });
  };

  // ========================================
  // EXPORTS
  // ========================================

  return {
    form,

    setForm,

    handleChange,

    resetForm,

    setFormValues,
  };
}
