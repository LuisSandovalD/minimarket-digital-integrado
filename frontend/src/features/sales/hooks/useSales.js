import { useCallback, useEffect, useState } from "react";
import {
  cancelSale,
  createSale,
  getSales,
  registerSalePayment,
  returnSale,
} from "../services/sale.service";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========================================
  // FETCH ALL SALES (Normalizado)
  // ========================================
  const fetchSales = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getSales(params);
      const serverData = response?.data;
      const serverMeta = response?.meta || {};

      let rawSales = [];
      if (Array.isArray(serverData)) {
        rawSales = serverData;
      } else if (serverData && typeof serverData === "object") {
        rawSales =
          serverData.sales ||
          serverData.data ||
          (serverData["0"] && !serverData.id
            ? Object.values(serverData)
            : [serverData]);
      } else if (response && !response.data && !response.meta) {
        if (Array.isArray(response)) rawSales = response;
        else if (typeof response === "object")
          rawSales = response.sales || response.data || Object.values(response);
      }

      const normalizedSales = rawSales
        .map((sale) => {
          if (!sale) return null;
          const itemArray =
            sale.details || sale.SaleDetails || sale.items || [];
          return {
            ...sale,
            details: Array.isArray(itemArray) ? itemArray : [],
          };
        })
        .filter(Boolean);

      setSales(normalizedSales);
      setMeta(serverMeta);
    } catch (err) {
      console.error("❌ Error en fetchSales:", err);
      setError(err?.response?.data?.message || "Error al cargar las ventas");
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // ADD NEW SALE
  // ========================================
  const addSale = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const responseData = await createSale(payload);
      const newSale = responseData["0"] ? responseData["0"] : responseData;

      if (newSale) {
        const itemArray =
          newSale.details || newSale.SaleDetails || newSale.items || [];
        const normalizedNewSale = {
          ...newSale,
          details: Array.isArray(itemArray) ? itemArray : [],
        };
        setSales((prev) => [normalizedNewSale, ...prev]);
      }
      return newSale;
    } catch (err) {
      console.error("❌ Error en addSale:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // PROCESS SALE PAYMENT (ABONOS / COBROS)
  // ========================================
  const processSalePayment = async (id, payload) => {
    try {
      setLoading(true);
      setError(null);

      // Hace la petición POST /api/sale/:id/payments
      const response = await registerSalePayment(id, payload);

      // Modificamos el estado local de forma ultra-segura e inmediata
      setSales((prevSales) =>
        prevSales.map((sale) => {
          if (sale.id === id) {
            const totalAboneado = (payload.payments || []).reduce(
              (acc, p) => acc + Number(p.amount),
              0,
            );
            const deudaPrevia = Number(
              sale.pendingDebt !== undefined
                ? sale.pendingDebt
                : sale.total || 0,
            );
            const deudaRestante = Math.max(0, deudaPrevia - totalAboneado);

            // 🎯 CORRECCIÓN: Alineado con Prisma del Backend ("COMPLETED" en lugar de "PAID")
            const nuevoEstado = deudaRestante <= 0 ? "COMPLETED" : "PARTIAL";

            // Extraemos la venta real actualizada devuelta en el payload de respuesta
            const updatedSaleFromServer = response?.data?.sale || {};

            return {
              ...sale,
              ...updatedSaleFromServer, // Inyecta las propiedades de cabecera frescas del servidor
              status: nuevoEstado,
              pendingDebt: deudaRestante,
            };
          }
          return sale;
        }),
      );

      // Re-fetch secundario automático para sincronizar toda la metadata profunda (relaciones, etc.)
      await fetchSales();
      return response;
    } catch (err) {
      console.error("❌ Error en processSalePayment:", err);
      setError(err?.response?.data?.message || "Error al registrar el cobro");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // CANCEL SALE
  // ========================================
  const removeSale = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await cancelSale(id);
      setSales((prev) =>
        prev.map((sale) =>
          sale.id === id ? { ...sale, status: "CANCELLED" } : sale,
        ),
      );
    } catch (err) {
      console.error("❌ Error en removeSale:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // REFUND / NOTA DE CRÉDITO
  // ========================================
  const refundSale = async (id, items) => {
    try {
      setLoading(true);
      setError(null);
      const res = await returnSale(id, items);
      await fetchSales();
      return res;
    } catch (err) {
      console.error("❌ Error en refundSale:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  return {
    sales,
    meta,
    loading,
    error,
    fetchSales,
    addSale,
    processSalePayment,
    removeSale,
    refundSale,
  };
};
