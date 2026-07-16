const PDFDocument = require("pdfkit");

exports.generateInventoryPDF = ({ inventory, company, img }) => {
  const doc = new PDFDocument({ size: "A4", margin: 35, layout: "landscape" });
  const headerX = img?.buffer ? 95 : 35;

  if (img?.buffer) {
    try { doc.image(img.buffer, 35, 35, { width: 50 }); } catch (_) { }
  }

  if (company) {
    doc.fontSize(12).font("Helvetica-Bold").fillColor("#1f2937").text(company.name || "", headerX, 35);
    doc.fontSize(9).font("Helvetica").fillColor("#4b5563").text(`RUC: ${company.ruc || ""}`, headerX, 49);
  }

  doc.fontSize(16).font("Helvetica-Bold").fillColor("#0f172a").text("Reporte de Control de Inventario", { align: "center" });
  doc.moveDown(1.5);

  const colWidths = { product: 212, branch: 130, stock: 65, reserved: 70, damaged: 65, available: 75, status: 85 };
  const tableWidth = Object.values(colWidths).reduce((a, b) => a + b, 0);
  const startX = 35;

  const drawTableHeader = (yPos) => {
    doc.rect(startX, yPos, tableWidth, 22).fill("#0f172a");
    doc.fillColor("#ffffff").fontSize(8).font("Helvetica-Bold");
    let currentX = startX;

    doc.text("PRODUCTO", currentX + 5, yPos + 7, { width: colWidths.product - 10 }); currentX += colWidths.product;
    doc.text("SUCURSAL / ALMACÉN", currentX + 5, yPos + 7, { width: colWidths.branch - 10 }); currentX += colWidths.branch;
    doc.text("STOCK TOT.", currentX + 5, yPos + 7, { width: colWidths.stock - 10, align: "right" }); currentX += colWidths.stock;
    doc.text("RESERVADO", currentX + 5, yPos + 7, { width: colWidths.reserved - 10, align: "right" }); currentX += colWidths.reserved;
    doc.text("DAÑADO", currentX + 5, yPos + 7, { width: colWidths.damaged - 10, align: "right" }); currentX += colWidths.damaged;
    doc.text("DISPONIBLE", currentX + 5, yPos + 7, { width: colWidths.available - 10, align: "right" }); currentX += colWidths.available;
    doc.text("ESTADO", currentX + 5, yPos + 7, { width: colWidths.status - 10, align: "center" });

    return yPos + 22;
  };

  let y = drawTableHeader(doc.y);
  let rowIndex = 0;

  for (const row of inventory) {
    const hProd = doc.heightOfString(row.productName, { width: colWidths.product - 10 });
    const rowHeight = Math.max(hProd, 16) + 8;

    if (y + rowHeight > doc.page.height - doc.page.margins.bottom - 20) {
      doc.addPage();
      y = drawTableHeader(doc.page.margins.top);
      rowIndex = 0;
    }

    if (rowIndex % 2 === 0) {
      doc.rect(startX, y, tableWidth, rowHeight).fill("#f9fafb");
    }

    doc.fillColor("#1f2937").fontSize(8.5).font("Helvetica");
    let cX = startX;

    doc.font("Helvetica-Bold").text(row.productName, cX + 5, y + 5, { width: colWidths.product - 10 }); doc.font("Helvetica"); cX += colWidths.product;
    doc.text(row.branchName, cX + 5, y + 5, { width: colWidths.branch - 10 }); cX += colWidths.branch;
    doc.text(String(row.stock), cX + 5, y + 5, { width: colWidths.stock - 10, align: "right" }); cX += colWidths.stock;
    doc.text(String(row.reservado), cX + 5, y + 5, { width: colWidths.reserved - 10, align: "right" }); cX += colWidths.reserved;

    if (row.danado > 0) doc.fillColor("#dc2626");
    doc.text(String(row.danado), cX + 5, y + 5, { width: colWidths.damaged - 10, align: "right" }); doc.fillColor("#1f2937"); cX += colWidths.damaged;
    doc.font("Helvetica-Bold").text(String(row.disponible), cX + 5, y + 5, { width: colWidths.available - 10, align: "right" }); doc.font("Helvetica"); cX += colWidths.available;

    let statusColor = "#16a34a";
    if (row.estado === "SIN STOCK") statusColor = "#dc2626";
    if (row.estado === "STOCK BAJO") statusColor = "#ca8a04";

    doc.fillColor(statusColor).font("Helvetica-Bold").text(row.estado, cX + 5, y + 5, { width: colWidths.status - 10, align: "center" });
    doc.moveTo(startX, y + rowHeight).lineTo(startX + tableWidth, y + rowHeight).strokeColor("#e5e7eb").lineWidth(0.5).stroke();

    y += rowHeight;
    rowIndex++;
  }

  doc.end();
  return doc;
};
