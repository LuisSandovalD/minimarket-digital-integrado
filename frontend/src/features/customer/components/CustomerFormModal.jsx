// ========================================
// features/customers/components/CustomerFormModal.jsx
// ========================================

import {
  Building2,
  CheckCircle2,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input, Select, TextArea } from "@/components/forms";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays";

export default function CustomerFormModal({
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
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <HeaderModal
        title={isEdit ? "Editar Cliente" : "Nuevo Cliente"}
        subtitle="Gestiona la información del cliente."
        onClose={onClose}
      />

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="max-h-[72vh] overflow-y-auto space-y-8 px-6 py-6">
          {/* INFORMACIÓN PERSONAL */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <User size={20} />
              <div>
                <h3 className="text-sm font-semibold">Información Personal</h3>
                <p className="text-xs text-slate-500">
                  Datos principales del cliente
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Input
                label="Nombre Completo"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                icon={User}
              />

              <Select
                label="Tipo Documento"
                name="documentType"
                value={form.documentType}
                onChange={onChange}
                icon={FileText}
                options={[
                  { value: "DNI", label: "DNI" },
                  { value: "RUC", label: "RUC" },
                  { value: "CE", label: "Carnet de Extranjería" },
                  { value: "PASSPORT", label: "Pasaporte" },
                ]}
              />

              <Input
                label="Número Documento"
                name="documentNumber"
                value={form.documentNumber}
                onChange={onChange}
                icon={FileText}
              />
            </div>
          </section>

          {/* CONTACTO */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <Phone size={20} />
              <div>
                <h3 className="text-sm font-semibold">
                  Información de Contacto
                </h3>
                <p className="text-xs text-slate-500">Medios de comunicación</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Correo Electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                icon={Mail}
              />

              <Input
                label="Teléfono"
                name="phone"
                value={form.phone}
                onChange={onChange}
                icon={Phone}
              />
            </div>
          </section>

          {/* UBICACIÓN */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <div>
                <h3 className="text-sm font-semibold">Ubicación</h3>
                <p className="text-xs text-slate-500">Dirección del cliente</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Ciudad"
                name="city"
                value={form.city}
                onChange={onChange}
                icon={Building2}
              />

              <Input
                label="Dirección"
                name="address"
                value={form.address}
                onChange={onChange}
                icon={MapPin}
              />
            </div>
          </section>

          {/* INFORMACIÓN FINANCIERA */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <DollarSign size={20} />
              <div>
                <h3 className="text-sm font-semibold">
                  Información Financiera
                </h3>
                <p className="text-xs text-slate-500">
                  Límites de crédito y deudas
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Límite de Crédito"
                name="creditLimit"
                type="number"
                step="0.01"
                value={form.creditLimit}
                onChange={onChange}
                icon={DollarSign}
              />

              <Input
                label="Deuda Actual"
                name="currentDebt"
                type="number"
                step="0.01"
                value={form.currentDebt}
                onChange={onChange}
                icon={DollarSign}
                disabled={!isEdit} // Opcional: Solo permitir editar deuda si se está editando, no al crear
              />
            </div>
          </section>

          {/* ESTADO Y ADICIONAL */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} />
              <div>
                <h3 className="text-sm font-semibold">
                  Estado y Configuración
                </h3>
                <p className="text-xs text-slate-500">
                  Disponibilidad del cliente en el sistema
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="md:col-span-1">
                <Select
                  label="Estado del Cliente"
                  name="isActive"
                  value={form.isActive.toString()} // Convierte a string para compatibilidad con el componente Select
                  onChange={(e) => {
                    // Mapea el valor de string de vuelta a un Booleano real en el handler si es necesario,
                    // o maneja el cambio directamente pasando el target simulado.
                    onChange({
                      target: {
                        name: "isActive",
                        value: e.target.value === "true",
                      },
                    });
                  }}
                  icon={CheckCircle2}
                  options={[
                    { value: "true", label: "Activo" },
                    { value: "false", label: "Inactivo" },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* NOTAS */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <div>
                <h3 className="text-sm font-semibold">Información Adicional</h3>
                <p className="text-xs text-slate-500">Observaciones internas</p>
              </div>
            </div>

            <TextArea
              label="Notas"
              name="notes"
              rows={4}
              value={form.notes}
              onChange={onChange}
            />
          </section>
        </div>

        <FooterModal>
          <div className="flex w-full items-center justify-end gap-3 pb-5">
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
                    ? "Actualizar Cliente"
                    : "Guardar Cliente"
              }
            />
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
