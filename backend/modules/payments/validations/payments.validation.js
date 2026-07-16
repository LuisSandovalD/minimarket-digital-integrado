import { z } from "zod";

// Esquema base con validaciones robustas
export const createPaymentSchema = z.object({
    amount: z.number().positive("El monto debe ser un número positivo"),

    paymentMethod: z.number().int().positive("El método de pago debe ser un ID entero positivo"),

    status: z.enum([
        "PENDING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "REFUNDED",
        "PARTIAL",
    ]),

    reference: z.string().trim().min(1, "La referencia no puede estar vacía").optional(),

    notes: z.string().trim().optional(),

    transactionId: z.string().trim().min(1, "El ID de transacción no puede estar vacío").optional(),

    saleId: z.number().int().positive().optional(),

    purchaseId: z.number().int().positive().optional(),
}).refine(
    (data) => !(data.saleId && data.purchaseId),
    {
        message: "Un pago no puede estar asociado a una venta y a una compra simultáneamente",
        path: ["saleId"], // Apunta el error al campo saleId
    }
);

// Esquema para actualizaciones (hace opcionales los campos editables y previene alterar relaciones fijas)
export const updatePaymentSchema = createPaymentSchema.partial().omit({
    saleId: true,
    purchaseId: true,
});