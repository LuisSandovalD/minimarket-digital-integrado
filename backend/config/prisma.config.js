// config/prisma.config.js

const { PrismaClient } = require("@prisma/client");

const dotenv = require("dotenv");

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
| Prisma Client Instance
|--------------------------------------------------------------------------
*/

const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: prismaLogs,

        errorFormat: "pretty",
    });

/*
|--------------------------------------------------------------------------
| Query Logging
|--------------------------------------------------------------------------
|
| Solo en desarrollo para evitar spam
| en producción.
|
*/

if (process.env.NODE_ENV !== "production") {

    prisma.$on("query", async (event) => {

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

        await prisma.$connect();

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

        await prisma.$disconnect();

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
| Development Singleton
|--------------------------------------------------------------------------
|
| Evita múltiples conexiones
| en hot reload de Node.js
|
*/

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = prisma;

module.exports.connectDatabase =
    connectDatabase;

module.exports.disconnectDatabase =
    disconnectDatabase;