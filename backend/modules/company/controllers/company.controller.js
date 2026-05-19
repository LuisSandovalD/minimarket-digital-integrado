// modules/company/controllers/company.controller.js

const prisma =
  require("../../../prisma/client");

const {
  Prisma
} = require("@prisma/client");

// ==========================================
// OBTENER TODAS LAS EMPRESAS
// ==========================================

exports.getCompanies = async (
  req,
  res
) => {

  try {

    const companies =
      await prisma.company.findMany({

        where: {
          isDeleted: false
        },

        orderBy: {
          createdAt: "desc"
        }

      });

    res.json({

      success: true,

      data: companies

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// OBTENER EMPRESA POR ID
// ==========================================

exports.getCompanyById = async (
  req,
  res
) => {

  try {

    const id =
      parseInt(req.params.id);

    if (isNaN(id)) {

      return res.status(400).json({

        success: false,

        message: "ID inválido"

      });

    }

    const company =
      await prisma.company.findFirst({

        where: {

          id,

          isDeleted: false

        }

      });

    if (!company) {

      return res.status(404).json({

        success: false,

        message: "Empresa no encontrada"

      });

    }

    res.json({

      success: true,

      data: company

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// OBTENER EMPRESA POR SLUG
// ==========================================

exports.getCompanyBySlug = async (
  req,
  res
) => {

  try {

    const slug =
      req.params.slug;

    if (!slug) {

      return res.status(400).json({

        success: false,

        message: "Slug inválido"

      });

    }

    const company =
      await prisma.company.findFirst({

        where: {

          slug,

          isDeleted: false,

          isActive: true

        }

      });

    if (!company) {

      return res.status(404).json({

        success: false,

        message: "Empresa no encontrada"

      });

    }

    res.json({

      success: true,

      data: company

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// CREAR EMPRESA
// ==========================================

exports.createCompany = async (
  req,
  res
) => {

  try {

    const {

      name,
      slug,
      ruc,
      address,
      phone,
      email,
      logo,
      website,
      taxId,
      legalRepresentative

    } = req.body;

    // ==========================
    // VALIDACIONES
    // ==========================

    if (!name) {

      return res.status(400).json({

        success: false,

        message: "El nombre es obligatorio"

      });

    }

    if (!slug) {

      return res.status(400).json({

        success: false,

        message: "El slug es obligatorio"

      });

    }

    // ==========================
    // CREAR EMPRESA
    // ==========================

    const company =
      await prisma.company.create({

        data: {

          name,

          slug,

          ruc,

          address,

          phone,

          email,

          logo,

          website,

          taxId,

          legalRepresentative

        }

      });

    res.status(201).json({

      success: true,

      data: company

    });

  } catch (error) {

    console.error(error);

    // ==========================
    // ERRORES PRISMA
    // ==========================

    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {

      // UNIQUE
      if (error.code === "P2002") {

        return res.status(400).json({

          success: false,

          message:
            "Ya existe una empresa con esos datos únicos"

        });

      }

    }

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// ACTUALIZAR EMPRESA
// ==========================================

exports.updateCompany = async (
  req,
  res
) => {

  try {

    const id =
      parseInt(req.params.id);

    if (isNaN(id)) {

      return res.status(400).json({

        success: false,

        message: "ID inválido"

      });

    }

    console.log(req.body);

    // ==========================
    // VERIFICAR EXISTENCIA
    // ==========================

    const exists =
      await prisma.company.findFirst({

        where: {

          id,

          isDeleted: false

        }

      });

    if (!exists) {

      return res.status(404).json({

        success: false,

        message: "Empresa no encontrada"

      });

    }

    // ==========================
    // DATA DINÁMICA
    // ==========================

    const data = {};

    if (req.body.name !== undefined)
      data.name = req.body.name;

    if (req.body.slug !== undefined)
      data.slug = req.body.slug;

    if (req.body.ruc !== undefined)
      data.ruc = req.body.ruc;

    if (req.body.address !== undefined)
      data.address = req.body.address;

    if (req.body.phone !== undefined)
      data.phone = req.body.phone;

    if (req.body.email !== undefined)
      data.email = req.body.email;

    if (req.body.logo !== undefined)
      data.logo = req.body.logo;

    if (req.body.website !== undefined)
      data.website = req.body.website;

    if (req.body.taxId !== undefined)
      data.taxId = req.body.taxId;

    if (
      req.body.legalRepresentative !== undefined
    )
      data.legalRepresentative =
        req.body.legalRepresentative;

    // ==========================
    // ACTUALIZAR
    // ==========================

    const company =
      await prisma.company.update({

        where: {
          id
        },

        data

      });

    res.json({

      success: true,

      data: company

    });

  } catch (error) {

    console.error(error);

    // ==========================
    // ERRORES PRISMA
    // ==========================

    if (
      error instanceof
      Prisma.PrismaClientKnownRequestError
    ) {

      // UNIQUE
      if (error.code === "P2002") {

        return res.status(400).json({

          success: false,

          message:
            "Ya existe una empresa con esos datos únicos"

        });

      }

      // REGISTRO NO EXISTE
      if (error.code === "P2025") {

        return res.status(404).json({

          success: false,

          message:
            "Empresa no encontrada"

        });

      }

    }

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// ELIMINAR EMPRESA (SOFT DELETE)
// ==========================================

exports.deleteCompany = async (
  req,
  res
) => {

  try {

    const id =
      parseInt(req.params.id);

    if (isNaN(id)) {

      return res.status(400).json({

        success: false,

        message: "ID inválido"

      });

    }

    const exists =
      await prisma.company.findFirst({

        where: {

          id,

          isDeleted: false

        }

      });

    if (!exists) {

      return res.status(404).json({

        success: false,

        message: "Empresa no encontrada"

      });

    }

    await prisma.company.update({

      where: {
        id
      },

      data: {

        isDeleted: true,

        deletedAt: new Date()

      }

    });

    res.json({

      success: true,

      message:
        "Empresa eliminada correctamente"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// OBTENER USUARIOS DE LA EMPRESA
// ==========================================

exports.getCompanyUsers = async (
  req,
  res
) => {

  try {

    const users =
      await prisma.user.findMany({

        where: {

          companyId:
            req.user.companyId,

          isDeleted: false

        },

        orderBy: {

          createdAt: "desc"

        },

        select: {

          id: true,

          name: true,

          email: true,

          role: true,

          phone: true,

          isActive: true,

          createdAt: true

        }

      });

    res.json({

      success: true,

      data: users

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// OBTENER ADMINISTRADORES
// ==========================================

exports.getAdmins = async (
  req,
  res
) => {

  try {

    const admins =
      await prisma.user.findMany({

        where: {

          companyId:
            req.user.companyId,

          role: "ADMIN",

          isDeleted: false

        },

        orderBy: {

          createdAt: "desc"

        },

        select: {

          id: true,

          name: true,

          email: true,

          role: true,

          phone: true,

          isActive: true,

          createdAt: true

        }

      });

    res.json({

      success: true,

      data: admins

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// OBTENER EMPLEADOS
// ==========================================

exports.getEmployees = async (
  req,
  res
) => {

  try {

    const employees =
      await prisma.user.findMany({

        where: {

          companyId:
            req.user.companyId,

          role: "EMPLOYEE",

          isDeleted: false

        },

        orderBy: {

          createdAt: "desc"

        },

        select: {

          id: true,

          name: true,

          email: true,

          role: true,

          phone: true,

          isActive: true,

          createdAt: true

        }

      });

    res.json({

      success: true,

      data: employees

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// ==========================================
// OBTENER MI EMPRESA
// ==========================================

exports.getMyCompany = async (
  req,
  res
) => {

  try {

    const company =
      await prisma.company.findFirst({

        where: {

          id:
            req.user.companyId,

          isDeleted: false

        }

      });

    if (!company) {

      return res.status(404).json({

        success: false,

        message: "Empresa no encontrada"

      });

    }

    res.json({

      success: true,

      data: company

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};