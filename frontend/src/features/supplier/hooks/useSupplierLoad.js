import { useState } from "react";
import { getSuppliers } from "../services/supplier.service";

export default function useSupplierLoad() {
  const [suppliers, setSuppliers] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadSuppliers = async (filters = {}) => {
    try {
      setLoading(true);

      const response = await getSuppliers(filters);

      setSuppliers(response.data ?? []);
      setMeta(
        response.meta ?? {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
      );

      return response;
    } catch (error) {
      console.error(error);

      setSuppliers([]);
      setMeta({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    suppliers,
    meta,
    loading,
    loadSuppliers,
  };
}
