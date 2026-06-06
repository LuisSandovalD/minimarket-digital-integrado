import api from "../../../api/axios";

export const ConfigurationService = {
  get: async () => {
    const { data } = await api.get("/configuration");
    return data;
  },

  update: async (payload) => {
    const { data } = await api.put("/configuration", payload);
    return data;
  },
};
