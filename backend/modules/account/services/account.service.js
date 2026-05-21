// ========================================
// services/account.service.js
// ========================================

// Importamos bcrypt, una herramienta de seguridad que sirve para encriptar (ocultar) las contraseñas
const bcrypt =
  require("bcryptjs");

// Importamos prisma, que es nuestro comunicador oficial con la base de datos
const prisma =
  require("../../../prisma/client");

// Importamos un "mapeador" que sirve para darle un formato limpio a los datos antes de enviarlos
const mapper =
  require("../utils/account.mapper");

// Importamos los validadores que revisan que la información enviada sea correcta
const {

  updateProfileValidation,

  changePasswordValidation,

  deleteAccountValidation,

} = require(
  "../validations/account.validation"
);

/* ======================================
 * GET MY ACCOUNT
 * Busca y junta toda la información de un usuario
 * ==================================== */

exports.getMyAccount =
  async (userId) => {

    // Le pedimos a la base de datos que busque a este usuario único por su ID
    const user =
      await prisma.user.findUnique({

        where: {
          id: Number(userId),
        },

        // Con "include" le decimos que además del usuario, nos traiga toda esta información relacionada:
        include: {

          /* ======================================
           * COMPANY
           * Trae los datos de la empresa a la que pertenece
           * ==================================== */

          company: {

            select: {

              id: true,

              name: true,

              slug: true,

              logo: true,

              email: true,

              phone: true,

              website: true,

              subscriptionTier: true,

            },

          },

          /* ======================================
           * BRANCH
           * Trae los datos de la sucursal específica
           * ==================================== */

          branch: {

            select: {

              id: true,

              name: true,

              code: true,

              logo: true,

              address: true,

              city: true,

              state: true,

              country: true,

            },

          },

          /* ======================================
           * MANAGER
           * Trae los datos de su jefe o gerente
           * ==================================== */

          manager: {

            select: {

              id: true,

              name: true,

              email: true,

              role: true,

            },

          },

          /* ======================================
           * SUBORDINATES
           * Trae los datos de los empleados a su cargo
           * ==================================== */

          subordinates: {

            select: {

              id: true,

              name: true,

              email: true,

              role: true,

              avatar: true,

            },

          },

          /* ======================================
           * SESSIONS
           * Trae un historial de sus últimas 10 sesiones activas
           * ==================================== */

          sessions: {

            where: {
              isActive: true,
            },

            orderBy: {
              createdAt: "desc",
            },

            take: 10,

          },

          /* ======================================
           * COUNTS
           * Cuenta cuántas ventas, compras, tickets, etc. ha hecho
           * ==================================== */

          _count: {

            select: {

              sales: true,

              purchases: true,

              supportTickets: true,

              notifications: true,

              sessions: true,

            },

          },

        },

      });

    // Si la base de datos no encuentra al usuario, arroja un error
    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    // Pasa los datos por el mapeador para darles formato y los envía de vuelta
    return mapper(user);

  };

/* ======================================
 * UPDATE PROFILE
 * Lógica para actualizar los datos del usuario
 * ==================================== */

exports.updateMyAccount =
  async (userId, data) => {

    // Primero validamos que los datos nuevos estén correctos
    updateProfileValidation(
      data
    );

    /* ======================================
     * VERIFY EMAIL
     * Revisa que el nuevo correo que quiere usar no pertenezca ya a otra persona
     * ==================================== */

    const exists =
      await prisma.user.findFirst({

        where: {

          email: data.email,

          NOT: {
            id: Number(userId),
          },

        },

      });

    if (exists) {

      throw new Error(
        "El correo ya está en uso"
      );

    }

    /* ======================================
     * UPDATE USER
     * Guarda el nuevo nombre, correo, teléfono o foto en la base de datos
     * ==================================== */

    const updated =
      await prisma.user.update({

        where: {
          id: Number(userId),
        },

        data: {

          name:
            data.name,

          email:
            data.email,

          phone:
            data.phone,

          avatar:
            data.avatar,

        },

        // Incluye los datos relacionados para devolver el perfil actualizado completo
        include: {

          company: true,

          branch: true,

          manager: true,

          subordinates: true,

          sessions: true,

          _count: {

            select: {

              sales: true,

              purchases: true,

              supportTickets: true,

              notifications: true,

              sessions: true,

            },

          },

        },

      });

    /* ======================================
     * AUDIT LOG
     * Guarda un registro en la bitácora de que este usuario actualizó su perfil
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "UPDATE",

        entityType: "USER",

        entityId: updated.id,

        description:
          "Actualización de perfil",

        userId: updated.id,

        companyId:
          updated.companyId,

        branchId:
          updated.branchId,

      },

    });

    return mapper(updated);

  };

/* ======================================
 * UPDATE PASSWORD
 * Lógica de seguridad para cambiar la contraseña
 * ==================================== */

exports.updatePassword =
  async (userId, data) => {

    // Valida que la nueva contraseña tenga los caracteres correctos
    changePasswordValidation(
      data
    );

    // Busca al usuario en la base de datos
    const user =
      await prisma.user.findUnique({

        where: {
          id: Number(userId),
        },

      });

    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    /* ======================================
     * VERIFY PASSWORD
     * Compara la contraseña que el usuario escribió con la que está guardada (encriptada)
     * ==================================== */

    const valid =
      await bcrypt.compare(
        data.currentPassword,
        user.password
      );

    if (!valid) {

      throw new Error(
        "Contraseña actual incorrecta"
      );

    }

    /* ======================================
     * HASH PASSWORD
     * Encripta la NUEVA contraseña para que sea ilegible en la base de datos
     * ==================================== */

    const hashed =
      await bcrypt.hash(
        data.newPassword,
        10
      );

    /* ======================================
     * UPDATE PASSWORD
     * Guarda la nueva contraseña y reinicia los intentos de inicio de sesión a 0
     * ==================================== */

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {

        password: hashed,

        loginAttempts: 0,

      },

    });

    /* ======================================
     * AUDIT LOG
     * Guarda en la bitácora que se cambió una contraseña
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "UPDATE",

        entityType: "PASSWORD",

        entityId:
          Number(userId),

        description:
          "Cambio de contraseña",

        userId:
          Number(userId),

        companyId:
          user.companyId,

        branchId:
          user.branchId,

      },

    });

  };

/* ======================================
 * GET ACTIVE SESSIONS
 * Busca en la base de datos dónde está iniciada la cuenta actualmente
 * ==================================== */

exports.getSessions =
  async (userId) => {

    return prisma.userSession.findMany({

      where: {

        userId:
          Number(userId),

        isActive: true,

      },

      orderBy: {
        createdAt: "desc",
      },

    });

  };

/* ======================================
 * REVOKE SESSION
 * Busca una sesión específica y la marca como inactiva (la cierra)
 * ==================================== */

exports.revokeSession =
  async (userId, sessionId) => {

    // Primero verifica que la sesión realmente exista y le pertenezca a este usuario
    const session =
      await prisma.userSession.findFirst({

        where: {

          id:
            Number(sessionId),

          userId:
            Number(userId),

        },

      });

    if (!session) {

      throw new Error(
        "Sesión no encontrada"
      );

    }

    // Cambia el estado a inactivo para cerrar la sesión de ese dispositivo
    await prisma.userSession.update({

      where: {
        id:
          Number(sessionId),
      },

      data: {
        isActive: false,
      },

    });

  };

/* ======================================
 * ENABLE 2FA
 * Enciende la doble seguridad para el usuario
 * ==================================== */

exports.enable2FA =
  async (userId) => {

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {
        twoFactorEnabled: true,
      },

    });

  };

/* ======================================
 * DISABLE 2FA
 * Apaga la doble seguridad para el usuario
 * ==================================== */

exports.disable2FA =
  async (userId) => {

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {
        twoFactorEnabled: false,
      },

    });

  };

/* ======================================
 * DELETE ACCOUNT
 * Lógica para dar de baja a un usuario del minimarket
 * ==================================== */

exports.deleteMyAccount =
  async (userId, data) => {

    // Revisa que la petición de eliminar esté bien formulada
    deleteAccountValidation(
      data
    );

    // Busca al usuario
    const user =
      await prisma.user.findUnique({

        where: {
          id: Number(userId),
        },

      });

    if (!user) {

      throw new Error(
        "Usuario no encontrado"
      );

    }

    /* ======================================
     * VERIFY PASSWORD
     * Por seguridad, pide y verifica la contraseña antes de borrar todo
     * ==================================== */

    const valid =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!valid) {

      throw new Error(
        "Contraseña incorrecta"
      );

    }

    /* ======================================
     * SOFT DELETE
     * "Borrado lógico": En lugar de destruir los datos reales, solo oculta la cuenta y la marca como eliminada
     * ==================================== */

    await prisma.user.update({

      where: {
        id: Number(userId),
      },

      data: {

        isDeleted: true,

        isActive: false,

        isOnline: false,

        deletedAt: new Date(),

      },

    });

    /* ======================================
     * CLOSE SESSIONS
     * Cierra todas las sesiones que este usuario tuviera abiertas en cualquier dispositivo
     * ==================================== */

    await prisma.userSession.updateMany({

      where: {
        userId:
          Number(userId),
      },

      data: {
        isActive: false,
      },

    });

    /* ======================================
     * AUDIT LOG
     * Deja constancia en la bitácora de que la cuenta fue dada de baja
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "SOFT_DELETE",

        entityType: "USER",

        entityId:
          Number(userId),

        description:
          "Eliminación de cuenta",

        userId:
          Number(userId),

        companyId:
          user.companyId,

        branchId:
          user.branchId,

      },

    });

  };

  /* ======================================
 * TOGGLE 2FA
 * Interruptor general para encender o apagar el 2FA
 * ==================================== */

exports.toggleTwoFactor =
  async (
    userId,
    enabled
  ) => {

    // Actualiza el estado del 2FA según lo que pida el usuario
    const updatedUser =
      await prisma.user.update({

        where: {
          id: Number(userId),
        },

        data: {

          twoFactorEnabled:
            enabled,

        },

      });

    /* ======================================
     * AUDIT LOG
     * Registra en la bitácora si el 2FA fue encendido o apagado
     * ==================================== */

    await prisma.auditLog.create({

      data: {

        action: "UPDATE",

        entityType: "USER_2FA",

        entityId:
          updatedUser.id,

        description:
          enabled
            ? "2FA activado"
            : "2FA desactivado",

        userId:
          updatedUser.id,

        companyId:
          updatedUser.companyId,

        branchId:
          updatedUser.branchId,

      },

    });

    return {

      enabled,

    };

  };