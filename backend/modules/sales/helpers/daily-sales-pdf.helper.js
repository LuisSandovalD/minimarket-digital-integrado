const PDFDocument = require("pdfkit");

exports.generateDailySalesPDF = ({ report, company, img, formatCurrency }) => {
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const headerX = img?.buffer ? 110 : 40;
  const headerY = 45;

  if (img?.buffer) {
    try {
      doc.image(img.buffer, 40, 40, { width: 60 });
    } catch (_) {
      /* Silenciar error si la imagen no se puede decodificar o cargar */
    }
  }

  if (company) {
    doc.fillColor("#1f2937").fontSize(14).font("Helvetica-Bold").text(company.name || "", headerX, headerY);
    doc.fillColor("#4b5563").fontSize(9).font("Helvetica").text(`RUC: ${company.ruc || ""}`, headerX, headerY + 18);
  }

  doc.fillColor("#0f172a").fontSize(16).font("Helvetica-Bold").text("Reporte Diario de Ventas", { align: "center" });
  doc.moveDown(1.5);

  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const colWidths = { venta: 110, cliente: 120, subtotal: 65, descuento: 65, total: 75, productos: 80 };
  let y = doc.y;

  const drawHeaders = (yPos) => {
    doc.rect(40, yPos, pageWidth, 24).fill("#0f172a");
    doc.fillColor("#ffffff").fontSize(9).font("Helvetica-Bold");
    doc.text("VENTA", 45, yPos + 7, { width: colWidths.venta - 10 });
    doc.text("CLIENTE", 40 + colWidths.venta + 5, yPos + 7, { width: colWidths.cliente - 10 });
    doc.text("SUBTOTAL", 40 + colWidths.venta + colWidths.cliente + 5, yPos + 7, { width: colWidths.subtotal - 10, align: "right" });
    doc.text("DESCUENTO", 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + 5, yPos + 7, { width: colWidths.descuento - 10, align: "right" });
    doc.text("TOTAL", 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, yPos + 7, { width: colWidths.total - 10, align: "right" });
    doc.text("PRODUCTOS", 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + colWidths.total + 5, yPos + 7, { width: colWidths.productos - 10, align: "center" });
    return yPos + 24;
  };

  y = drawHeaders(y);
  let totalSum = 0;

  for (const row of report) {
    if (y > doc.page.height - doc.page.margins.bottom - 30) {
      doc.addPage();
      y = drawHeaders(doc.page.margins.top);
    }

    doc.moveTo(40, y).lineTo(40 + pageWidth, y).strokeColor("#e5e7eb").lineWidth(0.5).stroke();

    const ventaText = row.code || row.id || row.description || "-";
    const clienteText = row.customerName || row.client || row.label || "Cliente General";
    const subtotal = Number(row.subtotal || 0);
    const descuento = Number(row.discount || 0);
    const total = Number(row.total || row.amount || 0);
    const productosCount = row.productsCount || row.quantity || 1;

    totalSum += total;

    doc.fillColor("#3b82f6").font("Helvetica-Bold").fontSize(9).text(ventaText, 45, y + 6, { width: colWidths.venta - 10 });
    doc.fillColor("#1f2937").font("Helvetica").fontSize(9).text(clienteText, 40 + colWidths.venta + 5, y + 6, { width: colWidths.cliente - 10 });
    doc.fillColor("#2563eb").text(formatCurrency(subtotal), 40 + colWidths.venta + colWidths.cliente + 5, y + 6, { width: colWidths.subtotal - 10, align: "right" });
    doc.fillColor("#4b5563").text(formatCurrency(descuento), 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + 5, y + 6, { width: colWidths.descuento - 10, align: "right" });
    doc.fillColor("#000000").font("Helvetica-Bold").text(formatCurrency(total), 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, y + 6, { width: colWidths.total - 10, align: "right" });
    doc.fillColor("#1f2937").font("Helvetica").text(`${productosCount} Productos`, 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + colWidths.total + 5, y + 6, { width: colWidths.productos - 10, align: "center" });

    y += 22;
  }

  doc.moveTo(40, y).lineTo(40 + pageWidth, y).strokeColor("#9ca3af").lineWidth(1).stroke();
  doc.fillColor("#000000").font("Helvetica-Bold").fontSize(10);
  doc.text("TOTAL GENERAL", 45, y + 8, { width: colWidths.venta + colWidths.cliente });
  doc.text(formatCurrency(totalSum), 40 + colWidths.venta + colWidths.cliente + colWidths.subtotal + colWidths.descuento + 5, y + 8, { width: colWidths.total - 10, align: "right" });

  doc.end();
  return doc;
};
