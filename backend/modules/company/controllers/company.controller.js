// modules/company/controllers/company.controller.js

// Importamos el cliente de la base de datos para poder interactuar con las tablas
const prisma = require("../../../prisma/client");

// Importamos las herramientas de Prisma para poder detectar errores específicos (como datos duplicados)
const { Prisma } = require("@prisma/client");

// ==========================================
// OBTENER TODAS LAS EMPRESAS
// ==========================================

// Función para listar todas las empresas registradas en el sistema
exports.getCompanies = async (req, res) => {
  try {
    // Busca múltiples registros de empresas
    const companies = await prisma.company.findMany({
      // Filtra para traer solo las que NO han sido borradas
      where: {
        isDeleted: false,
      },

      // Las ordena de la más reciente a la más antigua según su fecha de creación
      orderBy: {
        createdAt: "desc",
      },
    });

    // Responde con éxito y envía la lista de empresas
    res.json({
      success: true,

      data: companies,
    });
  } catch (error) {
    // Si hay error, lo imprime en consola y devuelve un código 500 (Error de servidor)
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// OBTENER EMPRESA POR ID
// ==========================================

// Función para buscar una sola empresa usando su número de identificación (ID)
exports.getCompanyById = async (req, res) => {
  try {
    // Convierte el ID que viene en la URL a formato número
    const id = parseInt(req.params.id);

    // Valida que el ID introducido sea realmente un número
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,

        message: "ID inválido",
      });
    }

    // Busca la primera empresa que coincida con ese ID y que no esté borrada
    const company = await prisma.company.findFirst({
      where: {
        id,

        isDeleted: false,
      },
    });

    // Si no encuentra ninguna, devuelve un error 404 (No encontrado)
    if (!company) {
      return res.status(404).json({
        success: false,

        message: "Empresa no encontrada",
      });
    }

    // Si la encuentra, devuelve los datos de la empresa
    res.json({
      success: true,

      data: company,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// OBTENER EMPRESA POR SLUG
// ==========================================

// Busca una empresa usando su "slug" (el nombre en formato URL, ej: "mi-empresa-sac")
exports.getCompanyBySlug = async (req, res) => {
  try {
    // Extrae el slug de la petición
    const slug = req.params.slug;

    // Si no enviaron ningún slug, devuelve error
    if (!slug) {
      return res.status(400).json({
        success: false,

        message: "Slug inválido",
      });
    }

    // Busca la empresa que coincida con el slug, que no esté borrada y que esté activa
    const company = await prisma.company.findFirst({
      where: {
        slug,

        isDeleted: false,

        isActive: true,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,

        message: "Empresa no encontrada",
      });
    }

    res.json({
      success: true,

      data: company,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// CREAR EMPRESA
// ==========================================

// Función para registrar una nueva empresa en el sistema
exports.createCompany = async (req, res) => {
  try {
    // Extraemos todos los datos que llenó el usuario en el formulario
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
      legalRepresentative,
    } = req.body; // ==========================
    // VALIDACIONES
    // ==========================

    // El nombre es un campo obligatorio
    if (!name) {
      return res.status(400).json({
        success: false,

        message: "El nombre es obligatorio",
      });
    }

    // El slug es un campo obligatorio
    if (!slug) {
      return res.status(400).json({
        success: false,

        message: "El slug es obligatorio",
      });
    } // ==========================
    // CREAR EMPRESA
    // ==========================

    // Le decimos a la base de datos que guarde el nuevo registro
    const company = await prisma.company.create({
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

        legalRepresentative,
      },
    });

    // Código 201 significa "Creado exitosamente"
    res.status(201).json({
      success: true,

      data: company,
    });
  } catch (error) {
    console.error(error); // ==========================
    // ERRORES PRISMA
    // ==========================

    // Prisma verifica si el error es de su propia base de datos
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // UNIQUE
      // El código P2002 salta cuando intentas guardar un dato que ya existe y no se puede repetir (como un RUC o un Email)
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,

          message: "Ya existe una empresa con esos datos únicos",
        });
      }
    }

    // Error general si el fallo fue por otra cosa
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// ACTUALIZAR EMPRESA
// ==========================================

// Modifica los datos de una empresa existente (ej. cambiar su teléfono o dirección)
exports.updateCompany = async (req, res) => {
  try {
    // Toma el ID de la URL
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,

        message: "ID inválido",
      });
    }

    console.log(req.body); // ==========================
    // VERIFICAR EXISTENCIA
    // ==========================

    // Antes de actualizar, revisa que la empresa realmente exista en la base de datos
    const exists = await prisma.company.findFirst({
      where: {
        id,

        isDeleted: false,
      },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,

        message: "Empresa no encontrada",
      });
    } // ==========================
    // DATA DINÁMICA
    // ==========================

    // Prepara un objeto vacío. Solo agregará los campos que el usuario realmente envió para actualizar.
    const data = {};

    if (req.body.name !== undefined) data.name = req.body.name;

    if (req.body.slug !== undefined) data.slug = req.body.slug;

    if (req.body.ruc !== undefined) data.ruc = req.body.ruc;

    if (req.body.address !== undefined) data.address = req.body.address;

    if (req.body.phone !== undefined) data.phone = req.body.phone;

    if (req.body.email !== undefined) data.email = req.body.email;

    if (req.body.logo !== undefined) data.logo = req.body.logo;

    if (req.body.website !== undefined) data.website = req.body.website;

    if (req.body.taxId !== undefined) data.taxId = req.body.taxId;

    if (req.body.legalRepresentative !== undefined)
      data.legalRepresentative = req.body.legalRepresentative; // ==========================
    // ACTUALIZAR
    // ==========================

    // Guarda los cambios en la base de datos
    const company = await prisma.company.update({
      where: {
        id,
      },

      data,
    });

    res.json({
      success: true,

      data: company,
    });
  } catch (error) {
    console.error(error); // ==========================
    // ERRORES PRISMA
    // ==========================

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // UNIQUE (Ej. Intentan poner un RUC que ya le pertenece a otra empresa)
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,

          message: "Ya existe una empresa con esos datos únicos",
        });
      } // REGISTRO NO EXISTE

      // Código P2025 significa que Prisma intentó actualizar algo que no está en la base de datos
      if (error.code === "P2025") {
        return res.status(404).json({
          success: false,

          message: "Empresa no encontrada",
        });
      }
    }

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// ELIMINAR EMPRESA (SOFT DELETE)
// ==========================================

// Eliminación lógica: Oculta la empresa en el sistema, pero no la borra de la base de datos
exports.deleteCompany = async (req, res) => {
  try {
    // Valida el ID
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,

        message: "ID inválido",
      });
    }

    // Revisa que la empresa exista antes de intentar borrarla
    const exists = await prisma.company.findFirst({
      where: {
        id,

        isDeleted: false,
      },
    });

    if (!exists) {
      return res.status(404).json({
        success: false,

        message: "Empresa no encontrada",
      });
    }

    // Cambia el estado de "isDeleted" a verdadero y le pone fecha de eliminación
    await prisma.company.update({
      where: {
        id,
      },

      data: {
        isDeleted: true,

        deletedAt: new Date(),
      },
    });

    res.json({
      success: true,

      message: "Empresa eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// OBTENER USUARIOS DE LA EMPRESA
// ==========================================

// Trae una lista de todas las personas que trabajan o están registradas en una empresa específica
exports.getCompanyUsers = async (req, res) => {
  try {
    // Busca los usuarios en la tabla 'user'
    const users = await prisma.user.findMany({
      // Filtra por el ID de la empresa del usuario que hace la consulta
      where: {
        companyId: req.user.companyId,

        isDeleted: false,
      },

      orderBy: {
        createdAt: "desc",
      },

      // "select" funciona para devolver solo datos seguros (no devuelve contraseñas)
      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        phone: true,

        isActive: true,

        createdAt: true,
      },
    });

    res.json({
      success: true,

      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// OBTENER ADMINISTRADORES
// ==========================================

// Igual que la función anterior, pero filtra para traer solo a los jefes/administradores
exports.getAdmins = async (req, res) => {
  try {
    const admins = await prisma.user.findMany({
      where: {
        companyId: req.user.companyId,

        // El filtro clave: rol de administrador
        role: "ADMIN",

        isDeleted: false,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        phone: true,

        isActive: true,

        createdAt: true,
      },
    });

    res.json({
      success: true,

      data: admins,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// OBTENER EMPLEADOS
// ==========================================

// Filtra la lista de usuarios para traer únicamente a los empleados regulares
exports.getEmployees = async (req, res) => {
  try {
    const employees = await prisma.user.findMany({
      where: {
        companyId: req.user.companyId,

        // El filtro clave: rol de empleado
        role: "EMPLOYEE",

        isDeleted: false,
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        phone: true,

        isActive: true,

        createdAt: true,
      },
    });

    res.json({
      success: true,

      data: employees,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ==========================================
// OBTENER MI EMPRESA
// ==========================================

// El sistema lee a qué empresa pertenece el usuario actual y devuelve los datos de esa empresa
exports.getMyCompany = async (req, res) => {
  try {
    const company = await prisma.company.findFirst({
      where: {
        // Busca usando el companyId asociado al usuario logueado
        id: req.user.companyId,

        isDeleted: false,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,

        message: "Empresa no encontrada",
      });
    }

    res.json({
      success: true,

      data: company,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
