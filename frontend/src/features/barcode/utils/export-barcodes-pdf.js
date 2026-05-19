// ========================================
// features/barcodes/utils/export-barcodes-pdf.js
// ========================================

import JsBarcode
  from "jsbarcode";

import jsPDF
  from "jspdf";

export async function exportBarcodesPDF(
  selectedProducts
) {

  if (
    selectedProducts.length === 0
  ) {

    alert(
      "Selecciona productos"
    );

    return;
  }

  const pdf =
    new jsPDF({
      orientation:
        "portrait",

      unit: "mm",

      format: "a4",
    });

  const labelWidth = 60;

  const labelHeight = 35;

  const columns = 3;

  let x = 10;

  let y = 10;

  for (
    let i = 0;
    i < selectedProducts.length;
    i++
  ) {

    const product =
      selectedProducts[i];

    // ======================================
    // CREATE SVG
    // ======================================

    const svg =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );

    JsBarcode(
      svg,
      product.barcode,
      {
        format: "CODE128",

        width: 1.5,

        height: 35,

        displayValue: true,

        margin: 0,

        fontSize: 10,
      }
    );

    const svgData =
      new XMLSerializer()
        .serializeToString(
          svg
        );

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

          // ======================================
          // LABEL
          // ======================================

          pdf.setDrawColor(
            230
          );

          pdf.roundedRect(
            x,
            y,
            labelWidth,
            labelHeight,
            3,
            3
          );

          pdf.setFontSize(10);

          pdf.text(
            product.name,
            x + 3,
            y + 6
          );

          pdf.setFontSize(9);

          pdf.text(
            `S/ ${product.salePrice}`,
            x + 3,
            y + 11
          );

          pdf.addImage(
            imgData,
            "PNG",
            x + 2,
            y + 13,
            55,
            15
          );

          URL.revokeObjectURL(
            url
          );

          resolve();
        };

        img.src = url;
      }
    );

    // ======================================
    // GRID
    // ======================================

    if (
      (i + 1) % columns === 0
    ) {

      x = 10;

      y += 40;

    } else {

      x += 65;
    }

    // ======================================
    // NEW PAGE
    // ======================================

    if (y > 250) {

      pdf.addPage();

      x = 10;

      y = 10;
    }
  }

  pdf.save(
    "barcodes.pdf"
  );
}