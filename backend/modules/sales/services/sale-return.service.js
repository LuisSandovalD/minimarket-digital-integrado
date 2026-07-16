// ========================================
// services/sale-return.service.js
// ========================================

const prisma = require("../../../prisma/client");

const returnSaleService = async (saleId, items = []) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Verificar que la venta exista
    const sale = await tx.sale.findUnique({
      where: { id: Number(saleId) },
      include: { items: true }, // Asumiendo que tu relación se llama items o saleDetails
    });

    if (!sale) throw new Error("La venta especificada no existe.");

    // 2. Procesar cada producto devuelto
    for (const item of items) {
      // Devolver el stock al inventario
      await tx.product.update({
        where: { id: Number(item.productId) },
        data: {
          stock: { increment: Number(item.quantity) },
        },
      });

      // Opcional: Aquí podrías registrar el movimiento en tu tabla de Kárdex/Inventario
    }

    // 3. Cambiar el estado de la venta si se devolvió por completo
    const updatedSale = await tx.sale.update({
      where: { id: Number(saleId) },
      data: {
        status: "RETURNED", // O el estado que manejes para devoluciones
      },
    });

    return {
      saleId,
      status: "RETURNED",
      itemsProcessed: items.length,
    };
  });
};

module.exports = {
  returnSaleService,
};
