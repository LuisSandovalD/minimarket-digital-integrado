// config/database.config.js

const dotenv = require("dotenv");

dotenv.config();

/*
|--------------------------------------------------------------------------
| Database Environment Variables
|--------------------------------------------------------------------------
*/

const {
  DATABASE_URL,
  DIRECT_URL,

  NODE_ENV,

  DB_PROVIDER,

  DB_POOL_MIN,
  DB_POOL_MAX,

  DB_CONNECTION_LIMIT,
  DB_CONNECTION_TIMEOUT,
  DB_IDLE_TIMEOUT,

  DB_RETRY_ATTEMPTS,
  DB_RETRY_DELAY,

  DB_SSL,

  DB_QUERY_LOGGING,

  DB_MONITORING,

  DB_SLOW_QUERY_THRESHOLD,

  DB_BACKUP_ENABLED,
  DB_BACKUP_SCHEDULE,
  DB_BACKUP_RETENTION_DAYS,

  NEON_API_KEY,
  NEON_PROJECT_ID,
  NEON_DATABASE_HOST,

} = process.env;

/*
|--------------------------------------------------------------------------
| Database Configuration Object
|--------------------------------------------------------------------------
*/

const databaseConfig = {

  /*
    |--------------------------------------------------------------------------
    | General
    |--------------------------------------------------------------------------
    */

  provider:
        DB_PROVIDER || "postgresql",

  environment:
        NODE_ENV || "development",

  /*
    |--------------------------------------------------------------------------
    | URLs
    |--------------------------------------------------------------------------
    */

  url: DATABASE_URL,

  directUrl: DIRECT_URL,

  /*
    |--------------------------------------------------------------------------
    | Connection Pool
    |--------------------------------------------------------------------------
    */

  pool: {

    min:
            Number(DB_POOL_MIN || 2),

    max:
            Number(DB_POOL_MAX || 10),

    connectionLimit:
            Number(DB_CONNECTION_LIMIT || 20),

    connectionTimeout:
            Number(
              DB_CONNECTION_TIMEOUT || 10000,
            ),

    idleTimeout:
            Number(DB_IDLE_TIMEOUT || 30000),
  },

  /*
    |--------------------------------------------------------------------------
    | Retry Strategy
    |--------------------------------------------------------------------------
    */

  retry: {

    attempts:
            Number(DB_RETRY_ATTEMPTS || 5),

    delay:
            Number(DB_RETRY_DELAY || 2000),
  },

  /*
    |--------------------------------------------------------------------------
    | Monitoring
    |--------------------------------------------------------------------------
    */

  monitoring: {

    enabled:
            DB_MONITORING === "true",

    slowQueryThreshold:
            Number(
              DB_SLOW_QUERY_THRESHOLD || 500,
            ),
  },

  /*
    |--------------------------------------------------------------------------
    | Backup
    |--------------------------------------------------------------------------
    */

  backup: {

    enabled:
            DB_BACKUP_ENABLED === "true",

    schedule:
            DB_BACKUP_SCHEDULE ||
            "0 2 * * *",

    retentionDays:
            Number(
              DB_BACKUP_RETENTION_DAYS || 7,
            ),
  },

  /*
    |--------------------------------------------------------------------------
    | Security
    |--------------------------------------------------------------------------
    */

  security: {

    ssl:
            DB_SSL === "true",

    enableQueryLogging:
            DB_QUERY_LOGGING === "true",
  },

  /*
    |--------------------------------------------------------------------------
    | Neon Configuration
    |--------------------------------------------------------------------------
    */

  neon: {

    apiKey:
            NEON_API_KEY,

    projectId:
            NEON_PROJECT_ID,

    databaseHost:
            NEON_DATABASE_HOST,
  },
};

/*
|--------------------------------------------------------------------------
| Environment Validation
|--------------------------------------------------------------------------
*/

if (!databaseConfig.url) {

  throw new Error(
    "DATABASE_URL is required",
  );
}

/*
|--------------------------------------------------------------------------
| Development Logs
|--------------------------------------------------------------------------
*/

if (
  databaseConfig.environment !==
    "production"
) {

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🛢 Database Configuration");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  console.log(
    "Provider:",
    databaseConfig.provider,
  );

  console.log(
    "Environment:",
    databaseConfig.environment,
  );

  console.log(
    "Monitoring:",
    databaseConfig.monitoring.enabled,
  );

  console.log(
    "SSL:",
    databaseConfig.security.ssl,
  );

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = databaseConfig;
