// =========================================================================
// features/configuration/services/configuration.service.js
// =========================================================================

import api from "../../../api/axios";

export const ConfigurationService = {
  /**
   * Obtiene la configuración global y los datos corporativos de la empresa.
   * * @returns {Promise<Object>} Retorna directamente el objeto interno 'data' de la API.
   * La estructura devuelta incluye el nodo anidado: { ..., company: { id, name, ruc, email, logo } }
   */
  get: async () => {
    const { data } = await api.get("/configuration");
    return data.data; // Desempaquetamos el nodo de datos de la respuesta del backend
  },

  /**
   * Actualiza los parámetros del sistema y la información de la empresa.
   * * @param {Object} payload - Objeto con las configuraciones (Procesado previamente por mapFormToPayload).
   * @returns {Promise<Object>} Retorna los datos actualizados confirmados por la base de datos.
   */
  update: async (payload) => {
    const { data } = await api.put("/configuration", payload);
    return data.data; // Retornamos los datos ya actualizados por la base de datos
  },
};
