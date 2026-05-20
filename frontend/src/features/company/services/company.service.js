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
    const response = await api.put(
      `/company/${id}`,

      data,
    );

    return response.data;
  }
}

export const companyService = new CompanyService();
