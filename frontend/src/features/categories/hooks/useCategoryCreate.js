import { useState } from "react";

import { createCategory } from "../services/category.service";

export default function useCategoryCreate(onSuccess) {
  const [loading, setLoading] = useState(false);

  const handleCreate = async (data) => {
    try {
      setLoading(true);

      await createCategory(data);

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    handleCreate,
  };
}
