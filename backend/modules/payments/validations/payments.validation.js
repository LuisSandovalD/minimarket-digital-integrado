import { z } from "zod";

export const createPaymentSchema = z.object({
    amount: z.number().positive(),

    paymentMethod: z.number(),

    status: z.enum([
        "PENDING",
        "COMPLETED",
        "FAILED",
        "CANCELLED",
        "REFUNDED",
        "PARTIAL",
    ]),

    reference: z.string().optional(),

    notes: z.string().optional(),

    transactionId: z.string().optional(),

    saleId: z.number().optional(),

    purchaseId: z.number().optional(),
});

export const updatePaymentSchema =
    createPaymentSchema.partial();