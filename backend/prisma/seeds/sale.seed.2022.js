// ============================================================================
// prisma/seeds/sale.seed.2022.js
// Ventas distribuidas exclusivamente en el año 2022 - Multiempresa y Multisucursal
// ============================================================================

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const YEAR = 2022;

// Volumen de ventas relativo a la cantidad de productos de cada empresa.
const SALE_TO_PRODUCT_RATIO_MIN = 1.2;
const SALE_TO_PRODUCT_RATIO_MAX = 2.0;

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

const generateDateForYear = (currentStep, totalRecords, year) => {
  const startDate = new Date(`${year}-01-01T08:30:00`);
  const endDate = new Date(`${year}-12-31T20:00:00`);

  const totalTimeRange = endDate.getTime() - startDate.getTime();
  const incrementalTime = (totalTimeRange / totalRecords) * currentStep;

  const targetDate = new Date(startDate.getTime() + incrementalTime);
  const randomHour = 8 + Math.floor(Math.random() * 12);
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

async function saleJsonPayloadSeed2022() {
  console.log(`🚀 Iniciando carga masiva de Ventas exclusivamente del año ${YEAR} para todas las empresas...`);

  const allCompanies = await prisma.company.findMany({ select: { id: true, name: true } });

  if (allCompanies.length === 0) {
    throw new Error("❌ Asegúrate de tener registros en la tabla Company antes de ejecutar.");
  }

  let grandTotalVentas = 0;
  let grandVentasOmitidas = 0;
  let grandAlertas = 0;

  for (const currentCompany of allCompanies) {
    const companyId = currentCompany.id;

    // Traemos todas las sucursales para distribuir las ventas de forma equitativa
    const allBranches = await prisma.branch.findMany({ where: { companyId }, select: { id: true } });
    const seller = await prisma.user.findFirst({ where: { companyId }, select: { id: true } });
    const allProducts = await prisma.product.findMany({ where: { companyId }, select: { id: true, salePrice: true } });
    const allCustomers = await prisma.customer.findMany({ where: { companyId }, select: { id: true } });

    // Validación estricta preventiva
    if (allBranches.length === 0 || !seller || allProducts.length === 0 || allCustomers.length === 0) {
      console.warn(`⚠️ Empresa "${currentCompany.name}" (ID ${companyId}) omitida: Faltan sucursales, productos, clientes o usuarios.`);
      continue;
    }

    let paymentMethod = await prisma.paymentMethod_DB.findFirst({
      where: { companyId, isActive: true },
    });

    if (!paymentMethod) {
      paymentMethod = await prisma.paymentMethod_DB.create({
        data: { name: "Efectivo Caja General", type: "CASH", isActive: true, companyId },
      });
    }

    const ratio = SALE_TO_PRODUCT_RATIO_MIN + Math.random() * (SALE_TO_PRODUCT_RATIO_MAX - SALE_TO_PRODUCT_RATIO_MIN);
    const totalRecords = Math.max(60, Math.floor(allProducts.length * ratio));

    console.log(`🏢 Empresa: "${currentCompany.name}" → Generando ${totalRecords} ventas distribuidas en sus sucursales...`);

    let companyCounter = 1;
    let ventasOmitidas = 0;
    let alertasGeneradas = 0;
    const seedBatchId = Math.random().toString(36).substring(2, 6).toUpperCase();

    for (let i = 0; i < totalRecords; i++) {
      const historicalDate = generateDateForYear(companyCounter, totalRecords, YEAR);
      const randomCustomer = allCustomers[Math.floor(Math.random() * allCustomers.length)];

      // Cada venta ocurre de manera dinámica en una sucursal específica
      const targetBranch = allBranches[Math.floor(Math.random() * allBranches.length)];

      const detailCount = Math.floor(Math.random() * 4) + 1;
      const selectedProducts = shuffleArray(allProducts).slice(0, detailCount);

      const rawDetails = selectedProducts.map(p => {
        const quantity = Math.floor(Math.random() * 10) + 1;
        const variation = 1 + (Math.random() * 0.10 - 0.05);
        const salePrice = parseFloat((Number(p.salePrice) * variation).toFixed(2));
        return { productId: p.id, quantity, salePrice };
      });

      // Validar stock ANTES de abrir la transacción apuntando específicamente a la sucursal destino
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
        grandVentasOmitidas++;
        companyCounter++;
        continue;
      }

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
        const discount = 0.00;

        const saleNumber = `VEN-${YEAR}-${String(companyId).padStart(2, "0")}-${seedBatchId}-${String(companyCounter).padStart(4, "0")}`;
        const esCredito = Math.random() < 0.30;
        const status = esCredito ? "PENDING" : "COMPLETED";
        const porcentaje = esCredito ? (0.20 + Math.random() * 0.30) : 1.0;
        const initialPayment = parseFloat((cabeceraTotal * porcentaje).toFixed(2));
        const note = poolNotes[i % poolNotes.length];

        // 1. Registro de la Venta Cabecera
        const newSale = await tx.sale.create({
          data: {
            saleNumber,
            subtotal: cabeceraSubtotal,
            tax: cabeceraTax,
            discount,
            total: cabeceraTotal,
            status,
            notes: `${note} | Sucursal Origen: ID ${targetBranch.id}`,
            createdAt: historicalDate,
            updatedAt: historicalDate,
            sellerId: seller.id,
            branchId: targetBranch.id,
            companyId,
            customerId: randomCustomer.id,
          },
        });

        // 2. Registro del Flujo de Pago
        await tx.payment.create({
          data: {
            amount: initialPayment,
            status: "COMPLETED",
            paymentMethod: paymentMethod.id,
            reference: esCredito ? `INICIAL-${saleNumber}` : `COBRO-${saleNumber}`,
            transactionId: `TX-${YEAR}-${Math.floor(100000 + Math.random() * 900000)}`,
            notes: esCredito ? "Amortización parcial inicial." : "Liquidación total en punto de venta.",
            paidAt: historicalDate,
            createdAt: historicalDate,
            updatedAt: historicalDate,
            saleId: newSale.id,
          },
        });

        // 3. Detalles de Venta e Impacto de Inventario
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
              discount: detail.discount,
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

            // Movimiento del Kárdex de la Sucursal correspondiente
            await tx.inventoryHistory.create({
              data: {
                type: "SALE",
                quantity: detail.quantity,
                previousStock,
                newStock,
                reason: `Salida de inventario ${YEAR}: venta ${saleNumber} en sucursal ${targetBranch.id}`,
                reference: saleNumber,
                productId: detail.productId,
                inventoryId: currentInventory.id,
                branchId: targetBranch.id,
                companyId,
                createdAt: historicalDate,
              },
            });

            // Gestión de alertas por Stock Crítico
            if (newStock < 20) {
              alertasGeneradas++;
              grandAlertas++;
              await tx.notification.create({
                data: {
                  title: "⚠️ Stock Crítico en Almacén",
                  message: `Producto ID: ${detail.productId} bajó del límite en Sucursal ${targetBranch.id}. Stock remanente: ${newStock} unidades.`,
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
      grandTotalVentas++;
    }

    console.log(`   ✅ Empresa ID ${companyId}: ${companyCounter - 1 - ventasOmitidas} ventas creadas, ${ventasOmitidas} omitidas por falta de stock.`);
  }

  console.log("\n======================================================");
  console.log(`✅ [${YEAR}] SEED COMPLETADO: ventas inyectadas con IGV reconciliado en todas las empresas.`);
  console.log(`📊 Total global de ventas creadas: ${grandTotalVentas}`);
  console.log(`⏭️  Total de ventas omitidas por stock insuficiente: ${grandVentasOmitidas}`);
  console.log(`🔔 Total de alertas de inventario registradas: ${grandAlertas}`);
  console.log("======================================================");
}

// Bloque de ejecución segura e independiente
if (require.main === module) {
  saleJsonPayloadSeed2022()
    .catch((e) => {
      console.error("❌ Error detectado en el proceso de seed de ventas [2022]:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { saleJsonPayloadSeed2022 };
