import api from "@/api/axios";

class CompanyService {

  /* ========================================
   * MY COMPANY
   * ====================================== */

  async getMyCompany() {

    try {

      const response =
        await api.get(
          "/company/me"
        );

      return response.data;

    } catch (error) {

      throw error;

    }

  }

  /* ========================================
   * GET BY SLUG
   * ====================================== */

  async getCompanyBySlug(slug) {

    try {

      const response =
        await api.get(
          `/company/slug/${slug}`
        );

      return response.data;

    } catch (error) {

      throw error;

    }

  }

  /* ========================================
   * GET ALL
   * ====================================== */

  async getCompanies() {

    try {

      const response =
        await api.get(
          "/company"
        );

      return response.data;

    } catch (error) {

      throw error;

    }

  }

  /* ========================================
   * GET BY ID
   * ====================================== */

  async getCompanyById(id) {

    try {

      const response =
        await api.get(
          `/company/${id}`
        );

      return response.data;

    } catch (error) {

      throw error;

    }

  }

  /* ========================================
   * UPDATE
   * ====================================== */

  async updateCompany(
    id,
    data
  ) {

    try {

      const response =
        await api.put(

          `/company/${id}`,

          data

        );

      return response.data;

    } catch (error) {

      throw error;

    }

  }

}

export const companyService =
  new CompanyService();