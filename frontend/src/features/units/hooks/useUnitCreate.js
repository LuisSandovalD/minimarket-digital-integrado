import { createUnit } from "../services/unit.service";

export const useUnitCreate = () => {
  const create = async (payload) => {
    try {
      return await createUnit(payload);
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return {
    create,
  };
};
