import { useState } from "react";

export default function CreateTicketModal({ loading, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  const handleSubmit = () => {
    if (!form.title || !form.description) {
      return;
    }

    onCreate(form);

    setForm({
      title: "",
      description: "",
      priority: "MEDIUM",
    });
  };

  return (
    <div className="mt-4 space-y-3 rounded-xl bg-[#1f2937] p-4">
      {/* TITLE */}

      <input
        type="text"
        placeholder="Título"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        className="w-full rounded-lg bg-[#111827] p-3 outline-none"
      />

      {/* DESCRIPTION */}

      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        className="h-24 w-full resize-none rounded-lg bg-[#111827] p-3 outline-none"
      />

      {/* PRIORITY */}

      <select
        value={form.priority}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            priority: e.target.value,
          }))
        }
        className="w-full rounded-lg bg-[#111827] p-3 outline-none"
      >
        <option value="LOW">LOW</option>

        <option value="MEDIUM">MEDIUM</option>

        <option value="HIGH">HIGH</option>

        <option value="CRITICAL">CRITICAL</option>
      </select>

      {/* BUTTON */}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creando..." : "Crear Ticket"}
      </button>
    </div>
  );
}
