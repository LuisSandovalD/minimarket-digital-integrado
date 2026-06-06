import { useEffect, useState } from "react";
import { ConfigurationService } from "../services/configuration.service";
import {
  mapConfigurationToForm,
  mapFormToPayload,
} from "../utils/configuration.mapper";

const initialForm = {
  companyName: "",
  logo: null,

  theme: "light",
  language: "es",
  currency: "PEN",

  taxRate: 0,
  defaultTaxEnabled: true,

  notifyLowStock: true,
  lowStockThreshold: 5,
  notifyExpiring: true,
  expiringDaysAlert: 30,

  requireTwoFactor: false,
  sessionTimeout: 3600,
  passwordMinLength: 8,
  passwordExpiresDays: null,
  requirePasswordChange: false,
  allowMultipleLogins: true,
  maxLoginAttempts: 5,

  autoBackup: true,
  backupFrequency: "DAILY",
  allowExport: true,
  allowImport: true,
};

export function useConfiguration() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);

  const fetchConfiguration = async () => {
    try {
      setLoading(true);

      const res = await ConfigurationService.get();

      if (res.success) {
        setForm(mapConfigurationToForm(res.data));
      }
    } catch (error) {
      console.error(error);
      alert("Error al cargar configuración");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveConfiguration = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = mapFormToPayload(form);

      const res = await ConfigurationService.update(payload);

      if (res.success) {
        alert("Configuración guardada correctamente");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConfiguration();
  }, []);

  return {
    form,
    loading,
    saving,
    updateField,
    saveConfiguration,
  };
}
