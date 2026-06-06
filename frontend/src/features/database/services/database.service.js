// src/modules/database/services/database.service.js

import api from "../../../api/axios";

/* ========================================
 * DATABASE HEALTH
 * ====================================== */

export async function getDatabaseHealth() {
  const response = await api.get("/database/health");

  return response.data;
}

/* ========================================
 * DATABASE METRICS
 * ====================================== */

export async function getDatabaseMetrics() {
  const response = await api.get("/database/metrics");

  return response.data;
}

/* ========================================
 * DATABASE MONITORING
 * ====================================== */

export async function getDatabaseMonitoring() {
  const response = await api.get("/database/monitoring");

  return response.data;
}

/* ========================================
 * DATABASE BRANCHES
 * ====================================== */

export async function getDatabaseBranches() {
  const response = await api.get("/database/branches");

  return response.data;
}

/* ========================================
 * CREATE DATABASE BRANCH
 * ====================================== */

export async function createDatabaseBranch(data) {
  const response = await api.post(
    "/database/branches",

    data,
  );

  return response.data;
}

/* ========================================
 * DATABASE BACKUPS
 * ====================================== */

export async function getDatabaseBackups() {
  const response = await api.get("/database/backups");

  return response.data;
}

/* ========================================
 * CREATE DATABASE BACKUP
 * ====================================== */

export async function createDatabaseBackup() {
  const response = await api.post("/database/backups");

  return response.data;
}

/* ========================================
 * RESTORE DATABASE BACKUP
 * ====================================== */

export async function restoreDatabaseBackup(data) {
  const response = await api.post(
    "/database/backups/restore",

    data,
  );

  return response.data;
}

/* ========================================
 * EXECUTE DATABASE QUERY
 * ====================================== */

export async function executeDatabaseQuery(query) {
  const response = await api.post(
    "/database/query",

    {
      query,
    },
  );

  return response.data;
}

/* ========================================
 * DATABASE MODULE
 * ====================================== */

const databaseService = {
  getDatabaseHealth,

  getDatabaseMetrics,

  getDatabaseMonitoring,

  getDatabaseBranches,

  createDatabaseBranch,

  getDatabaseBackups,

  createDatabaseBackup,

  restoreDatabaseBackup,

  executeDatabaseQuery,
};

export default databaseService;
