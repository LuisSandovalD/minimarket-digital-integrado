// ========================================
// features/purchase/utils/purchase-form.util.js
// ========================================

export const initialPurchaseForm = {

  supplierId: "",


  notes: "",

  details: [

    {

      productId: "",

      productName: "",

      sku: "",

      stock: 0,

      quantity: 1,

      // 🔥 IMPORTANT
      // BACKEND EXPECTS costPrice
      costPrice: 0,

      subtotal: 0,

    }

  ],

};