// ============================================================================
// prisma/seeds/sale.seed.dynamic.js
// Ventas distribuidas desde 2022 hasta el presente - Exclusivo Don Lucho
// ============================================================================

const prisma = require("../client"); // Cliente compartido para evitar problemas de concurrencia

const START_YEAR = 2022;
const CURRENT_YEAR = new Date().getFullYear(); // Evaluará dinámicamente hasta el año en curso (2026)

// Volumen de ventas relativo por año para mantener un crecimiento realista sin vaciar el stock
const SALE_TO_PRODUCT_RATIO_MIN = 1.0;
const SALE_TO_PRODUCT_RATIO_MAX = 1.6;

const poolNotes = [
  "Venta minorista de mostrador a cliente final",
  "Despacho regular a cliente recurrente de la zona",
  "Venta de fin de semana - alta demanda en tienda",
  "Atención corporativa express a cliente institucional",
  "Pedido programado de reposición para el cliente",
  "Venta rápida de productos de rotación alta",
  "Compra combinada de varios artículos en una sola boleta",
  "Cliente frecuente realiza pedido habitual",
  "Venta al crédito con pago inicial parcial",
  "Liquidación de stock por temporada",
  "Venta express en horario pico",
  "Pedido especial solicitado con anticipación",
];

// Genera una fecha progresiva y realista dentro del año evaluado
const generateDateForYear = (currentStep, totalRecords, year) => {
  const isCurrentYear = year === CURRENT_YEAR;
  const startDate = new Date(`${year}-01-01T08:30:00`);
  // Si es el año actual, solo generamos ventas hasta el día de hoy
  const endDate = isCurrentYear ? new Date() : new Date(`${year}-12-31T20:00:00`);

  const totalTimeRange = endDate.getTime() - startDate.getTime();
  const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

  const targetDate = new Date(startDate.getTime() + incrementalTime);
  const randomHour = 8 + Math.floor(Math.random() * 12); // Horario comercial: 8:00 AM - 8:00 PM
  const randomMinute = Math.floor(Math.random() * 60);
  targetDate.setHours(randomHour, randomMinute, 0, 0);

  return targetDate;
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

async function saleJsonPayloadSeed() {
  console.log(`🚀 Iniciando carga masiva histórica de Ventas (${START_YEAR} - ${CURRENT_YEAR}) para Minimarket Don Lucho...`);

  // 1. Obtener la empresa por su slug
  const company = await prisma.company.findFirst({
    where: { slug: "minimarket-don-lucho" },
  });

  if (!company) {
    throw new Error("❌ Error: No se encontró la empresa 'Minimarket Don Lucho'. Ejecuta admin.seed primero.");
  }

  const companyId = company.id;

  // 2. Traer registros relacionados requeridos
  const allBranches = await prisma.branch.findMany({ where: { companyId }, select: { id: true } });
  const seller = await prisma.user.findFirst({ where: { companyId }, select: { id: true } });
  const allProducts = await prisma.product.findMany({ where: { companyId }, select: { id: true, salePrice: true } });
  const allCustomers = await prisma.customer.findMany({ where: { companyId }, select: { id: true } });

  if (allBranches.length === 0 || !seller || allProducts.length === 0 || allCustomers.length === 0) {
    console.warn("⚠️ Minimarket Don Lucho omitido: Faltan registrar sucursales, productos, clientes o usuarios.");
    return;
  }

  // 3. Obtener o estructurar el método de pago base
  let paymentMethod = await prisma.paymentMethod_DB.findFirst({
    where: { companyId, isActive: true },
  });

  if (!paymentMethod) {
    paymentMethod = await prisma.paymentMethod_DB.create({
      data: { name: "Efectivo Caja General", type: "CASH", isActive: true, companyId },
    });
  }

  let totalGlobalVentas = 0;
  let totalGlobalOmitidas = 0;
  let totalGlobalAlertas = 0;

  // 4. Bucle temporal año por año
  for (let year = START_YEAR; year <= CURRENT_YEAR; year++) {
    const ratio = SALE_TO_PRODUCT_RATIO_MIN + Math.random() * (SALE_TO_PRODUCT_RATIO_MAX - SALE_TO_PRODUCT_RATIO_MIN);
    const totalRecords = Math.max(50, Math.floor(allProducts.length * ratio));

    console.log(`📅 Año ${year} → Generando ${totalRecords} transacciones comerciales...`);

    let companyCounter = 1;
    let ventasOmitidas = 0;
    let alertasGeneradas = 0;
    let ventasAnioCreadas = 0;
    const seedBatchId = Math.random().toString(36).substring(2, 6).toUpperCase();

    for (let i = 0; i < totalRecords; i++) {
      const historicalDate = generateDateForYear(companyCounter, totalRecords, year);
      const randomCustomer = allCustomers[Math.floor(Math.random() * allCustomers.length)];
      const targetBranch = allBranches[Math.floor(Math.random() * allBranches.length)];

      const detailCount = Math.floor(Math.random() * 3) + 1; // 1 a 3 productos distintos por boleta
      const selectedProducts = shuffleArray(allProducts).slice(0, detailCount);

      const rawDetails = selectedProducts.map(p => {
        const quantity = Math.floor(Math.random() * 4) + 1; // Cantidades moderadas (1 a 4 unidades) para no agotar stock rápidamente
        const variation = 1 + (Math.random() * 0.08 - 0.04); // +/- 4% de oscilación en el precio final
        const salePrice = parseFloat((Number(p.salePrice) * variation).toFixed(2));
        return { productId: p.id, quantity, salePrice };
      });

      // Validar stock antes de persistir
      let todosConStock = true;
      for (const detail of rawDetails) {
        const inv = await prisma.inventory.findUnique({
          where: { productId_branchId: { productId: detail.productId, branchId: targetBranch.id } },
        });
        if (!inv || inv.stock < detail.quantity) {
          todosConStock = false;
          break;
        }
      }

      if (!todosConStock) {
        ventasOmitidas++;
        totalGlobalOmitidas++;
        companyCounter++;
        continue;
      }

      // Procesamiento de transacción atómica
      await prisma.$transaction(async (tx) => {
        let cabeceraSubtotal = 0;
        let cabeceraTax = 0;
        let cabeceraTotal = 0;

        const computedDetails = rawDetails.map(d => {
          const totalLinea = d.quantity * d.salePrice;
          const subtotalLinea = parseFloat((totalLinea / 1.18).toFixed(2));
          const taxLinea = parseFloat((totalLinea - subtotalLinea).toFixed(2));

          cabeceraSubtotal += subtotalLinea;
          cabeceraTax += taxLinea;
          cabeceraTotal += totalLinea;

          return {
            productId: d.productId,
            quantity: d.quantity,
            price: d.salePrice,
            subtotal: subtotalLinea,
            tax: taxLinea,
            discount: 0.00,
          };
        });

        cabeceraSubtotal = parseFloat(cabeceraSubtotal.toFixed(2));
        cabeceraTax = parseFloat(cabeceraTax.toFixed(2));
        cabeceraTotal = parseFloat(cabeceraTotal.toFixed(2));

        const saleNumber = `VEN-${year}-${String(companyId).padStart(2, "0")}-${seedBatchId}-${String(companyCounter).padStart(4, "0")}`;
        const esCredito = Math.random() < 0.15; // Un porcentaje menor para mantener liquidez saludable
        const status = esCredito ? "PENDING" : "COMPLETED";
        const porcentaje = esCredito ? (0.30 + Math.random() * 0.30) : 1.0;
        const initialPayment = parseFloat((cabeceraTotal * porcentaje).toFixed(2));
        const note = poolNotes[i % poolNotes.length];

        // A. Crear Venta Cabecera
        const newSale = await tx.sale.create({
          data: {
            saleNumber,
            subtotal: cabeceraSubtotal,
            tax: cabeceraTax,
            discount: 0.00,
            total: cabeceraTotal,
            status,
            notes: `${note} | Sucursal: ID ${targetBranch.id}`,
            createdAt: historicalDate,
            updatedAt: historicalDate,
            sellerId: seller.id,
            branchId: targetBranch.id,
            companyId,
            customerId: randomCustomer.id,
          },
        });

        // B. Crear Pago
        await tx.payment.create({
          data: {
            amount: initialPayment,
            status: "COMPLETED",
            paymentMethod: paymentMethod.id,
            reference: esCredito ? `INICIAL-${saleNumber}` : `COBRO-${saleNumber}`,
            transactionId: `TX-${year}-${Math.floor(100000 + Math.random() * 900000)}`,
            notes: esCredito ? "Pago parcial inicial registrado." : "Pago completo en punto de venta.",
            paidAt: historicalDate,
            createdAt: historicalDate,
            updatedAt: historicalDate,
            saleId: newSale.id,
          },
        });

        // C. Registrar Detalle, Lotes e Historial
        for (const detail of computedDetails) {
          const availableBatch = await tx.productBatch.findFirst({
            where: { productId: detail.productId, branchId: targetBranch.id, currentQuantity: { gte: detail.quantity } },
            orderBy: { expirationDate: "asc" },
          });

          await tx.saleDetail.create({
            data: {
              saleId: newSale.id,
              productId: detail.productId,
              quantity: detail.quantity,
              price: detail.price,
              subtotal: detail.subtotal,
              tax: detail.tax,
              discount: 0.00,
              batchId: availableBatch ? availableBatch.id : null,
            },
          });

          if (availableBatch) {
            await tx.productBatch.update({
              where: { id: availableBatch.id },
              data: { currentQuantity: { decrement: detail.quantity }, updatedAt: historicalDate },
            });
          }

          const currentInventory = await tx.inventory.findUnique({
            where: { productId_branchId: { productId: detail.productId, branchId: targetBranch.id } },
          });

          if (currentInventory) {
            const previousStock = currentInventory.stock;
            const newStock = previousStock - detail.quantity;

            await tx.inventory.update({
              where: { id: currentInventory.id },
              data: { stock: newStock, lastUpdated: historicalDate },
            });

            await tx.inventoryHistory.create({
              data: {
                type: "SALE",
                quantity: detail.quantity,
                previousStock,
                newStock,
                reason: `Salida de inventario ${year}: venta ${saleNumber} en sucursal ${targetBranch.id}`,
                reference: saleNumber,
                productId: detail.productId,
                inventoryId: currentInventory.id,
                branchId: targetBranch.id,
                companyId,
                createdAt: historicalDate,
              },
            });

            if (newStock < 15) { // Límite de alerta preventiva
              alertasGeneradas++;
              totalGlobalAlertas++;
              await tx.notification.create({
                data: {
                  title: "⚠️ Stock Crítico",
                  message: `Producto ID: ${detail.productId} bajó de la reserva de seguridad en Sucursal ${targetBranch.id}. Stock actual: ${newStock} unidades.`,
                  type: "LOW_STOCK",
                  isRead: true,
                  userId: seller.id,
                  productId: detail.productId,
                  companyId,
                  createdAt: historicalDate,
                },
              });
            }
          }
        }
      });

      companyCounter++;
      ventasAnioCreadas++;
      totalGlobalVentas++;
    }

    console.log(`   └─ ✅ Año ${year} completado: ${ventasAnioCreadas} creadas | ${ventasOmitidas} omitidas por stock.`);
  }

  console.log("\n======================================================");
  console.log("⭐ SEED INTEGRAL HISTÓRICO DE VENTAS COMPLETADO");
  console.log(`📊 Período evaluado: [${START_YEAR} - ${CURRENT_YEAR}]`);
  console.log(`📊 Total transacciones procesadas con éxito: ${totalGlobalVentas}`);
  console.log(`⏭️  Total transacciones omitidas temporalmente: ${totalGlobalOmitidas}`);
  console.log(`🔔 Total alertas críticas enviadas: ${totalGlobalAlertas}`);
  console.log("======================================================");
}

if (require.main === module) {
  saleJsonPayloadSeed()
    .catch((e) => {
      console.error("❌ Error detectado en el proceso de seed histórico de ventas:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { saleJsonPayloadSeed };
