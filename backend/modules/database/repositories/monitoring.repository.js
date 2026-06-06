const prisma = require(
  "../../../config/prisma.config"
);

class MonitoringRepository {

  /*
  |--------------------------------------------------------------------------
  | Active Connections
  |--------------------------------------------------------------------------
  */

  async getActiveConnections() {

    return prisma.$queryRaw`

            SELECT
                pid,
                usename,
                application_name,
                client_addr::text,
                state,

                CAST(
                    query_start AS TEXT
                ) AS query_start

            FROM pg_stat_activity

            WHERE state != 'idle';

        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Locks
  |--------------------------------------------------------------------------
  */

  async getLocks() {

    return prisma.$queryRaw`

            SELECT
                locktype,

                database::text,

                relation::text,

                mode,

                granted,

                pid

            FROM pg_locks;

        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Slow Queries
  |--------------------------------------------------------------------------
  */

  async getSlowQueries() {

    return prisma.$queryRaw`

            SELECT
                pid,

                CAST(
                    now() - query_start
                    AS TEXT
                ) AS duration,

                state,

                query

            FROM pg_stat_activity

            WHERE state != 'idle'

            ORDER BY
                now() - query_start DESC;

        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Replication Status
  |--------------------------------------------------------------------------
  */

  async getReplicationStatus() {

    return prisma.$queryRaw`

            SELECT

                pid,

                usesysid::text,

                usename,

                application_name,

                client_addr::text,

                state,

                sync_state

            FROM pg_stat_replication;

        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Long Running Transactions
  |--------------------------------------------------------------------------
  */

  async getLongRunningTransactions() {

    return prisma.$queryRaw`

            SELECT
                pid,

                CAST(
                    now() - xact_start
                    AS TEXT
                ) AS duration,

                state,

                query

            FROM pg_stat_activity

            WHERE xact_start IS NOT NULL

            ORDER BY
                now() - xact_start DESC;

        `;
  }
}

module.exports =
  new MonitoringRepository();