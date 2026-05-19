// ========================================
// services/company.service.js
// ========================================

const repository =
  require("../repositories/auth.repository");

const {
  generateSlug,
} = require("../../../utils/helpers");

/* ======================================
 * CREATE COMPANY
 * ==================================== */

exports.createCompany =
  async (
    company,
    plan
  ) => {

    return await repository.createCompany({

      name:
        company.name,

      slug:
        generateSlug(
          company.name
        ),

      email:
        company.email || null,

      phone:
        company.phone || null,

      address:
        company.address || "",

      ruc:
        company.ruc || null,

      subscriptionTier:
        plan,

    });

  };