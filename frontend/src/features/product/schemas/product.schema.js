// ========================================
// features/product/schemas/product.schema.js
// ========================================

import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),

  description: z.string().optional().nullable(),

  purchasePrice: z.coerce.number().min(0, "El precio de compra no puede ser negativo"),

  costPrice: z.coerce.number().min(0),

  salePrice: z.coerce.number().min(0),

  profitMargin: z.coerce.number().min(0),

  profitAmount: z.coerce.number().min(0),

  stock: z.coerce.number().min(0),

  minStock: z.coerce.number().min(0),

  maxStock: z.coerce.number().nullable().optional(),

  requiresExpiration: z.boolean().default(false),

  isActive: z.boolean().default(true),

  isFeatured: z.boolean().default(false),

  categoryId: z.coerce.number({
    required_error: "La categoría es requerida",
  }),

  unitId: z.coerce.number({
    required_error: "La unidad es requerida",
  }),
});

export default productSchema;
