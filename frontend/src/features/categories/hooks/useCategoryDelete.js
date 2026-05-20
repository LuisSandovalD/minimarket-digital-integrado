import { useState } from "react";

import { deleteCategory } from "../services/category.service";

export default function useCategoryDelete(onSuccess) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await deleteCategory(id);

      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    handleDelete,
  };
}
