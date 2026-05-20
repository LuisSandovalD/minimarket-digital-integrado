import { useEffect, useState } from "react";

import { getSuppliers } from "../services/supplier.service";

export default function useSupplierLoad() {
  const [suppliers, setSuppliers] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadSuppliers = async () => {
    try {
      setLoading(true);

      const response = await getSuppliers();

      setSuppliers(Array.isArray(response) ? response : response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSuppliers();
  }, []);

  return {
    suppliers,
    setSuppliers,

    loading,

    loadSuppliers,
  };
}
