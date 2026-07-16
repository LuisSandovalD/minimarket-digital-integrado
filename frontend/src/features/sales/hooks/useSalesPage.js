// ========================================
// features/sales/hooks/useSalesPage.js
// ========================================
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCustomers } from "../../customer/hooks/useCustomers";
import useProducts from "../../product/hooks/useProducts";
import { useSaleModals } from "../hooks/useSaleModals";
import { useSales } from "../hooks/useSales";

export function useSalesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryFilters, setQueryFilters] = useState({
    search: "",
    status: "",
    billingType: "",
  });
  const limitPerPage = 10;

  const {
    sales: rawSales = [],
    meta = {},
    loading: salesLoading,
    addSale,
    removeSale,
    refundSale,
    fetchSales,
    processSalePayment,
  } = useSales();

  const { customers = [], loading: customersLoading } = useCustomers();
  const { products = [], loading: productsLoading } = useProducts();
  const modalsInstance = useSaleModals();

  // 🎯 Ejecuta la consulta al backend unificando paginación y filtros activos
  const loadSalesData = useCallback(() => {
    if (typeof fetchSales === "function") {
      fetchSales({
        page: currentPage,
        limit: limitPerPage,
        ...queryFilters, // 🚀 Se inyectan dinámicamente al Query String de la API
      });
    }
  }, [currentPage, queryFilters, fetchSales]);

  useEffect(() => {
    loadSalesData();
  }, [loadSalesData]);

  // Manejadores de Estado para los filtros de Backend
  const handleApplyFilters = (newFilters) => {
    setCurrentPage(1); // Resetea a la página uno al realizar búsquedas nuevas
    setQueryFilters(newFilters);
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setQueryFilters({ search: "", status: "", billingType: "" });
  };

  // 🎯 GARANTIZA LA UNIFICACIÓN Y EXTRACTO DE DATOS HOMOGÉNEOS
  const sales = useMemo(() => {
    let cleanSales = [];

    if (!rawSales) cleanSales = [];
    else if (Array.isArray(rawSales)) {
      cleanSales = rawSales;
    } else if (typeof rawSales === "object") {
      cleanSales = rawSales.data || rawSales.sales || Object.values(rawSales);
    }

    // 🛡️ Mapeo de seguridad para asegurar que la tabla lea la cantidad de productos
    return cleanSales.map((sale) => {
      if (!sale) return sale;

      // Capturamos el número total desde cualquier variante posible del backend
      const productQty = Number(sale.totalProducts ?? sale._count?.items ?? sale._count?.details ?? 0);

      return {
        ...sale,
        totalProducts: productQty,
        // Si tu componente visual de la tabla calcula con .length, le inyectamos un array simulado con el tamaño correcto
        details: sale.details || new Array(productQty).fill({}),
        SaleDetails: sale.SaleDetails || new Array(productQty).fill({}),
      };
    });
  }, [rawSales]);

  const loading = salesLoading || customersLoading || productsLoading;
  const modals = useMemo(() => modalsInstance || {}, [modalsInstance]);

  // ========================================
  // CONTROL DE PAGINACIÓN INTERNA
  // ========================================
  const handleNextPage = () => {
    const totalPages = meta?.totalPages || 1;
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // ========================================
  // ACCIONES CENTRALIZADAS CON CIERRE SEGURO DE MODAL
  // ========================================
  const handleCreate = async (payload) => {
    await addSale(payload);
    if (modals?.setCreateOpen) modals.setCreateOpen(false);
    setCurrentPage(1);
    await fetchSales({ page: 1, limit: limitPerPage, ...queryFilters });
  };

  const handleCancel = async (saleId) => {
    await removeSale(saleId);
    if (modals?.setCancelOpen) modals.setCancelOpen(false);
    await fetchSales({
      page: currentPage,
      limit: limitPerPage,
      ...queryFilters,
    });
  };

  const handleReturn = async (saleId, items) => {
    await refundSale(saleId, items);
    if (modals?.setReturnOpen) modals.setReturnOpen(false);
    await fetchSales({
      page: currentPage,
      limit: limitPerPage,
      ...queryFilters,
    });
  };

  const handlePayment = async (saleId, paymentPayload) => {
    try {
      await processSalePayment(saleId, paymentPayload);
      await fetchSales({
        page: currentPage,
        limit: limitPerPage,
        ...queryFilters,
      });
      if (modals?.setPaymentOpen) modals.setPaymentOpen(false);
    } catch (err) {
      console.error("❌ Error al registrar abono de pago en la transacción:", err);
    }
  };

  // ========================================
  // CORE METRICS ANALYTICS
  // ========================================
  const metrics = useMemo(() => {
    const CANCELLED_STATES = ["CANCELLED", "ANULATED", "ANULADO", "CANCELED"];

    const validSales = sales.filter((sale) => sale && !CANCELLED_STATES.includes(String(sale.status).toUpperCase()));

    const pageRevenue = validSales.reduce((acc, sale) => {
      const payments = Array.isArray(sale.payments) ? sale.payments : [];
      if (payments.length > 0) {
        return acc + payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
      }
      return acc + Number(sale.total || 0);
    }, 0);

    const totalOrders = Number(meta?.totalRecords || sales.length);
    const itemsInPage = validSales.length || 1;
    const estimatedAverage = pageRevenue / itemsInPage;

    const totalRevenue = totalOrders > sales.length ? estimatedAverage * totalOrders : pageRevenue;

    const averageTicket = Math.round(estimatedAverage * 100) / 100;

    return {
      companyId: 1,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders,
      averageTicket: Number.isNaN(averageTicket) ? 0 : averageTicket,
    };
  }, [sales, meta]);

  return {
    sales,
    loading,
    customers,
    products,
    metrics,
    modals,
    pagination: {
      page: currentPage,
      totalPages: meta?.totalPages || 1,
      totalRecords: meta?.totalRecords || 0,
    },
    actions: {
      handleFetch: loadSalesData,
      handleApplyFilters,
      handleClearFilters,
      handleCreate,
      handleCancel,
      handlePayment,
      handleReturn,
      handleNextPage,
      handlePrevPage,
    },
  };
}
