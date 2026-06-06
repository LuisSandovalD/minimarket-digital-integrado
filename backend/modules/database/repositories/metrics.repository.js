const prisma = require(
  "../../../config/prisma.config"
);

class MetricsRepository {

  /*
  |--------------------------------------------------------------------------
  | Tables Count
  |--------------------------------------------------------------------------
  */

  async getTablesCount() {

    const result =
      await prisma.$queryRaw`

                SELECT
                    count(*)::int AS total

                FROM information_schema.tables

                WHERE table_schema = 'public';

            `;

    return result[0];
  }

  /*
  |--------------------------------------------------------------------------
  | Indexes Count
  |--------------------------------------------------------------------------
  */

  async getIndexesCount() {

    const result =
      await prisma.$queryRaw`

                SELECT
                    count(*)::int AS total

                FROM pg_indexes

                WHERE schemaname = 'public';

            `;

    return result[0];
  }

  /*
  |--------------------------------------------------------------------------
  | Database Statistics
  |--------------------------------------------------------------------------
  */

  async getDatabaseStats() {

    return prisma.$queryRaw`

            SELECT

                numbackends::int,

                xact_commit::bigint::text,

                xact_rollback::bigint::text,

                blks_read::bigint::text,

                blks_hit::bigint::text,

                tup_returned::bigint::text,

                tup_fetched::bigint::text,

                tup_inserted::bigint::text,

                tup_updated::bigint::text,

                tup_deleted::bigint::text

            FROM pg_stat_database

            WHERE datname = current_database();

        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Cache Hit Ratio
  |--------------------------------------------------------------------------
  */

  async getCacheHitRatio() {

    return prisma.$queryRaw`

            SELECT

                round(

                    (
                        sum(blks_hit) * 100.0 /

                        nullif(

                            sum(blks_hit) +
                            sum(blks_read),

                            0

                        )

                    ),

                    2

                )::text AS cache_hit_ratio

            FROM pg_stat_database;

        `;
  }

  /*
  |--------------------------------------------------------------------------
  | Database Size
  |--------------------------------------------------------------------------
  */

  async getDatabaseSizeBytes() {

    return prisma.$queryRaw`

            SELECT

                pg_database_size(
                    current_database()
                )::bigint::text AS size;

        `;
  }
}

module.exports =
  new MetricsRepository();