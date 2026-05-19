import api from '../../../api/axios'

export const getSuppliers = async () => {

  const response =
    await api.get('/supplier')

  return response.data

}

export const createSupplier = async (
  payload
) => {

  const response =
    await api.post(
      '/supplier',
      payload
    )

  return response.data

}

export const updateSupplier = async (
  id,
  payload
) => {

  const response =
    await api.patch(
      `/supplier/${id}`,
      payload
    )

  return response.data

}

export const deleteSupplier = async (
  id
) => {

  const response =
    await api.delete(
      `/supplier/${id}`
    )

  return response.data

}