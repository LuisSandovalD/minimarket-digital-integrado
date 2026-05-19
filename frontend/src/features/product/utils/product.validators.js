// ========================================
// VALIDATE PRODUCT
// ========================================

export const validateProduct = (
  form
) => {

  const errors = {};

  // ========================================
  // NAME
  // ========================================

  if (!form.name?.trim()) {

    errors.name =
      "El nombre es requerido";

  }

  // ========================================
  // PURCHASE PRICE
  // ========================================

  if (
    !form.purchasePrice ||
    Number(form.purchasePrice) <= 0
  ) {

    errors.purchasePrice =
      "Precio de compra inválido";

  }

  // ========================================
  // COST PRICE
  // ========================================

  if (
    !form.costPrice ||
    Number(form.costPrice) <= 0
  ) {

    errors.costPrice =
      "Costo inválido";

  }

  // ========================================
  // CATEGORY
  // ========================================

  if (!form.categoryId) {

    errors.categoryId =
      "Seleccione categoría";

  }

  // ========================================
  // UNIT
  // ========================================

  if (!form.unitId) {

    errors.unitId =
      "Seleccione unidad";

  }

  return errors;

};