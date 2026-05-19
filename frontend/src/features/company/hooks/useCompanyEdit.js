// ========================================
// hooks/useCompanyEdit.js
// ========================================

import {
  useEffect,
  useState,
} from "react";

import { companyService }
  from "../services/company.service";

const INITIAL_STATE = {

  name: "",
  slug: "",
  ruc: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  taxId: "",
  legalRepresentative: "",
  logo: null,

};

export default function useCompanyEdit({
  open,
  companyId,
  onClose,
  onSuccess,
}) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState(INITIAL_STATE);

  /* ========================================
   * FETCH COMPANY
   * ====================================== */

  useEffect(() => {

    if (
      !open ||
      !companyId
    ) {

      setFormData(INITIAL_STATE);

      return;

    }

    const fetchCompany =
      async () => {

        try {

          setLoading(true);

          const response =
            await companyService
              .getCompanyById(
                companyId
              );

          const company =
            response.data || response;

          setFormData({

            name:
              company.name || "",

            slug:
              company.slug || "",

            ruc:
              company.ruc || "",

            email:
              company.email || "",

            phone:
              company.phone || "",

            address:
              company.address || "",

            website:
              company.website || "",

            taxId:
              company.taxId || "",

            legalRepresentative:
              company.legalRepresentative || "",

            logo:
              company.logo || null,

          });

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchCompany();

  }, [open, companyId]);

  /* ========================================
   * HANDLE CHANGE
   * ====================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  /* ========================================
   * SUBMIT
   * ====================================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        // UPDATE

        const response =
          await companyService.updateCompany(

            companyId,

            formData

          );

        // ESPERA REFRESH

        await onSuccess?.(response);

        // CIERRA DESPUÉS

        onClose?.();

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return {

    loading,

    formData,

    handleChange,

    handleSubmit,

  };

}