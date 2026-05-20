// ========================================
// features/product/schemas/product.schema.js
// ========================================

import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),

  slug: z.string().min(2, "El slug es requerido"),

  description: z.string().optional(),

  sku: z.string().optional(),

  barcode: z.string().optional(),

  purchasePrice: z.coerce.number().min(0),

  salePrice: z.coerce.number().min(0),

  costPrice: z.coerce.number().min(0),

  stock: z.coerce.number().min(0),

  minStock: z.coerce.number().min(0),

  maxStock: z.coerce.number().nullable().optional(),

  expirationDate: z.string().nullable().optional(),

  batchNumber: z.string().optional(),

  requiresExpiration: z.boolean().default(false),

  isActive: z.boolean().default(true),

  isFeatured: z.boolean().default(false),

  categoryId: z.coerce.number(),

  unitId: z.coerce.number(),

  branchId: z.coerce.number().optional(),
});

export default productSchema;
