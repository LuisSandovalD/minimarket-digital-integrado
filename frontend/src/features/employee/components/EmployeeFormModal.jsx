// ========================================
// features/employees/components/EmployeeFormModal.jsx
// ========================================

import {
  Briefcase,
  Building2,
  Mail,
  Phone,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

import { ModernButton, SubmitButton } from "@/components/buttons/";

import { Input, Select } from "@/components/forms/";

export default function EmployeeFormModal({
  open,
  onClose,
  onSubmit,
  form,
  onChange,
  loading = false,
  isEdit = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      {/* HEADER */}

      <HeaderModal
        title={isEdit ? "Editar Empleado" : "Nuevo Empleado"}
        subtitle="Gestiona la información del personal."
        onClose={onClose}
      />

      {/* FORM */}

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
          {/* ========================================
           * INFORMACIÓN PERSONAL
           * ====================================== */}

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <User size={20} />

              <div>
                <h3 className="text-sm font-semibold">Información Personal</h3>

                <p className="text-xs text-slate-500">
                  Datos básicos del empleado
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Nombre Completo"
                name="name"
                value={form?.name || ""}
                onChange={onChange}
                required
                icon={User}
              />

              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                value={form?.email || ""}
                onChange={onChange}
                required
                icon={Mail}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Teléfono"
                name="phone"
                value={form?.phone || ""}
                onChange={onChange}
                icon={Phone}
              />

              {!isEdit && (
                <Input
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={form?.password || ""}
                  onChange={onChange}
                  required
                  icon={Shield}
                />
              )}
            </div>
          </section>

          {/* ========================================
           * INFORMACIÓN LABORAL
           * ====================================== */}

          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Briefcase size={20} />

              <div>
                <h3 className="text-sm font-semibold">Información Laboral</h3>

                <p className="text-xs text-slate-500">Cargo, área y turno</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Cargo"
                name="position"
                value={form?.position || ""}
                onChange={onChange}
                required
                icon={Briefcase}
              />

              <Input
                label="Departamento"
                name="department"
                value={form?.department || ""}
                onChange={onChange}
                required
                icon={Building2}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label="Turno"
                name="shift"
                value={form?.shift || ""}
                onChange={onChange}
                required
                icon={Users}
                options={[
                  {
                    value: "MORNING",
                    label: "Mañana (08:00 - 15:00)",
                  },
                  {
                    value: "AFTERNOON",
                    label: "Tarde (15:00 - 22:00)",
                  },
                ]}
              />

              <Select
                label="Estado"
                name="isActive"
                value={String(form?.isActive ?? true)}
                onChange={onChange}
                icon={Shield}
                options={[
                  {
                    value: "true",
                    label: "Activo",
                  },
                  {
                    value: "false",
                    label: "Inactivo",
                  },
                ]}
              />
            </div>
          </section>
        </div>

        {/* FOOTER */}

        <FooterModal>
          <div
            className="
              flex
              w-full
              items-center
              justify-end
              gap-3
              pb-5
            "
          >
            <ModernButton
              type="button"
              text="Cancelar"
              variant="outline"
              icon={X}
              onClick={onClose}
            />

            <SubmitButton
              loading={loading}
              text={
                loading
                  ? "Guardando..."
                  : isEdit
                    ? "Actualizar Empleado"
                    : "Guardar Empleado"
              }
            />
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
