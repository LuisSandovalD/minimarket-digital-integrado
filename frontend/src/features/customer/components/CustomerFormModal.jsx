import {
  Building2,
  CheckCircle2,
  DollarSign,
  Edit2,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  UserCheck,
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
      <div className="flex flex-col max-h-[85vh]">
        <HeaderModal
          icon={isEdit ? Edit2 : UserCheck}
          title={isEdit ? "Editar Cliente" : "Nuevo Cliente"}
          subtitle={
            isEdit
              ? "Modifica el expediente, límites crediticios e información de contacto."
              : "Registra los datos fiscales, comerciales y de contacto del nuevo cliente."
          }
          onClose={onClose}
        />

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden text-slate-800 dark:text-slate-100">
          <div className="overflow-y-auto px-6 py-5 space-y-5 max-h-[55vh] sm:max-h-[58vh]">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <User size={16} className="text-violet-600 dark:text-violet-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Información Personal
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="md:col-span-1">
                  <Input
                    label="Nombre Completo"
                    name="name"
                    value={form.name || ""}
                    onChange={onChange}
                    required
                    placeholder="Ej. Distribuidora S.A."
                    icon={User}
                  />
                </div>
                <Select
                  label="Tipo Documento"
                  name="documentType"
                  value={form.documentType || ""}
                  onChange={onChange}
                  icon={FileText}
                  disabled={isEdit}
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
                  value={form.documentNumber || ""}
                  onChange={onChange}
                  placeholder="10745896..."
                  icon={FileText}
                  disabled={isEdit}
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-violet-600 dark:text-violet-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Información de Contacto
                  </h3>
                </div>
                <div className="grid gap-4">
                  <Input
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={form.email || ""}
                    onChange={onChange}
                    placeholder="cliente@empresa.com"
                    icon={Mail}
                  />
                  <Input
                    label="Teléfono / Celular"
                    name="phone"
                    value={form.phone || ""}
                    onChange={onChange}
                    placeholder="+51 999 999 999"
                    icon={Phone}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <MapPin size={16} className="text-violet-600 dark:text-violet-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Ubicación Residencial / Fiscal
                  </h3>
                </div>
                <div className="grid gap-4">
                  <Input
                    label="Ciudad / Región"
                    name="city"
                    value={form.city || ""}
                    onChange={onChange}
                    placeholder="Ej. Lima"
                    icon={Building2}
                  />
                  <Input
                    label="Dirección Fiscal"
                    name="address"
                    value={form.address || ""}
                    onChange={onChange}
                    placeholder="Av. Los Tulipanes 123..."
                    icon={MapPin}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <DollarSign size={16} className="text-violet-600 dark:text-violet-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Parámetros Financieros y Sistema
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Input
                  label="Límite de Crédito"
                  name="creditLimit"
                  type="number"
                  step="0.01"
                  value={form.creditLimit ?? 0}
                  onChange={onChange}
                  placeholder="0.00"
                  icon={DollarSign}
                />
                <Input
                  label="Deuda Actual"
                  name="currentDebt"
                  type="number"
                  step="0.01"
                  value={form.currentDebt ?? 0}
                  onChange={onChange}
                  placeholder="0.00"
                  icon={DollarSign}
                  disabled={!isEdit}
                />
                <Select
                  label="Estado del Cliente"
                  name="isActive"
                  value={form.isActive !== undefined && form.isActive !== null ? form.isActive.toString() : "true"}
                  onChange={(e) => {
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

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <FileText size={16} className="text-violet-600 dark:text-violet-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Información Adicional
                </h3>
              </div>
              <TextArea
                label="Observaciones internas / Notas de venta"
                name="notes"
                rows={3}
                value={form.notes || ""}
                onChange={onChange}
                placeholder="Añade detalles importantes sobre las condiciones de este cliente..."
              />
            </div>
          </div>

          <FooterModal>
            <div className="flex w-full items-center justify-end gap-3 pb-3 pt-1">
              <ModernButton type="button" text="Cancelar" variant="outline" icon={X} onClick={onClose} size="sm" />
              <SubmitButton
                loading={loading}
                text={loading ? "Guardando..." : isEdit ? "Actualizar Cliente" : "Registrar Cliente"}
                size="sm"
              />
            </div>
          </FooterModal>
        </form>
      </div>
    </Modal>
  );
}
