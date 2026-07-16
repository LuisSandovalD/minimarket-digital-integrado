const { PrismaClient } = require("@prisma/client");
const { auditStorage } = require("../config/auditContext");

// Cliente crudo interno para insertar los logs sin causar bucle infinito
const prismaRaw = new PrismaClient();

// Extendemos el cliente nativo con la lógica automatizada de auditoría
const prisma = prismaRaw.$extends({
  query: {
    $allModel: {
      // 🟢 DETECTAR CREACIONES (CREATE)
      async create({ model, args, query }) {
        const context = auditStorage.getStore();
        if (!context || model === "AuditLog") return query(args);

        const result = await query(args);

        await prismaRaw.auditLog.create({
          data: {
            action: "CREATE",
            entityType: model,
            entityId: result.id ? Number(result.id) : 0,
            description: `Creación automática en la tabla ${model}`,
            newValues: result,
            userId: context.userId,
            companyId: context.companyId,
            branchId: context.branchId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
          },
        });

        return result;
      },

      // 🟡 DETECTAR ACTUALIZACIONES Y BORRADOS LÓGICOS (UPDATE / SOFT_DELETE)
      async update({ model, args, query }) {
        const context = auditStorage.getStore();
        if (!context || model === "AuditLog") return query(args);

        // Capturamos el registro antes de cambiarlo para tener el historial ("oldValues")
        const oldValues = await prismaRaw[model].findUnique({
          where: args.where,
        });

        const result = await query(args);
        const isSoftDelete = args.data?.isDeleted === true;

        await prismaRaw.auditLog.create({
          data: {
            action: isSoftDelete ? "SOFT_DELETE" : "UPDATE",
            entityType: model,
            entityId: args.where.id ? Number(args.where.id) : 0,
            description: isSoftDelete
              ? `Registro enviado a la papelera (Soft Delete) en ${model}`
              : `Actualización de datos en la tabla ${model}`,
            oldValues: oldValues,
            newValues: args.data, // Solo los campos editados enviados en el body
            userId: context.userId,
            companyId: context.companyId,
            branchId: context.branchId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
          },
        });

        return result;
      },

      // 🔴 DETECTAR ELIMINACIONES FÍSICAS (DELETE)
      async delete({ model, args, query }) {
        const context = auditStorage.getStore();
        if (!context || model === "AuditLog") return query(args);

        const oldValues = await prismaRaw[model].findUnique({
          where: args.where,
        });

        const result = await query(args);

        await prismaRaw.auditLog.create({
          data: {
            action: "DELETE",
            entityType: model,
            entityId: args.where.id ? Number(args.where.id) : 0,
            description: `Eliminación física permanente de registro en ${model}`,
            oldValues: oldValues,
            userId: context.userId,
            companyId: context.companyId,
            branchId: context.branchId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
          },
        });

        return result;
      },
    },
  },
});

module.exports = prisma;
