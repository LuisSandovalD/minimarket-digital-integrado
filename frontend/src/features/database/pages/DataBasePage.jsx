// ========================================
// features/database/pages/DatabasePage.jsx
// ========================================

import { AlertModal } from "@/components/overlays";
import { useEffect, useState } from "react";
import DatabaseBackups from "../components/DatabaseBackups";
import DatabaseBranches from "../components/DatabaseBranches";
import DataBaseHeader from "../components/DataBaseHeader";
import DatabaseLoading from "../components/DatabaseLoading";
import DatabaseMonitoring from "../components/DatabaseMonitoring";
import DatabaseOverview from "../components/DatabaseOverview";
import useDatabase from "../hooks/useDatabase";

export default function DatabasePage() {
  const {
    health,
    metrics,
    monitoring,
    branches,
    backups,
    loading,
    successMessage,
    refresh,
    createBackup,
    clearSuccess,
  } = useDatabase();

  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    if (successMessage) setOpenSuccess(true);
  }, [successMessage]);

  const handleRefresh = async () => {
    try {
      await refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateBackup = async () => {
    try {
      await createBackup();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    clearSuccess();
  };

  // El loading ocupa toda la pantalla de forma adaptativa
  if (loading?.fetch && !health) {
    return <DatabaseLoading />;
  }

  return (
    <div className="w-full min-h-screen p-6 space-y-10 bg-transparent">
      <DataBaseHeader
        onRefresh={handleRefresh}
        onCreateBackup={handleCreateBackup}
        loading={loading}
      />

      <section className="space-y-4">
        <DatabaseOverview
          health={health}
          metrics={metrics}
          monitoring={monitoring}
        />
      </section>

      <section className="space-y-4">
        <DatabaseMonitoring monitoring={monitoring} />
      </section>

      <section className="space-y-4">
        <DatabaseBranches branches={branches} />
      </section>

      <section className="space-y-4">
        <DatabaseBackups backups={backups} />
      </section>

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
