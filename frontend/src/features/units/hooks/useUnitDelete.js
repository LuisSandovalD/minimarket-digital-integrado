import { deleteUnit } from "../services/unit.service";

export const useUnitDelete = () => {
  const remove = async (id) => {
    try {
      return await deleteUnit(id);
    } catch (error) {
      console.error(error);

      throw error;
    }
  };

  return {
    remove,
  };
};
