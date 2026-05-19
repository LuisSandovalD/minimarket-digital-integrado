// ========================================
// utils/exportBarcodesPDF.js
// ========================================

import jsPDF
  from "jspdf";

import generateBarcodeSVG
  from "./generateBarcodeSVG";

export default async function
exportBarcodesPDF(
  products
) {

  if (!products.length) {

    alert(
      "Selecciona productos"
    );

    return;
  }

  // ========================================
  // PDF
  // ========================================

  const pdf =
    new jsPDF({
      orientation:
        "portrait",
      unit: "mm",
      format: "a4",
    });

  // ========================================
  // LABEL CONFIG
  // ========================================

  const labelWidth = 60;

  const labelHeight = 35;

  const columns = 3;

  let x = 10;

  let y = 10;

  // ========================================
  // PRODUCTS
  // ========================================

  for (
    let i = 0;
    i < products.length;
    i++
  ) {

    const product =
      products[i];

    // ========================================
    // GENERATE SVG
    // ========================================

    const svg =
      generateBarcodeSVG(
        product.barcode
      );

    // ========================================
    // SVG TO STRING
    // ========================================

    const svgData =
      new XMLSerializer()
        .serializeToString(
          svg
        );

    // ========================================
    // SVG TO IMAGE
    // ========================================

    const canvas =
      document.createElement(
        "canvas"
      );

    const ctx =
      canvas.getContext("2d");

    const img =
      new Image();

    const svgBlob =
      new Blob(
        [svgData],
        {
          type:
            "image/svg+xml;charset=utf-8",
        }
      );

    const url =
      URL.createObjectURL(
        svgBlob
      );

    // ========================================
    // WAIT IMAGE
    // ========================================

    await new Promise(
      resolve => {

        img.onload = () => {

          canvas.width =
            img.width;

          canvas.height =
            img.height;

          ctx.drawImage(
            img,
            0,
            0
          );

          const imgData =
            canvas.toDataURL(
              "image/png"
            );

          // ========================================
          // CARD
          // ========================================

          pdf.setDrawColor(
            220
          );

          pdf.roundedRect(
            x,
            y,
            labelWidth,
            labelHeight,
            2,
            2
          );

          // ========================================
          // NAME
          // ========================================

          pdf.setFontSize(10);

          pdf.text(
            product.name,
            x + 3,
            y + 5
          );

          // ========================================
          // PRICE
          // ========================================

          pdf.setFontSize(9);

          pdf.text(
            `S/ ${product.salePrice}`,
            x + 3,
            y + 10
          );

          // ========================================
          // BARCODE
          // ========================================

          pdf.addImage(
            imgData,
            "PNG",
            x + 3,
            y + 12,
            52,
            15
          );

          // ========================================
          // CODE
          // ========================================

          pdf.setFontSize(7);

          pdf.text(
            product.barcode,
            x + 3,
            y + 31
          );

          URL.revokeObjectURL(
            url
          );

          resolve();
        };

        img.src = url;
      }
    );

    // ========================================
    // GRID
    // ========================================

    if (
      (i + 1) % columns === 0
    ) {

      x = 10;

      y += 40;

    } else {

      x += 65;
    }

    // ========================================
    // NEW PAGE
    // ========================================

    if (y > 250) {

      pdf.addPage();

      x = 10;

      y = 10;
    }
  }

  // ========================================
  // SAVE
  // ========================================

  pdf.save(
    "barcodes.pdf"
  );
}