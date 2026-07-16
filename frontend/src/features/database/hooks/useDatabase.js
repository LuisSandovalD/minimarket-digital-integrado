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
    fetch: false,
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
  const loadDatabase = useCallback(async (isBackground = false) => {
    try {
      setError(null);
      setLoading({
        fetch: !isBackground, // Solo activa la pantalla de carga completa si NO es un refresco de fondo
        health: true,
        metrics: true,
        monitoring: true,
        branches: true,
        backups: true,
        refresh: isBackground,
        backup: false,
      });

      const [healthResponse, metricsResponse, monitoringResponse, branchesResponse, backupsResponse] =
        await Promise.all([
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
      // Opcional: No abrumar con modales de error si falla un refresco silencioso automático
      setError(err?.response?.data?.message || err?.message || "Database Error");
    } finally {
      setLoading({
        fetch: false,
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
   * REFRESH (Manual o automático de fondo)
   * ====================================== */
  const refresh = useCallback(
    async (isBackground = false) => {
      try {
        setLoading((prev) => ({ ...prev, refresh: true }));
        await loadDatabase(isBackground);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, refresh: false }));
      }
    },
    [loadDatabase],
  );

  /* ========================================
   * CREATE BACKUP
   * ====================================== */
  async function handleCreateBackup() {
    try {
      setError(null);
      setLoading((prev) => ({ ...prev, backup: true }));

      const response = await createDatabaseBackup();
      setSuccessMessage(response?.message || "Backup creado correctamente");

      const backupsResponse = await getDatabaseBackups();
      setBackups(backupsResponse?.data?.backups || []);

      return response;
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err?.message || "Error creando backup");
      throw err;
    } finally {
      setLoading((prev) => ({ ...prev, backup: false }));
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
   * INITIAL LOAD (Carga inicial interactiva)
   * ====================================== */
  useEffect(() => {
    loadDatabase(false);
  }, [loadDatabase]);

  /* ========================================
   * AUTO REFRESH (Silencioso cada 30 segundos)
   * ====================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      refresh(true); // Se envía "true" para que no salte el Skeleton de carga
    }, 30000);

    return () => clearInterval(interval);
  }, [refresh]);

  /* ========================================
   * RETURN
   * ====================================== */
  return {
    health,
    metrics,
    monitoring,
    branches,
    backups,
    loading,
    error,
    successMessage,
    refresh: () => refresh(true), // El botón actualizar también puede ser silencioso o background
    reload: () => loadDatabase(false),
    createBackup: handleCreateBackup,
    restoreBackup: restoreDatabaseBackup,
    executeQuery: executeDatabaseQuery,
    createBranch: createDatabaseBranch,
    clearError,
    clearSuccess,
  };
}
