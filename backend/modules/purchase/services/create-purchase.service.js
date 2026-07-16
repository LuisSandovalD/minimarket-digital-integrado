const prisma = require("../../../prisma/client");
const { createPurchaseRepository } = require("../repositories/create-purchase.repository");
const { sendEmail } = require("../../../config/email.config");

const sendPurchaseOrderEmail = async ({ email, name, purchaseNumber, total, details, supplierName, notes }) => {
  if (!email) return;

  const formattedTotal = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(Number(total || 0));

  const productRows = details.map(item => {
    const itemSubtotal = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(Number(item.quantity) * Number(item.price));

    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">Producto ID: ${item.productId}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">${itemSubtotal}</td>
      </tr>
    `;
  }).join("");

  return await sendEmail({
    to: email,
    subject: `Nueva Orden de Compra Emitida - N° ${purchaseNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 650px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">Confirmación de Orden de Compra</h2>
        <p>Estimado(a) <strong>${name}</strong>,</p>
        <p>Se ha generado y registrado de manera exitosa una nueva orden de compra dirigida a <strong>${supplierName}</strong>.</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 4px 0;"><strong>N° de Orden:</strong> ${purchaseNumber}</p>
          <p style="margin: 4px 0;"><strong>Proveedor Destino:</strong> ${supplierName}</p>
          ${notes ? `<p style="margin: 4px 0;"><strong>Notas:</strong> ${notes}</p>` : ""}
        </div>

        <h3 style="color: #1e293b;">Detalle de ítems solicitados:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f1f5f9;">
              <th style="padding: 8px; text-align: left; font-size: 13px;">Item</th>
              <th style="padding: 8px; text-align: center; font-size: 13px;">Cantidad</th>
              <th style="padding: 8px; text-align: right; font-size: 13px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <h3 style="text-align: right; color: #1e293b; margin-top: 20px;">Monto total de la compra: <span style="color: #2563eb;">${formattedTotal}</span></h3>
        <br>
        <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        <small style="color: #64748b;">Este es un documento comercial electrónico automatizado por ERP POS System.</small>
      </div>
    `,
  });
};

async function createPurchaseService(enrichedData) {
  let subtotalCounter = 0;

  const mappedDetails = enrichedData.details.map(item => {
    const itemSubtotal = item.quantity * item.costPrice;
    subtotalCounter += itemSubtotal;

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.costPrice,
      subtotal: itemSubtotal,
      tax: 0,
      batchNumber: item.batchNumber || null,
      expirationDate: item.expirationDate ? new Date(item.expirationDate) : null,
    };
  });

  const subtotal = subtotalCounter;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const discount = 0;
  const total = parseFloat((subtotal + tax).toFixed(2));

  const now = new Date();
  const purchaseNumber = `PUR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Date.now()}`;

  const finalPurchaseData = {
    purchaseNumber,
    subtotal,
    tax,
    discount,
    total,
    status: "COMPLETED",
    notes: enrichedData.notes || null,
    expectedDelivery: enrichedData.expectedDelivery ? new Date(enrichedData.expectedDelivery) : null,
    buyerId: enrichedData.buyerId,
    branchId: enrichedData.branchId,
    companyId: enrichedData.companyId,
    supplierId: enrichedData.supplierId,
    details: {
      create: mappedDetails,
    },
  };

  const createdPurchase = await createPurchaseRepository(finalPurchaseData);

  // ========================================
  // ENVÍO DE NOTIFICACIONES DE COMPRA (ASÍNCRONO)
  // ========================================
  try {
    const purchaseWithSupplier = await prisma.purchase.findUnique({
      where: { id: createdPurchase.id },
      include: {
        supplier: true,
      },
    });

    if (purchaseWithSupplier) {
      const supplier = purchaseWithSupplier.supplier;

      // 1. Notificación al Proveedor (si tiene correo registrado)
      if (supplier && supplier.email) {
        await sendPurchaseOrderEmail({
          email: supplier.email,
          name: supplier.contactPerson || supplier.name,
          purchaseNumber,
          total,
          details: mappedDetails,
          supplierName: supplier.name,
          notes: enrichedData.notes,
        });
      }

      // 2. Notificación al Administrador del ERP (para control interno de egresos)
      const admin = await prisma.user.findFirst({
        where: {
          companyId: enrichedData.companyId,
          role: "ADMIN",
        },
      });

      if (admin && admin.email) {
        await sendPurchaseOrderEmail({
          email: admin.email,
          name: admin.name,
          purchaseNumber,
          total,
          details: mappedDetails,
          supplierName: supplier ? supplier.name : "Sin Proveedor Registrado",
          notes: enrichedData.notes,
        });
      }
    }
  } catch (emailError) {
    console.error("⚠️ Error enviando correos de confirmación de compra:", emailError.message || emailError);
  }

  return createdPurchase;
}

module.exports = {
  createPurchaseService,
};
