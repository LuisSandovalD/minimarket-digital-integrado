/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard ERP
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Dashboard General
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           example: LAST_MONTH
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2026-01-01
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2026-12-31
 *
 *     responses:
 *       200:
 *         description: Dashboard obtenido correctamente
 */