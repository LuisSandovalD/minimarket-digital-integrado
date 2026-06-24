// ============================================================================
// services/create-purchase.service.js
// CORREGIDO: Inclusión explícita del argumento 'total' requerido por el esquema
// ============================================================================

const { createPurchaseRepository } = require("../repositories/create-purchase.repository");

async function createPurchaseService(enrichedData) {
  let subtotalCounter = 0;

  // 1. Mapeamos los detalles calculando montos por ítem
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
      expirationDate: item.expirationDate ? new Date(item.expirationDate) : null
    };
  });

  // 2. Cálculos generales de la cabecera (IGV 18%)
  const subtotal = subtotalCounter;
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const discount = 0;
  const total = parseFloat((subtotal + tax).toFixed(2)); // 🔥 Aquí calculamos el total exacto (1486.8)

  // 3. Generar número correlativo dinámico único
  const now = new Date();
  const purchaseNumber = `PUR-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Date.now()}`;

  // 4. Estructurar la carga útil limpia para el repositorio
  const finalPurchaseData = {
    purchaseNumber,
    subtotal,
    tax,
    discount,
    total, // 👈 ¡FALTABA ESTO EN EL OBJETO! Con esto se soluciona el ValidationError
    status: "COMPLETED",
    notes: enrichedData.notes || null,
    expectedDelivery: enrichedData.expectedDelivery ? new Date(enrichedData.expectedDelivery) : null,
    buyerId: enrichedData.buyerId,
    branchId: enrichedData.branchId,
    companyId: enrichedData.companyId,
    supplierId: enrichedData.supplierId,
    details: {
      create: mappedDetails
    }
  };

  // 5. Enviar al repositorio con todas sus propiedades completas
  return await createPurchaseRepository(finalPurchaseData);
}

module.exports = {
  createPurchaseService
};