// modules/database/repositories/health.repository.js

const prisma = require(
  "../../../config/prisma.config"
);

class HealthRepository {

  /*
  |--------------------------------------------------------------------------
  | Ping
  |--------------------------------------------------------------------------
  */

  async ping() {

    return prisma.$queryRaw`
            SELECT 1;
        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Server Time
  |--------------------------------------------------------------------------
  */

  async getServerTime() {

    return prisma.$queryRaw`
            SELECT NOW();
        `;
  }

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL Version
  |--------------------------------------------------------------------------
  */

  async getPostgresVersion() {

    return prisma.$queryRaw`
            SELECT version();
        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Uptime
  |--------------------------------------------------------------------------
  */

  async getUptime() {

    return prisma.$queryRaw`
            SELECT
                date_trunc(
                    'second',
                    current_timestamp -
                    pg_postmaster_start_time()
                ) AS uptime;
        `;
  }
}

module.exports =
  new HealthRepository();