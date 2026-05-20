import { useState } from "react";

import { updateCategory } from "../services/category.service";

export default function useCategoryUpdate(onSuccess) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (id, data) => {
    try {
      setLoading(true);

      await updateCategory(id, data);

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    handleUpdate,
  };
}
