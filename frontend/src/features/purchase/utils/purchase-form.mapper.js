// ========================================
// features/purchase/utils/purchase-form.mapper.js
// ========================================

export function mapPurchaseToForm(
  purchase = {}
) {

  return {

    supplierId:
      purchase.supplierId || "",


    notes:
      purchase.notes || "",

    details:
      Array.isArray(purchase.details)

        ? purchase.details.map(detail => ({

            productId:
              detail.productId || "",

            productName:
              detail.product?.name || "",

            sku:
              detail.product?.sku || "",

            stock:
              detail.product?.stock || 0,

            quantity:
              detail.quantity || 1,

            // 🔥 BACKEND USES costPrice
            costPrice:
              Number(detail.price || 0),

            subtotal:
              Number(detail.subtotal || 0),

          }))

        : [

            {

              productId: "",

              productName: "",

              sku: "",

              stock: 0,

              quantity: 1,

              costPrice: 0,

              subtotal: 0,

            }

          ],

  };

}