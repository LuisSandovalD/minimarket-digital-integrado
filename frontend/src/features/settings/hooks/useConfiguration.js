/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useTheme from "../../../components/theme/useTheme";
import { ConfigurationService } from "../services/configuration.service";
import { mapConfigurationToForm, mapFormToPayload } from "../utils/configuration.mapper";

const initialForm = {
  // Datos planos para la UI de la Empresa
  name: "",
  ruc: "",
  email: "",
  logo: "",

  // Sistema e interfaz
  theme: "system",
  language: "es",
  currency: "PEN",

  // Impuestos
  taxRate: 0,
  defaultTaxEnabled: true,

  // Alertas e inventario
  notifyLowStock: true,
  lowStockThreshold: 5,
  notifyExpiring: true,
  expiringDaysAlert: 30,

  // Seguridad
  requireTwoFactor: false,
  sessionTimeout: 3600,
  passwordMinLength: 8,
  passwordExpiresDays: "",
  requirePasswordChange: false,
  allowMultipleLogins: true,
  maxLoginAttempts: 5,

  // Respaldo
  autoBackup: true,
  backupFrequency: "DAILY",
  allowExport: true,
  allowImport: true,
};

export function useConfiguration() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const { setTheme } = useTheme();

  const fetchConfiguration = async () => {
    try {
      setLoading(true);
      setErrors({});

      const configData = await ConfigurationService.get();

      if (configData) {
        // El mapper transforma el { company: { name, ruc } } en campos planos para el form
        setForm(mapConfigurationToForm(configData));

        if (configData.theme) {
          setTheme(configData.theme);
        }
      }
    } catch (error) {
      console.error("Error al obtener la configuración:", error);
      alert("Error al cargar la configuración de la empresa");
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

    // Soporte para limpiar errores tanto planos como anidados de Zod
    if (errors[name] || errors[`company.${name}`]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        delete nextErrors[`company.${name}`];
        return nextErrors;
      });
    }
  };

  const saveConfiguration = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    try {
      setSaving(true);
      setErrors({});

      // El mapper agrupa los campos de la empresa dentro de "company: {}" para el backend
      const payload = mapFormToPayload(form);
      const updatedConfig = await ConfigurationService.update(payload);

      if (updatedConfig) {
        setForm(mapConfigurationToForm(updatedConfig));

        if (updatedConfig.theme) {
          setTheme(updatedConfig.theme);
        }

        alert("Configuración guardada correctamente");
      }
    } catch (error) {
      console.error("Error al guardar la configuración:", error);

      if (error.response?.status === 400 && error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        alert(error.response.data.message || "Por favor, revisa los errores en el formulario.");
      } else {
        alert(error?.response?.data?.message || "Ocurrió un error inesperado al guardar.");
      }
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
    errors,
    updateField,
    saveConfiguration,
    refresh: fetchConfiguration,
  };
}
