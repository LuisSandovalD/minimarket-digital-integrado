// modules/database/pages/DatabasePage.jsx

import { useEffect, useState } from "react";

import useDatabase from "../hooks/useDatabase";

import DataBaseHeader from "../components/DataBaseHeader";

import DatabaseOverview from "../components/DatabaseOverview";

import DatabaseMonitoring from "../components/DatabaseMonitoring";

import DatabaseBranches from "../components/DatabaseBranches";

import DatabaseBackups from "../components/DatabaseBackups";

import { AlertModal } from "@/components/overlays";

export default function DatabasePage() {
  /* ========================================
   * DATABASE HOOK
   * ====================================== */

  const {
    health,

    metrics,

    monitoring,

    branches,

    backups,

    loading,

    error,

    successMessage,

    refresh,

    createBackup,

    clearError,

    clearSuccess,
  } = useDatabase();

  /* ========================================
   * MODALS
   * ====================================== */

  const [openError, setOpenError] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);

  /* ========================================
   * EFFECTS
   * ====================================== */

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenError(true);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenSuccess(true);
    }
  }, [successMessage]);

  /* ========================================
   * HANDLERS
   * ====================================== */

  async function handleRefresh() {
    try {
      await refresh();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateBackup() {
    try {
      await createBackup();
    } catch (err) {
      console.error(err);
    }
  }

  function handleCloseError() {
    setOpenError(false);

    clearError();
  }

  function handleCloseSuccess() {
    setOpenSuccess(false);

    clearSuccess();
  }

  /* ========================================
   * RENDER
   * ====================================== */

  return (
    <div
      className="
        space-y-10
        p-6
      "
    >
      {/* ========================================
       * HEADER
       * ====================================== */}

      <DataBaseHeader
        onRefresh={handleRefresh}
        onCreateBackup={handleCreateBackup}
        loading={loading}
      />

      {/* ========================================
       * RESUMEN GENERAL
       * ====================================== */}

      <section
        className="
          space-y-5
        "
      >
        <div
          className="
            space-y-1
          "
        >
          <h2
            className="
              text-xl
              font-semibold

              text-slate-900
              dark:text-white
            "
          >
            Resumen General
          </h2>

          <p
            className="
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Estado actual de PostgreSQL y métricas principales.
          </p>
        </div>

        <DatabaseOverview
          health={health}
          metrics={metrics}
          monitoring={monitoring}
        />
      </section>

      {/* ========================================
       * MONITOREO
       * ====================================== */}

      <section
        className="
          space-y-5
        "
      >
        <div
          className="
            space-y-1
          "
        >
          <h2
            className="
              text-xl
              font-semibold

              text-slate-900
              dark:text-white
            "
          >
            Monitoreo
          </h2>

          <p
            className="
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Consumo de memoria, uptime y actividad del servidor.
          </p>
        </div>

        <DatabaseMonitoring monitoring={monitoring} />
      </section>

      {/* ========================================
       * BRANCHES
       * ====================================== */}

      <section
        className="
          space-y-5
        "
      >
        <div
          className="
            space-y-1
          "
        >
          <h2
            className="
              text-xl
              font-semibold

              text-slate-900
              dark:text-white
            "
          >
            Branches
          </h2>

          <p
            className="
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Administración de ramas Neon y entornos activos.
          </p>
        </div>

        <DatabaseBranches branches={branches} />
      </section>

      {/* ========================================
       * BACKUPS
       * ====================================== */}

      <section
        className="
          space-y-5
        "
      >
        <div
          className="
            space-y-1
          "
        >
          <h2
            className="
              text-xl
              font-semibold

              text-slate-900
              dark:text-white
            "
          >
            Backups
          </h2>

          <p
            className="
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Gestión y restauración de respaldos de la base de datos.
          </p>
        </div>

        <DatabaseBackups backups={backups} />
      </section>

      {/* ========================================
       * ERROR MODAL
       * ====================================== */}

      <AlertModal
        open={openError}
        onClose={handleCloseError}
        type="error"
        title="Error de Base de Datos"
        message={error}
      />

      {/* ========================================
       * SUCCESS MODAL
       * ====================================== */}

      <AlertModal
        open={openSuccess}
        onClose={handleCloseSuccess}
        type="success"
        title="Operación Exitosa"
        message={successMessage}
      />
    </div>
  );
}
