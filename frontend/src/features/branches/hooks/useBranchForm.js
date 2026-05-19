// ========================================
// hooks/useBranchForm.js
// ========================================

import {
  useEffect,
  useState,
} from "react";

import {
  createBranch,
  updateBranch,
} from "../services/branch.service";

const INITIAL_STATE = {

  name: "",

  code: "",

  address: "",

  phone: "",

  email: "",

  logo: "",

  description: "",

  city: "",

  state: "",

  country: "",

  postalCode: "",

};

export default function useBranchForm({
  branch,
  onClose,
  onSuccess,
}) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState(INITIAL_STATE);

  /* ========================================
   * EDIT MODE
   * ====================================== */

  const isEdit = !!branch;

  /* ========================================
   * LOAD DATA
   * ====================================== */

  useEffect(() => {

    if (!branch) {

      setFormData(
        INITIAL_STATE
      );

      return;

    }

    setFormData({

      name:
        branch.name || "",

      code:
        branch.code || "",

      address:
        branch.address || "",

      phone:
        branch.phone || "",

      email:
        branch.email || "",

      logo:
        branch.logo || "",

      description:
        branch.description || "",

      city:
        branch.city || "",

      state:
        branch.state || "",

      country:
        branch.country || "",

      postalCode:
        branch.postalCode || "",

    });

  }, [branch]);

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

      [name]:
        value,

    }));

  };

  /* ========================================
   * HANDLE IMAGE
   * ====================================== */

  const handleImageChange =
    (e) => {

      const file =
        e.target.files?.[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend =
        () => {

          setFormData((prev) => ({

            ...prev,

            logo:
              reader.result,

          }));

        };

      reader.readAsDataURL(
        file
      );

    };

  /* ========================================
   * RESET
   * ====================================== */

  const resetForm = () => {

    setFormData(
      INITIAL_STATE
    );

  };

  /* ========================================
   * SUBMIT
   * ====================================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (loading) return;

      try {

        setLoading(true);

        let response;

        /* ================================
         * UPDATE
         * ============================== */

        if (isEdit) {

          response =
            await updateBranch(

              branch.id,

              formData

            );

        }

        /* ================================
         * CREATE
         * ============================== */

        else {

          response =
            await createBranch(
              formData
            );

        }

        /* ================================
         * UPDATE UI INSTANTLY
         * ============================== */

        onSuccess?.(
          response,
          isEdit
        );

        /* ================================
         * CLOSE MODAL
         * ============================== */

        onClose?.();

        /* ================================
         * RESET
         * ============================== */

        resetForm();

      } catch (error) {

        console.error(
          "Error saving branch:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  return {

    loading,

    formData,

    isEdit,

    handleChange,

    handleImageChange,

    handleSubmit,

    resetForm,

  };

}