// config/prisma.config.js

const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const { auditStorage } = require("./auditContext"); // 👈 Importamos el almacén de auditoría

dotenv.config();

/*
|--------------------------------------------------------------------------
| Prisma Client Configuration
|--------------------------------------------------------------------------
|
| Configuración centralizada de Prisma para:
| - PostgreSQL
| - Neon
| - Multiempresa ERP/POS
| - Logging
| - Monitoring
| - Transactions
|
*/

const globalForPrisma = global;

/*
|--------------------------------------------------------------------------
| Prisma Logs
|--------------------------------------------------------------------------
|
| query  -> muestra SQL ejecutado
| info   -> información general
| warn   -> advertencias
| error  -> errores
|
*/

const prismaLogs = [
    {
        emit: "event",
        level: "query",
    },
    {
        emit: "stdout",
        level: "info",
    },
    {
        emit: "stdout",
        level: "warn",
    },
    {
        emit: "stdout",
        level: "error",
    },
];

/*
|--------------------------------------------------------------------------
| Prisma Client Instance (Raw)
|--------------------------------------------------------------------------
| 
| Instancia base sin extensiones para evitar bucles infinitos al guardar logs.
|
*/

const prismaRaw =
    globalForPrisma.prismaRaw ||
    new PrismaClient({
        log: prismaLogs,
        errorFormat: "pretty",
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prismaRaw = prismaRaw;
}

/*
|--------------------------------------------------------------------------
| Prisma Extensions (Auditoría Automatizada)
|--------------------------------------------------------------------------
| 
| Extendemos la instancia base para escuchar mutaciones y auditar.
|
*/

const prisma = prismaRaw.$extends({
    query: {
        $allModel: {
            // 🟢 CREACIONES (CREATE)
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

            // 🟡 ACTUALIZACIONES Y BORRADOS LÓGICOS (UPDATE)
            async update({ model, args, query }) {
                const context = auditStorage.getStore();
                if (!context || model === "AuditLog") return query(args);

                const oldValues = await prismaRaw[model].findFirst({
                    where: args.where,
                });

                const result = await query(args);
                const isSoftDelete = args.data?.isDeleted === true;
                const entityId = result?.id || oldValues?.id || 0;

                await prismaRaw.auditLog.create({
                    data: {
                        action: isSoftDelete ? "SOFT_DELETE" : "UPDATE",
                        entityType: model,
                        entityId: Number(entityId),
                        description: isSoftDelete
                            ? `Registro enviado a la papelera (Soft Delete) en ${model}`
                            : `Actualización de datos en la tabla ${model}`,
                        oldValues: oldValues || {},
                        newValues: args.data || {},
                        userId: context.userId,
                        companyId: context.companyId,
                        branchId: context.branchId,
                        ipAddress: context.ipAddress,
                        userAgent: context.userAgent,
                    },
                });

                return result;
            },

            // 🔴 ELIMINACIONES FÍSICAS (DELETE)
            async delete({ model, args, query }) {
                const context = auditStorage.getStore();
                if (!context || model === "AuditLog") return query(args);

                const oldValues = await prismaRaw[model].findFirst({
                    where: args.where,
                });

                const result = await query(args);
                const entityId = oldValues?.id || 0;

                await prismaRaw.auditLog.create({
                    data: {
                        action: "DELETE",
                        entityType: model,
                        entityId: Number(entityId),
                        description: `Eliminación física permanente de registro en ${model}`,
                        oldValues: oldValues || {},
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

/*
|--------------------------------------------------------------------------
| Query Logging
|--------------------------------------------------------------------------
|
| Solo en desarrollo para evitar spam
| en producción. El listener se acopla a prismaRaw.
|
*/

if (process.env.NODE_ENV !== "production") {

    prismaRaw.$on("query", async (event) => {

        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🟢 Prisma Query");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        console.log("📌 Query:");
        console.log(event.query);

        console.log("\n📦 Params:");
        console.log(event.params);

        console.log("\n⏱ Duration:");
        console.log(`${event.duration}ms`);

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    });
}

/*
|--------------------------------------------------------------------------
| Database Connection Test
|--------------------------------------------------------------------------
*/

async function connectDatabase() {

    try {

        await prismaRaw.$connect();

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✅ Database connected");
        console.log(
            `🌍 Environment: ${process.env.NODE_ENV}`
        );
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    } catch (error) {

        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ Database connection failed");
        console.error(error.message);
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        process.exit(1);
    }
}

/*
|--------------------------------------------------------------------------
| Graceful Shutdown
|--------------------------------------------------------------------------
|
| Cierra Prisma correctamente
| cuando el servidor termina.
|
*/

async function disconnectDatabase() {

    try {

        await prismaRaw.$disconnect();

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔴 Prisma disconnected");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    } catch (error) {

        console.error(
            "Error disconnecting database:",
            error.message
        );
    }
}

/*
|--------------------------------------------------------------------------
| Process Events
|--------------------------------------------------------------------------
*/

process.on("beforeExit", async () => {
    await disconnectDatabase();
});

process.on("SIGINT", async () => {

    console.log("\n⚠ SIGINT received");

    await disconnectDatabase();

    process.exit(0);
});

process.on("SIGTERM", async () => {

    console.log("\n⚠ SIGTERM received");

    await disconnectDatabase();

    process.exit(0);
});

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

// Exportamos el cliente extendido para usarlo en todos tus servicios/controladores
module.exports = prisma;

module.exports.connectDatabase =
    connectDatabase;

module.exports.disconnectDatabase =
    disconnectDatabase;