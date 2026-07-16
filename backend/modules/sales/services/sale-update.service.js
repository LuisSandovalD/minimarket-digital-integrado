// ========================================
// services/sale-update.service.js
// ========================================

const prisma = require("../../../prisma/client");

const {
  updateSale,
  deleteDetailsBySale,
  createManyDetails,
  getBySaleId,
} = require("../repositories/sale.repository");

const {
  increaseStock,
  decreaseStockByProduct,
} = require("../../inventory/repositories/inventory.repository");

// IMPORTAMOS EL CLIENTE BASE DE CORREO
const { sendEmail } = require("../../../config/email.config");

module.exports = {

  // ========================================
  // UPDATE SALE (CON RECUPERACIÓN DE STOCK Y RECALCULO DE FINANZAS)
  // ========================================
  updateSaleService: async (id, body) => {
    const saleId = Number(id);

    // Variables para almacenar metadatos informativos destinados al correo
    let customerEmail = null;
    let customerName = "Cliente General";
    let saleNumberInfo = "";

    const transactionResult = await prisma.$transaction(
      async (tx) => {

        // ========================================
        // 1. VERIFICAR EXISTENCIA Y ESTADO DE LA VENTA ORIGINAL
        // ========================================
        const originalSale = await tx.sale.findUnique({
          where: { id: saleId },
          include: {
            payments: true,
            details: true,
          },
        });

        if (!originalSale) {
          throw new Error("La venta que intenta actualizar no existe.");
        }

        if (originalSale.status === "CANCELLED" || originalSale.status === "ANULADO") {
          throw new Error("No se puede modificar una venta que ya ha sido anulada o cancelada.");
        }

        // Rescatamos el correlativo para el asunto del correo electrónico
        saleNumberInfo = originalSale.saleNumber;

        // ========================================
        // 2. REVERTIR STOCK ANTERIOR (Dentro de la transacción 'tx')
        // ========================================
        for (const oldItem of originalSale.details) {
          await increaseStock(
            Number(oldItem.productId),
            Number(oldItem.quantity),
            tx,
          );
        }

        // ========================================
        // 3. CÁLCULO DE TOTALES FINANCIEROS (Modelo Base Gravable)
        // ========================================
        const totalBruto = body.details.reduce((acc, item) => {
          return acc + (Number(item.quantity) * Number(item.price));
        }, 0);

        const discount = Number(body.discount || 0);
        const total = parseFloat((totalBruto - discount).toFixed(2));

        const subtotal = parseFloat((total / 1.18).toFixed(2));
        const tax = parseFloat((total - subtotal).toFixed(2));

        const saleStatus = body.status || originalSale.status;

        // ========================================
        // 4. CONTROL DE CUENTA CORRIENTE DE CLIENTES (CRÉDITOS)
        // ========================================
        if (originalSale.customerId) {
          const oldCreditAmount = originalSale.payments
            .filter(p => p.status === "PENDING")
            .reduce((sum, p) => sum + Number(p.amount), 0);

          let newCreditAmount = 0;
          if (saleStatus === "CREDIT_PENDING") {
            newCreditAmount = Array.isArray(body.payments)
              ? body.payments.filter(p => p.status === "PENDING").reduce((sum, p) => sum + Number(p.amount), 0)
              : total;
          }

          const debtDifference = parseFloat((newCreditAmount - oldCreditAmount).toFixed(2));

          const customer = await tx.customer.findUnique({
            where: { id: Number(originalSale.customerId) },
          });

          if (customer) {
            // Extraemos los datos actualizados del cliente para armar la notificación
            customerEmail = customer.email;
            customerName = customer.name;

            if (debtDifference !== 0) {
              const potentialDebt = Number(customer.currentDebt) + debtDifference;

              if (customer.creditLimit && potentialDebt > Number(customer.creditLimit)) {
                throw new Error(`Crédito Excedido: La modificación elevaría la deuda a S/. ${potentialDebt.toFixed(2)}, superando el límite de S/. ${Number(customer.creditLimit).toFixed(2)}.`);
              }

              await tx.customer.update({
                where: { id: customer.id },
                data: { currentDebt: { increment: debtDifference } },
              });
            }
          }
        }

        // ========================================
        // 5. ACTUALIZAR CABECERA DE LA VENTA (SALE)
        // ========================================
        const updatedSale = await tx.sale.update({
          where: { id: saleId },
          data: {
            customerId: body.customerId ? Number(body.customerId) : originalSale.customerId,
            subtotal,
            tax,
            discount,
            total,
            notes: body.notes || originalSale.notes,
            status: saleStatus,
          },
        });

        // ========================================
        // 6. PURGAR Y RENOVAR DESGLOSE DE ARTÍCULOS
        // ========================================
        await tx.saleDetail.deleteMany({
          where: { saleId: saleId },
        });

        const detailsData = body.details.map((item) => {
          const itemTotal = Number(item.quantity) * Number(item.price);
          const itemSubtotal = parseFloat((itemTotal / 1.18).toFixed(2));
          const itemTax = parseFloat((itemTotal - itemSubtotal).toFixed(2));

          return {
            saleId: saleId,
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            price: Number(item.price),
            subtotal: itemSubtotal,
            discount: 0.00,
            tax: itemTax,
          };
        });

        await tx.saleDetail.createMany({
          data: detailsData,
        });

        // ========================================
        // 7. DESCARGAR NUEVO STOCK DEL ALMACÉN
        // ========================================
        for (const item of body.details) {
          await decreaseStockByProduct(
            Number(item.productId),
            Number(item.quantity),
            tx,
          );
        }

        // ========================================
        // 8. CONTROL DE FLUJO DE PAGOS / COMPROBANTES
        // ========================================
        if (Array.isArray(body.payments) && body.payments.length > 0) {
          await tx.payment.deleteMany({
            where: { saleId: saleId },
          });

          const newPayments = body.payments.map(payment => {
            const isCredit = payment.status === "PENDING";
            return {
              saleId: saleId,
              amount: Number(payment.amount),
              status: payment.status || "COMPLETED",
              paymentMethod: Number(payment.paymentMethodId || 1),
              reference: payment.reference || (isCredit ? "REAJUSTE-CREDITO" : "REAJUSTE-EFECTIVO"),
              notes: payment.notes || "Pago recalculado por modificación de venta.",
              paidAt: isCredit ? null : new Date(),
              dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
            };
          });

          await tx.payment.createMany({
            data: newPayments,
          });
        }

        return updatedSale;
      },
      {
        maxWait: 8000,
        timeout: 15000,
      },
    );

    // ========================================
    // 8.5 NOTIFICACIÓN DE ACTUALIZACIÓN DE COMPRA (FUERA DE LA BD)
    // ========================================
    if (customerEmail) {
      sendEmail({
        to: customerEmail,
        subject: `Modificación de Comprobante - Ticket ${saleNumberInfo}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
                <h2 style="color: #0f172a;">Hola, ${customerName}</h2>
                <p>Te notificamos que tu comprobante asociado a la venta <strong>${saleNumberInfo}</strong> ha sido editado y reajustado en caja.</p>
                
                <div style="background-color: #f8fafc; padding: 12px; border-left: 4px solid #ef4444; margin: 15px 0;">
                    <p style="margin: 0; color: #64748b; font-size: 14px;">Motivo: Actualización de ítems / Reajuste financiero de la orden.</p>
                </div>

                <h3>Nuevo desglose de productos:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f1f5f9; text-align: left;">
                            <th style="padding: 6px;">ID Prod</th>
                            <th style="padding: 6px;">Cantidad</th>
                            <th style="padding: 6px;">Precio Unit.</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${body.details.map(item => `
                            <tr>
                                <td style="padding: 6px; border-bottom: 1px solid #e2e8f0;">#${item.productId}</td>
                                <td style="padding: 6px; border-bottom: 1px solid #e2e8f0;">${item.quantity}</td>
                                <td style="padding: 6px; border-bottom: 1px solid #e2e8f0;">S/. ${Number(item.price).toFixed(2)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>

                <h3 style="text-align: right; color: #1e293b; margin-top: 20px;">
                    Nuevo Total Neto: <span style="color: #2563eb;">S/. ${transactionResult.total.toFixed(2)}</span>
                </h3>
                
                <br>
                <hr style="border: 0; border-top: 1px solid #e2e8f0;">
                <small style="color: #94a3b8;">ERP POS System - Notificaciones de control transaccional.</small>
            </div>
        `,
      }).catch(emailError => {
        console.error("⚠️ Falló el envío del correo de reajuste:", emailError.message || emailError);
      });
    }

    return transactionResult;
  },
};
