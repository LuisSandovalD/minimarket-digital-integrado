import api from "@/api/axios";

// ======================================
// REGISTER SERVICE
// ======================================

export const registerService = async (payload) => {
  const response = await api.post(
    "/auth/register",

    payload,

    {
      withCredentials: true,
    },
  );

  return response.data;
};

export default {
  registerService,
};
