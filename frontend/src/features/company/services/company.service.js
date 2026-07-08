import api from "@/api/axios";

class CompanyService {
  /* ========================================
   * MY COMPANY
   * ====================================== */
  async getMyCompany() {
    const response = await api.get("/company/me");
    return response.data;
  }

  /* ========================================
   * GET BY SLUG
   * ====================================== */
  async getCompanyBySlug(slug) {
    const response = await api.get(`/company/slug/${slug}`);
    return response.data;
  }

  /* ========================================
   * GET ALL
   * ====================================== */
  async getCompanies() {
    const response = await api.get("/company");
    return response.data;
  }

  /* ========================================
   * GET BY ID
   * ====================================== */
  async getCompanyById(id) {
    const response = await api.get(`/company/${id}`);
    return response.data;
  }

  /* ========================================
   * UPDATE
   * ====================================== */
  async updateCompany(id, data) {
    // Configuración base de la petición
    const config = {};

    // 🌟 PROTECCIÓN: Si los datos vienen empaquetados en un FormData (para subir archivos binarios)
    // forzamos el Content-Type correcto para que Axios no rompa el cuerpo de la petición.
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }

    const response = await api.put(
      `/company/${id}`,
      data,
      config, // Le pasamos la configuración dinámica a Axios
    );

    return response.data;
  }
}

export const companyService = new CompanyService();
