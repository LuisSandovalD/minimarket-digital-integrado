const prisma = require("../../../prisma/client");
const { sendEmail } = require("../../../config/email.config");

const {
  cancelSale,
  refundPayments,
  getBySaleId,
} = require("../repositories/sale.repository");

const {
  increaseStock,
} = require("../../inventory/repositories/inventory.repository");

const sendSaleCancellationEmail = async ({ email, name, invoiceNumber, total, customerName }) => {
  if (!email) return;

  const formattedTotal = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(total || 0));

  return await sendEmail({
    to: email,
    subject: `Anulación de Venta - Comprobante N° ${invoiceNumber || ""}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #fee2e2; border-radius: 8px; background-color: #fef2f2;">
        <h2 style="color: #dc2626; margin-top: 0;">⚠️ Notificación de Venta Anulada</h2>
        <p>Estimado(a) ${name},</p>
        <p>Se ha procesado la anulación de un comprobante de venta en nuestro sistema con los siguientes detalles:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">N° Operación / Comprobante:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${invoiceNumber || "N/A"}</td>
          </tr>
          ${customerName ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Cliente asociado:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${customerName}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Monto total revertido:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #dc2626; font-weight: bold;">${formattedTotal}</td>
          </tr>
        </table>

        <p>El stock de los productos ha sido reincorporado a nuestro almacén y las cuentas o deudas corrientes asociadas han sido saldadas.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #fca5a5;">
        <small style="color: #7f1d1d;">Este es un mensaje automático de auditoría de operaciones de ERP POS System.</small>
      </div>
    `,
  });
};

module.exports = {
  cancelSaleService: async (id) => {
    // Ejecutamos la transacción para asegurar consistencia de base de datos
    const resultTransaction = await prisma.$transaction(
      async (tx) => {
        const sale = await tx.sale.findUnique({
          where: { id: Number(id) },
          include: {
            payments: true,
            customer: true, // Incluimos los datos del cliente para la notificación
          },
        });

        if (!sale) {
          throw new Error("La venta que intenta anular no existe.");
        }

        if (sale.status === "CANCELLED" || sale.status === "ANULADO") {
          throw new Error("Esta venta ya se encuentra anulada en el sistema.");
        }

        const details = await getBySaleId(id);

        for (const item of details) {
          await increaseStock(
            Number(item.productId),
            Number(item.quantity),
            tx,
          );
        }

        if (sale.status === "CREDIT_PENDING" && sale.customerId) {
          const creditAmountToRevert = sale.payments
            .filter(p => p.status === "PENDING")
            .reduce((sum, p) => sum + Number(p.amount), 0);

          if (creditAmountToRevert > 0) {
            await tx.customer.update({
              where: { id: Number(sale.customerId) },
              data: {
                currentDebt: {
                  decrement: creditAmountToRevert,
                },
              },
            });
          }
        }

        await cancelSale(id, tx);
        await refundPayments(id, tx);

        return sale;
      },
      {
        maxWait: 10000,
        timeout: 20000,
      },
    );

    // ========================================
    // ENVÍO DE NOTIFICACIONES POST-TRANSACCIÓN (FUERA DE LA BD)
    // ========================================
    try {
      // 1. Notificación al cliente si cuenta con correo
      if (resultTransaction.customer && resultTransaction.customer.email) {
        await sendSaleCancellationEmail({
          email: resultTransaction.customer.email,
          name: resultTransaction.customer.name,
          invoiceNumber: resultTransaction.invoiceNumber || `VENTA-${resultTransaction.id}`,
          total: resultTransaction.total,
        });
      }

      // 2. Notificación al administrador de la empresa (Auditoría de seguridad)
      const admin = await prisma.user.findFirst({
        where: {
          companyId: resultTransaction.companyId,
          role: "ADMIN",
        },
      });

      if (admin && admin.email) {
        await sendSaleCancellationEmail({
          email: admin.email,
          name: admin.name,
          invoiceNumber: resultTransaction.invoiceNumber || `VENTA-${resultTransaction.id}`,
          total: resultTransaction.total,
          customerName: resultTransaction.customer ? resultTransaction.customer.name : "Venta rápida / Público general",
        });
      }
    } catch (emailError) {
      console.error("⚠️ Error enviando correos de anulación de venta:", emailError.message || emailError);
    }

    return {
      success: true,
      message: "Venta anulada correctamente. Stock, cuentas corrientes actualizados y correos de notificación despachados.",
    };
  },
};
