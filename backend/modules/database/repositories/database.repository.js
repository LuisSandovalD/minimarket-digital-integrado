// modules/database/repositories/database.repository.js

const prisma = require(
  "../../../config/prisma.config"
);

class DatabaseRepository {

  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  */

  async checkConnection() {

    return prisma.$queryRaw`
            SELECT NOW();
        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Database Info
  |--------------------------------------------------------------------------
  */

  async getDatabaseVersion() {

    return prisma.$queryRaw`
            SELECT version();
        `;
  }

  async getCurrentDatabase() {

    return prisma.$queryRaw`
            SELECT current_database();
        `;
  }

  async getDatabaseSize() {

    return prisma.$queryRaw`
            SELECT pg_size_pretty(
                pg_database_size(current_database())
            ) AS size;
        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Connections
  |--------------------------------------------------------------------------
  */

  async getConnections() {

    return prisma.$queryRaw`
            SELECT count(*)::int AS total
            FROM pg_stat_activity;
        `;
  }

  async getActiveConnections() {

    return prisma.$queryRaw`
            SELECT
                pid,
                usename,
                application_name,
                client_addr,
                state,
                backend_start
            FROM pg_stat_activity
            WHERE state != 'idle';
        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Schemas & Tables
  |--------------------------------------------------------------------------
  */

  async getSchemas() {

    return prisma.$queryRaw`
            SELECT schema_name
            FROM information_schema.schemata;
        `;
  }

  async getTables() {

    return prisma.$queryRaw`
            SELECT
                table_name
            FROM information_schema.tables
            WHERE table_schema = 'public';
        `;
  }

  async getTableSize(tableName) {

    // Validar que el nombre de tabla sea seguro
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
      throw new Error("Nombre de tabla inválido");
    }

    return prisma.$queryRawUnsafe(`
            SELECT pg_size_pretty(
                pg_total_relation_size('${tableName}')
            ) AS size;
        `);
  }

  /*
  |--------------------------------------------------------------------------
  | Transactions
  |--------------------------------------------------------------------------
  */

  async beginTransaction(callback) {

    return prisma.$transaction(callback);
  }
}

module.exports =
  new DatabaseRepository();