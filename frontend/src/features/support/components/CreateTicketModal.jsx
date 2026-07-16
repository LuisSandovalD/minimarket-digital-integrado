// ========================================
// features/support/components/CreateTicketModal.jsx
// ========================================

import { FileText, Flame, HelpCircle, X } from "lucide-react";
import { useState } from "react";

import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input, Select } from "@/components/forms/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

// Importamos las opciones de prioridad constantes
import { PRIORITY_OPTIONS } from "../constants/support";

export default function CreateTicketModal({ open, onCancel, onCreate, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  // Manejador común de inputs para simplificar los onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      return;
    }

    onCreate(form);

    // Reseteo del formulario
    setForm({
      title: "",
      description: "",
      priority: "MEDIUM",
    });
  };

  return (
    <Modal open={open} onClose={onCancel} size="lg">
      {/* ========================================
       * HEADER
       * ====================================== */}
      <HeaderModal
        title="Crear Nuevo Ticket"
        subtitle="Reporta un problema o realiza una consulta a nuestro equipo de soporte."
        onClose={onCancel}
      />

      {/* ========================================
       * FORM
       * ====================================== */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div
          className="
            max-h-[72vh]
            overflow-y-auto
            space-y-8
            px-6
            py-6
          "
        >
          {/* Detalles del Caso */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  dark:border-slate-700
                  dark:bg-slate-950
                "
              >
                <HelpCircle size={20} className="text-slate-600 dark:text-slate-300" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Detalles de la Incidencia</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Describe de forma clara y concisa el inconveniente.
                </p>
              </div>
            </div>

            {/* Fila: Título y Prioridad */}
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Título del Ticket"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                icon={FileText}
                placeholder="Ej: Error al procesar el pago"
              />

              <Select
                label="Prioridad"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                icon={Flame}
                options={PRIORITY_OPTIONS} // <-- Consumimos las prioridades constantes aquí
              />
            </div>
          </section>

          {/* Sección de Descripción */}
          <section className="space-y-5">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  dark:border-slate-700
                  dark:bg-slate-950
                "
              >
                <FileText size={20} className="text-slate-600 dark:text-slate-300" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Descripción Detallada</h3>
              </div>
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Escribe aquí los pasos para reproducir el error o los detalles de tu consulta..."
              className="
                w-full
                rounded-2xl
                border border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950
                px-5
                py-3
                text-sm
                text-slate-700
                dark:text-slate-200
                outline-none
                transition-all
                focus:border-blue-500
                dark:focus:border-blue-400
                focus:ring-2
                focus:ring-blue-500/20
              "
            />
          </section>
        </div>

        {/* ========================================
         * FOOTER
         * ====================================== */}
        <FooterModal>
          <div className="flex w-full items-center justify-between gap-4 pb-5">
            <div className="hidden sm:block text-xs text-slate-500">
              El ticket se asignará automáticamente al equipo técnico de guardia.
            </div>

            <div className="ml-auto flex items-center gap-3">
              <ModernButton type="button" text="Cancelar" variant="outline" icon={X} onClick={onCancel} />

              <SubmitButton text={loading ? "Creando..." : "Crear Ticket"} loading={loading} />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
