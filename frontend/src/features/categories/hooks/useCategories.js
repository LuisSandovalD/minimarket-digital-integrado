import {
  useEffect,
  useState,
} from "react";

import {
  getCategories,
} from "../services/category.service";

export default function useCategories() {

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const fetchCategories =
    async () => {

      try {

        setLoading(true);

        const response =
          await getCategories();

        setCategories(
          response.data || []
        );

      } catch (err) {

        setError(
          err.message
        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchCategories();

  }, []);

  return {

    categories,

    loading,

    error,

    refetch:
      fetchCategories,

  };

}