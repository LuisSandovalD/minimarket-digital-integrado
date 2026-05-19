// ========================================
// features/product/services/product.service.js
// ========================================

import api
  from "../../../api/axios";

// ========================================
// CONSTANTS
// ========================================

const ENDPOINT =
  "/product";

// ========================================
// GET ALL PRODUCTS
// ========================================

const getProducts =
  async () => {

    const {
      data,
    } = await api.get(
      ENDPOINT
    );

    return data;
  };

// ========================================
// GET PRODUCT BY ID
// ========================================

const getProductById =
  async (id) => {

    const {
      data,
    } = await api.get(
      `${ENDPOINT}/${id}`
    );

    return data;
  };

// ========================================
// CREATE PRODUCT
// ========================================

const createProduct =
  async (payload) => {

    const {
      data,
    } = await api.post(
      ENDPOINT,
      payload
    );

    return data;
  };

// ========================================
// UPDATE PRODUCT
// ========================================

const updateProduct =
  async (
    id,
    payload
  ) => {

    const {
      data,
    } = await api.put(
      `${ENDPOINT}/${id}`,
      payload
    );

    return data;
  };

// ========================================
// DELETE PRODUCT
// ========================================

const deleteProduct =
  async (id) => {

    const {
      data,
    } = await api.delete(
      `${ENDPOINT}/${id}`
    );

    return data;
  };

// ========================================
// RESTORE PRODUCT
// ========================================

const restoreProduct =
  async (id) => {

    const {
      data,
    } = await api.patch(
      `${ENDPOINT}/${id}/restore`
    );

    return data;
  };

// ========================================
// FEATURED PRODUCTS
// ========================================

const getFeaturedProducts =
  async () => {

    const {
      data,
    } = await api.get(
      `${ENDPOINT}/featured`
    );

    return data;
  };

// ========================================
// LOW STOCK PRODUCTS
// ========================================

const getLowStockProducts =
  async () => {

    const {
      data,
    } = await api.get(
      `${ENDPOINT}/low-stock`
    );

    return data;
  };

// ========================================
// EXPIRING PRODUCTS
// ========================================

const getExpiringProducts =
  async () => {

    const {
      data,
    } = await api.get(
      `${ENDPOINT}/expiring`
    );

    return data;
  };

// ========================================
// EXPORTS
// ========================================

const productService = {

  getProducts,

  getProductById,

  createProduct,

  updateProduct,

  deleteProduct,

  restoreProduct,

  getFeaturedProducts,

  getLowStockProducts,

  getExpiringProducts,

};

export default
  productService;