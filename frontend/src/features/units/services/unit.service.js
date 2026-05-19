import api from "@/api/axios";

export const getUnits = async () => {
  const { data } = await api.get("/unit");
  return data.data;
};

export const createUnit = async (payload) => {
  const { data } = await api.post(
    "/unit",
    payload
  );

  return data;
};

export const updateUnit = async (
  id,
  payload
) => {
  const { data } = await api.put(
    `/unit/${id}`,
    payload
  );

  return data;
};

export const deleteUnit = async (id) => {
  const { data } = await api.delete(
    `/unit/${id}`
  );

  return data;
};