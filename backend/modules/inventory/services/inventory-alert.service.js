const prisma = require("../../../prisma/client");
const { sendEmail } = require("../../../config/email.config");

const sendLowStockAlertEmail = async ({ email, adminName, productName, currentStock, minStock }) => {
  if (!email) return;

  return await sendEmail({
    to: email,
    subject: `⚠️ ALERTA: Stock Crítico - ${productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #fee2e2; border-radius: 8px; background-color: #fef2f2;">
        <h2 style="color: #dc2626; margin-top: 0;">⚠️ Alerta de Inventario Crítico</h2>
        <p>Estimado(a) ${adminName},</p>
        <p>El stock de un artículo de tu catálogo ha caído por debajo de su nivel mínimo permitido:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #fca5a5;"><strong>Producto:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #fca5a5; text-align: right;">${productName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #fca5a5;"><strong>Stock Actual:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #fca5a5; text-align: right; color: #dc2626; font-weight: bold;">${currentStock} unidades</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #fca5a5;"><strong>Stock Mínimo:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #fca5a5; text-align: right;">${minStock} unidades</td>
          </tr>
        </table>

        <p>Por favor, realiza un pedido de reposición para evitar perder oportunidades de venta con tus clientes.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #fca5a5;">
        <small style="color: #7f1d1d;">Este correo electrónico es generado de manera automática por tu sistema de gestión SaaS.</small>
      </div>
    `,
  });
};

const sendExpiringProductsEmail = async ({ email, adminName, products }) => {
  if (!email || !products || products.length === 0) return;

  const productRows = products.map(product => {
    const formattedDate = new Date(product.expirationDate).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${product.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #ea580c; font-weight: bold;">${formattedDate}</td>
      </tr>
    `;
  }).join("");

  return await sendEmail({
    to: email,
    subject: "📅 Reporte: Productos por Vencer en los próximos 30 días",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ffedd5; border-radius: 8px; background-color: #fffbeb;">
        <h2 style="color: #d97706; margin-top: 0;">📅 Alerta Preventiva de Vencimiento</h2>
        <p>Estimado(a) ${adminName},</p>
        <p>El sistema ha detectado que los siguientes productos de tu inventario vencerán próximamente (menos de 30 días):</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background-color: #fef3c7;">
              <th style="padding: 10px; text-align: left; font-size: 13px; color: #92400e;">Producto</th>
              <th style="padding: 10px; text-align: center; font-size: 13px; color: #92400e;">Fecha de Expiración</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <p>Considera crear ofertas relámpago, promociones o coordinar la rotación de estos lotes para evitar pérdidas.</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #fed7aa;">
        <small style="color: #7c2d12;">Este reporte es emitido automáticamente por el control inteligente de lotes.</small>
      </div>
    `,
  });
};

exports.checkLowStock = async (inventory) => {
  const product = await prisma.product.findUnique({
    where: {
      id: inventory.productId,
    },
  });

  if (!product) return;

  if (inventory.stock <= product.minStock) {
    const admin = await prisma.user.findFirst({
      where: {
        companyId: product.companyId,
        role: "ADMIN",
      },
    });

    if (!admin) return;

    await prisma.notification.create({
      data: {
        title: "Stock Bajo",
        message: `El producto ${product.name} tiene stock bajo`,
        type: "LOW_STOCK",
        productId: product.id,
        companyId: product.companyId,
        userId: admin.id,
      },
    });

    if (admin.email) {
      try {
        await sendLowStockAlertEmail({
          email: admin.email,
          adminName: admin.name,
          productName: product.name,
          currentStock: inventory.stock,
          minStock: product.minStock,
        });
      } catch (emailError) {
        console.error("⚠️ Error enviando correo de stock bajo:", emailError.message || emailError);
      }
    }
  }
};

exports.checkExpiringProducts = async (companyId) => {
  const next30Days = new Date();
  next30Days.setDate(next30Days.getDate() + 30);

  const products = await prisma.product.findMany({
    where: {
      companyId,
      expirationDate: {
        lte: next30Days,
      },
      requiresExpiration: true,
    },
  });

  if (products.length > 0) {
    const admin = await prisma.user.findFirst({
      where: {
        companyId,
        role: "ADMIN",
      },
    });

    if (admin && admin.email) {
      try {
        await sendExpiringProductsEmail({
          email: admin.email,
          adminName: admin.name,
          products,
        });
      } catch (emailError) {
        console.error("⚠️ Error enviando correo de reporte de vencimientos:", emailError.message || emailError);
      }
    }
  }

  return products;
};
