// ========================================
// helpers/generate-sale-number.helper.js
// ========================================

const prisma =
  require("../../../prisma/client");

module.exports = {

  // ========================================
  // GENERATE SALE NUMBER
  // ========================================

  generateSaleNumber:
    async () => {

      const today =
        new Date();

      const year =
        today.getFullYear();

      const month =
        String(
          today.getMonth() + 1,
        ).padStart(2, "0");

      const day =
        String(
          today.getDate(),
        ).padStart(2, "0");

      // ========================================
      // PREFIX
      // ========================================

      const prefix =
        `SAL-${year}${month}${day}`;

      // ========================================
      // LAST SALE
      // ========================================

      const lastSale =
        await prisma.sale.findFirst({

          where: {

            saleNumber: {

              startsWith:
                prefix,

            },

          },

          orderBy: {
            id: "desc",
          },

        });

      // ========================================
      // NEXT NUMBER
      // ========================================

      let next = 1;

      if (lastSale) {

        const parts =
          lastSale.saleNumber.split("-");

        next =
          Number(parts[2]) + 1;

      }

      // ========================================
      // FORMAT
      // ========================================

      const sequence =
        String(next)
          .padStart(5, "0");

      return `${prefix}-${sequence}`;

    },

};
