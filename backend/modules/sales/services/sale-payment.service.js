// ========================================
// services/sale-payment.service.js
// ========================================

const prisma = require("../../../prisma/client");
const salePaymentRepository = require("../repositories/sale-payment.repository");

// ========================================
// GET SALE PAYMENTS SERVICE
// ========================================
const getSalePaymentsService = async (saleId) => {
    return await salePaymentRepository.getSalePayments(saleId);
};

// ========================================
// REGISTER SALE PAYMENT (COBRO EN CAJA)
// ========================================
const registerSalePaymentService = async (saleId, paymentData) => {
    const { saleType, payments, pendingDebt, isAbonoFlow } = paymentData;

    return await prisma.$transaction(async (tx) => {
        // 1. Validar existencia de la venta
        const existingSale = await tx.sale.findUnique({
            where: { id: Number(saleId) },
        });

        if (!existingSale) {
            throw new Error(`La venta con ID ${saleId} no existe.`);
        }

        // 2. Controlar la persistencia de pagos según el flujo
        // Si NO es un abono (es una venta nueva), limpiamos temporales.
        // Si SÍ es un abono, mantenemos el historial intacto para acumular cobros en caja.
        if (!isAbonoFlow) {
            await salePaymentRepository.deletePaymentsBySale(saleId, tx);
        }

        // 3. Mapear pagos del modal al tipado del Backend
        const formattedPayments = payments.map((p) => {
            const isCredit = saleType === "CREDIT_SALE" || p.method === "CREDIT" || Number(p.paymentMethodId) === 6;

            return {
                paymentMethodId: p.paymentMethodId ? Number(p.paymentMethodId) : 1,
                amount: Number(p.amount),
                status: isCredit ? "PENDING" : "COMPLETED",
                reference: p.reference || null,
                dueDate: p.dueDate ? new Date(p.dueDate) : null,
            };
        });

        // 4. Guardar los registros de caja mediante el repositorio
        const savedPayments = await salePaymentRepository.createManyPayments(
            saleId,
            formattedPayments,
            tx
        );

        // 5. Calcular nuevo estado para la cabecera de la venta
        let newSaleStatus = "COMPLETED";
        if (saleType === "CREDIT_SALE") {
            newSaleStatus = "PENDING";
        } else if (Number(pendingDebt) > 0.05) {
            newSaleStatus = "PARTIAL";
        }

        // 6. Actualizar la cabecera de la orden
        // 🎯 CORRECCIÓN TOTAL: Se dejaron únicamente las columnas reales de la tabla 'Sale' 
        // (Se eliminaron 'condition' y 'creditDueDate' ya que causaban excepciones en Prisma)
        const updatedSale = await tx.sale.update({
            where: { id: Number(saleId) },
            data: {
                status: newSaleStatus,
            },
        });

        return {
            sale: updatedSale,
            payments: savedPayments,
        };
    });
};

module.exports = {
    registerSalePaymentService,
    getSalePaymentsService
};