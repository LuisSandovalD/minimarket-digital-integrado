// modules/database/hooks/useDatabase.js

import { useCallback, useEffect, useState } from "react";

import {
  createDatabaseBackup,
  createDatabaseBranch,
  executeDatabaseQuery,
  getDatabaseBackups,
  getDatabaseBranches,
  getDatabaseHealth,
  getDatabaseMetrics,
  getDatabaseMonitoring,
  restoreDatabaseBackup,
} from "../services/database.service";

export default function useDatabase() {
  /* ========================================
   * DATA
   * ====================================== */

  const [health, setHealth] = useState(null);

  const [metrics, setMetrics] = useState(null);

  const [monitoring, setMonitoring] = useState(null);

  const [branches, setBranches] = useState([]);

  const [backups, setBackups] = useState([]);

  /* ========================================
   * LOADING
   * ====================================== */

  const [loading, setLoading] = useState({
    health: false,

    metrics: false,

    monitoring: false,

    branches: false,

    backups: false,

    refresh: false,

    backup: false,
  });

  /* ========================================
   * STATES
   * ====================================== */

  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  /* ========================================
   * LOAD DATABASE
   * ====================================== */

  const loadDatabase = useCallback(async () => {
    try {
      setError(null);

      setLoading({
        health: true,

        metrics: true,

        monitoring: true,

        branches: true,

        backups: true,

        refresh: false,

        backup: false,
      });

      const [
        healthResponse,

        metricsResponse,

        monitoringResponse,

        branchesResponse,

        backupsResponse,
      ] = await Promise.all([
        getDatabaseHealth(),

        getDatabaseMetrics(),

        getDatabaseMonitoring(),

        getDatabaseBranches(),

        getDatabaseBackups(),
      ]);

      setHealth(healthResponse?.data);

      setMetrics(metricsResponse?.data);

      setMonitoring(monitoringResponse?.data);

      setBranches(branchesResponse?.data?.branches?.branches || []);

      setBackups(backupsResponse?.data?.backups || []);
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message || err?.message || "Database Error",
      );
    } finally {
      setLoading({
        health: false,

        metrics: false,

        monitoring: false,

        branches: false,

        backups: false,

        refresh: false,

        backup: false,
      });
    }
  }, []);

  /* ========================================
   * REFRESH
   * ====================================== */

  const refresh = useCallback(async () => {
    try {
      setLoading((prev) => ({
        ...prev,

        refresh: true,
      }));

      await loadDatabase();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({
        ...prev,

        refresh: false,
      }));
    }
  }, [loadDatabase]);

  /* ========================================
   * CREATE BACKUP
   * ====================================== */

  async function handleCreateBackup() {
    try {
      setError(null);

      setLoading((prev) => ({
        ...prev,

        backup: true,
      }));

      const response = await createDatabaseBackup();

      setSuccessMessage(response?.message || "Backup creado correctamente");

      /* ========================================
       * RECARGAR BACKUPS
       * ====================================== */

      const backupsResponse = await getDatabaseBackups();

      setBackups(backupsResponse?.data?.backups || []);

      return response;
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message || err?.message || "Error creando backup",
      );

      throw err;
    } finally {
      setLoading((prev) => ({
        ...prev,

        backup: false,
      }));
    }
  }

  /* ========================================
   * HELPERS
   * ====================================== */

  function clearError() {
    setError(null);
  }

  function clearSuccess() {
    setSuccessMessage("");
  }

  /* ========================================
   * INITIAL LOAD
   * ====================================== */

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDatabase();
  }, [loadDatabase]);

  /* ========================================
   * AUTO REFRESH
   * ====================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [refresh]);

  /* ========================================
   * RETURN
   * ====================================== */

  return {
    /* DATA */

    health,

    metrics,

    monitoring,

    branches,

    backups,

    /* STATES */

    loading,

    error,

    successMessage,

    /* ACTIONS */

    refresh,

    reload: loadDatabase,

    createBackup: handleCreateBackup,

    restoreBackup: restoreDatabaseBackup,

    executeQuery: executeDatabaseQuery,

    createBranch: createDatabaseBranch,

    /* HELPERS */

    clearError,

    clearSuccess,
  };
}
