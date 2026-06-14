import { useCallback, useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard.service";

export default function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const [period, setPeriod] = useState("LAST_MONTH");

  const [draftStartDate, setDraftStartDate] = useState("");
  const [draftEndDate, setDraftEndDate] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        period,
      };

      if (period === "CUSTOM") {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const data = await getDashboard(params);

      setDashboard(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }, [period, startDate, endDate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, [loadDashboard]);

  const refreshDashboard = async () => {
    await loadDashboard();
  };

  const applyCustomRange = () => {
    if (!draftStartDate || !draftEndDate) {
      setDateError("Completa ambas fechas antes de aplicar el filtro.");
      return;
    }

    setDateError("");
    setStartDate(draftStartDate);
    setEndDate(draftEndDate);
    setPeriod("CUSTOM");
  };

  const clearDateError = () => {
    if (dateError) {
      setDateError("");
    }
  };

  const kpis = dashboard?.kpis || {};
  const analytics = dashboard?.analytics || {};
  const alerts = dashboard?.alerts || {};
  const activity = dashboard?.activity || {};

  const totalAlerts =
    (alerts?.lowStock?.length || 0) +
    (alerts?.expiringProducts?.length || 0) +
    (alerts?.notifications?.length || 0);

  return {
    loading,

    kpis,
    analytics,
    alerts,
    activity,
    totalAlerts,

    period,
    setPeriod,

    startDate,
    endDate,

    draftStartDate,
    setDraftStartDate,
    draftEndDate,
    setDraftEndDate,
    dateError,
    clearDateError,

    onRefresh: refreshDashboard,
    onApplyCustomRange: applyCustomRange,
  };
}
