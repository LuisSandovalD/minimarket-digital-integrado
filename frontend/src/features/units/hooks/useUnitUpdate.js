import {
  updateUnit
} from "../services/unit.service";

export const useUnitUpdate = () => {

  const update = async (
    id,
    payload
  ) => {

    try {

      return await updateUnit(
        id,
        payload
      );

    } catch (error) {

      console.error(error);

      throw error;

    }

  };

  return {
    update
  };

};