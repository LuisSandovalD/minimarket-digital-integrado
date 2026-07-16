const prisma = require("../../../prisma/client");
const { PURCHASE_STATUS } = require("../constants/purchase.constants");
const { cancelPurchaseRepository } = require("../repositories/cancel-purchase.repository");
const { sendEmail } = require("../../../config/email.config");

const sendPurchaseCancellationEmail = async ({ email, name, purchaseNumber, total, supplierName, isSupplier }) => {
  if (!email) return;

  const formattedTotal = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(total || 0));

  const subject = isSupplier
    ? `Cancelación de Orden de Compra N° ${purchaseNumber}`
    : `⚠️ Auditoría: Orden de Compra Cancelada - N° ${purchaseNumber}`;

  return await sendEmail({
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #fee2e2; border-radius: 8px; background-color: #fef2f2;">
        <h2 style="color: #dc2626; margin-top: 0;">⚠️ Notificación de Compra Cancelada</h2>
        <p>Estimado(a) ${name},</p>
        <p>${isSupplier ? `Le informamos que la orden de compra emitida a su representada <strong>${supplierName}</strong> ha sido cancelada en nuestro sistema comercial.` : "Se ha registrado la anulación de una orden de compra en el ERP."}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">N° de Orden:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${purchaseNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Proveedor:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">${supplierName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Monto total:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #dc2626; font-weight: bold;">${formattedTotal}</td>
          </tr>
        </table>

        <p>${isSupplier ? "Por favor, detenga cualquier proceso de despacho o facturación relacionado a este número de orden. Si tiene alguna duda, comuníquese con nuestro departamento de adquisiciones." : "Esta acción ha revertido los saldos proyectados de las cuentas por pagar y el inventario en tránsito programado."}</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #fca5a5;">
        <small style="color: #7f1d1d;">Este es un mensaje automático de control interno de ERP POS System.</small>
      </div>
    `,
  });
};

async function cancelPurchaseService(id) {
  // 1. Ejecutamos la anulación en base de datos mediante el repositorio
  const cancelledPurchase = await cancelPurchaseRepository(
    id,
    PURCHASE_STATUS.CANCELLED,
  );

  // 2. Buscamos información detallada para las notificaciones (proveedor y administrador de la empresa)
  try {
    const purchaseDetails = await prisma.purchase.findUnique({
      where: { id: Number(id) },
      include: {
        supplier: true,
      },
    });

    if (purchaseDetails) {
      const supplier = purchaseDetails.supplier;
      const purchaseNumber = purchaseDetails.purchaseNumber || `OC-${purchaseDetails.id}`;
      const total = purchaseDetails.total;
      const companyId = purchaseDetails.companyId;

      // Notificación A: Al Proveedor (si tiene correo registrado)
      if (supplier && supplier.email) {
        await sendPurchaseCancellationEmail({
          email: supplier.email,
          name: supplier.contactPerson || supplier.name,
          purchaseNumber,
          total,
          supplierName: supplier.name,
          isSupplier: true,
        });
      }

      // Notificación B: Al Administrador de la Empresa (por auditoría de egresos)
      const admin = await prisma.user.findFirst({
        where: {
          companyId: Number(companyId),
          role: "ADMIN",
        },
      });

      if (admin && admin.email) {
        await sendPurchaseCancellationEmail({
          email: admin.email,
          name: admin.name,
          purchaseNumber,
          total,
          supplierName: supplier ? supplier.name : "Sin Proveedor asignado",
          isSupplier: false,
        });
      }
    }
  } catch (emailError) {
    console.error("⚠️ Error enviando correos de cancelación de compra:", emailError.message || emailError);
  }

  return cancelledPurchase;
}

module.exports = {
  cancelPurchaseService,
};
