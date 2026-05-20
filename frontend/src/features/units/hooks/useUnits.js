import { useEffect, useState } from "react";

import { getUnits } from "../services/unit.service";

export const useUnits = () => {
  const [units, setUnits] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadUnits = async () => {
    try {
      const data = await getUnits();

      setUnits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUnits();
  }, []);

  return {
    units,
    loading,
    reload: loadUnits,
  };
};
