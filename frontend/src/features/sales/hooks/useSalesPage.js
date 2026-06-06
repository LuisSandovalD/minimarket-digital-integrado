// ========================================
// features/sales/hooks/useSalesPage.js
// ========================================

import { useMemo } from "react";
import { useCustomers } from "../../customer/hooks/useCustomers";
import useProducts from "../../product/hooks/useProducts";
import { useSaleModals } from "../hooks/useSaleModals";
import { useSales } from "../hooks/useSales";

export function useSalesPage() {
  // Aquí es donde realmente viven tus datos de la API/Base de datos
  const { sales, loading, addSale, removeSale, refundSale } = useSales();
  const { customers } = useCustomers();
  const { products } = useProducts();
  const modals = useSaleModals();

  const handleCreate = async (payload) => {
    await addSale(payload);
    modals.setCreateOpen(false);
  };

  const handleCancel = async (saleId) => {
    await removeSale(saleId);
    modals.setCancelOpen(false);
  };

  const handleReturn = async (saleId, items) => {
    await refundSale(saleId, items);
    modals.setReturnOpen(false);
  };

  const handlePayment = async (saleId, amount) => {
    console.log(saleId, amount);
    modals.setPaymentOpen(false);
  };

  const metrics = useMemo(() => {
    const totalRevenue = sales.reduce(
      (acc, sale) => acc + Number(sale.total || 0),
      0,
    );
    const totalOrders = sales.length;
    const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return { totalRevenue, totalOrders, averageTicket };
  }, [sales]);

  return {
    sales, // <--- IMPORTANTÍSIMO: Exportamos sales en la raíz del hook
    loading,
    customers,
    products,
    metrics,
    modals,
    actions: {
      handleCreate,
      handleCancel,
      handlePayment,
      handleReturn,
    },
  };
}
