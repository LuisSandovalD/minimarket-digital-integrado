import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function ConfigurationPage() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    theme: "light",
    language: "es",
    currency: "PEN",
    taxRate: 0,
    notifyLowStock: true,
    lowStockThreshold: 5,
    requireTwoFactor: false,
    sessionTimeout: 3600,
  });
  /*
    GET CONFIGURATION
  */

  const fetchConfiguration = async () => {
    try {
      setLoading(true);

      const response = await api.get("/configuration");

      if (response.data.success) {
        setForm(response.data.data);
      }
    } catch (error) {
      console.error(error);

      alert("Error al cargar configuración");
    } finally {
      setLoading(false);
    }
  };

  /*
    UPDATE FORM
  */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /*
    SAVE CONFIGURATION
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,
        taxRate: Number(form.taxRate),
        lowStockThreshold: Number(form.lowStockThreshold),
        sessionTimeout: Number(form.sessionTimeout),
      };

      const response = await api.put("/configuration", payload);

      if (response.data.success) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">Cargando...</div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Configuración</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* COMPANY */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Nombre Empresa
            </label>

            <input
              type="text"
              name="companyName"
              value={form.companyName || ""}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            />
          </div>

          {/* THEME */}

          <div>
            <label className="mb-1 block text-sm font-medium">Tema</label>

            <select
              name="theme"
              value={form.theme}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            >
              <option value="light">Light</option>

              <option value="dark">Dark</option>
            </select>
          </div>

          {/* LANGUAGE */}

          <div>
            <label className="mb-1 block text-sm font-medium">Idioma</label>

            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            >
              <option value="es">Español</option>

              <option value="en">Inglés</option>
            </select>
          </div>

          {/* CURRENCY */}

          <div>
            <label className="mb-1 block text-sm font-medium">Moneda</label>

            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            >
              <option value="PEN">PEN</option>

              <option value="USD">USD</option>
            </select>
          </div>

          {/* TAX */}

          <div>
            <label className="mb-1 block text-sm font-medium">IGV (%)</label>

            <input
              type="number"
              name="taxRate"
              value={form.taxRate}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            />
          </div>

          {/* LOW STOCK */}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="notifyLowStock"
              checked={form.notifyLowStock}
              onChange={handleChange}
            />

            <label>Notificar stock bajo</label>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Límite stock bajo
            </label>

            <input
              type="number"
              name="lowStockThreshold"
              value={form.lowStockThreshold}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            />
          </div>

          {/* 2FA */}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="requireTwoFactor"
              checked={form.requireTwoFactor}
              onChange={handleChange}
            />

            <label>Requerir 2FA</label>
          </div>

          {/* SESSION */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Timeout sesión (segundos)
            </label>

            <input
              type="number"
              name="sessionTimeout"
              value={form.sessionTimeout}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 outline-none"
            />
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-slate-900 p-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Configuración"}
          </button>
        </form>
      </div>
    </div>
  );
}
