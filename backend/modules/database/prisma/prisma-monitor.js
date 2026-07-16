// modules/database/prisma/prisma-monitor.js

const prisma = require(
  "../../../config/prisma.config",
);

/*
|--------------------------------------------------------------------------
| Prisma Monitoring
|--------------------------------------------------------------------------
*/

async function prismaMonitoring() {

  const start = Date.now();

  await prisma.$queryRaw`
        SELECT NOW();
    `;

  const latency =
        Date.now() - start;

  return {

    success: true,

    latency:
            `${latency}ms`,

    memoryUsage:
            process.memoryUsage(),

    cpuUsage:
            process.cpuUsage(),

    uptime:
            process.uptime(),

    timestamp:
            new Date(),
  };
}

module.exports = {

  prismaMonitoring,
};
