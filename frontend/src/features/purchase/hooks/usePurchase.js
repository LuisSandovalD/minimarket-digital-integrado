// ============================================================================
// features/purchase/hooks/usePurchase.js
// HOOK PRINCIPAL: Peticiones asíncronas y operaciones CRUD de Órdenes de Compra
// ============================================================================

import { useCallback, useEffect, useState } from "react";
import {
  createPurchaseService,
  deletePurchaseService,
  getPurchasesService,
  updatePurchaseService,
} from "../services/purchase.service";

export default function usePurchase() {
  // ========================================
  // STATES
  // ========================================
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // ========================================
  // FETCH PURCHASES
  // ========================================
  const fetchPurchases = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPurchasesService();
      console.log("PURCHASE RESPONSE:", response);

      const purchasesData = response?.data || [];
      setPurchases(Array.isArray(purchasesData) ? purchasesData : []);
    } catch (error) {
      console.error("GET PURCHASES ERROR:", error);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // CREATE PURCHASE
  // ========================================
  async function createPurchase(form) {
    try {
      setActionLoading(true);

      // VALIDATE DETAILS
      if (!form || !Array.isArray(form.details) || form.details.length === 0) {
        throw new Error("Debe agregar productos");
      }

      // NORMALIZE DETAILS (Alineado con el modal)
      const details = form.details.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        costPrice: Number(item.costPrice || 0),
      }));

      // PAYLOAD STRUCT
      const payload = {
        supplierId: Number(form.supplierId),
        notes: form.notes || "",
        details,
      };

      console.log("CREATE PURCHASE PAYLOAD:", payload);

      // REQUEST
      await createPurchaseService(payload);

      // REFRESH
      await fetchPurchases();
      return true;
    } catch (error) {
      console.error("CREATE PURCHASE ERROR:", error.response?.data || error);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  // ========================================
  // UPDATE PURCHASE
  // ========================================
  async function updatePurchase(id, data) {
    try {
      setActionLoading(true);
      await updatePurchaseService(id, data);
      await fetchPurchases();
      return true;
    } catch (error) {
      console.error("UPDATE PURCHASE ERROR:", error.response?.data || error);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  // ========================================
  // DELETE PURCHASE
  // ========================================
  async function deletePurchase(id) {
    try {
      setActionLoading(true);
      await deletePurchaseService(id);
      await fetchPurchases();
      return true;
    } catch (error) {
      console.error("DELETE PURCHASE ERROR:", error.response?.data || error);
      return false;
    } finally {
      setActionLoading(false);
    }
  }

  // ========================================
  // INIT
  // ========================================
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPurchases();
  }, [fetchPurchases]);

  return {
    purchases,
    loading,
    actionLoading,
    fetchPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
  };
}
