import { ModernButton, SubmitButton } from "@/components/buttons";
import { Input } from "@/components/forms/";
import { ModernImageUpload } from "@/components/media/";
import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";
import { Building2, Globe, Mail, MapPin, Phone, ReceiptText, ShieldCheck, User2 } from "lucide-react";
import useCompanyEdit from "../hooks/useCompanyEdit";

export default function CompanyEditModal({ open, onClose, companyId, onSuccess }) {
  // Extraemos 'handleFileChange' que creamos en el hook corregido
  const { loading, formData, handleChange, handleFileChange, handleSubmit } = useCompanyEdit({
    open,
    companyId,
    onClose,
    onSuccess,
  });

  return (
    <Modal open={open} onClose={onClose} size="full">
      <HeaderModal
        icon={Building2}
        title="Editar Empresa"
        subtitle="Actualiza la información principal de la empresa."
        onClose={onClose}
      />

      {/* Formulario con altura controlada para evitar scroll global */}
      <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(100vh-200px)] overflow-hidden">
        {/* BODY - Este contenedor flexible maneja el desborde con scroll de forma independiente */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="grid gap-5 xl:grid-cols-[500px_1fr] items-stretch">
            {/* IMAGE COLUMN */}
            <div className="flex flex-col h-full space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Imagen de la Empresa</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Sube un logo o imagen representativa.</p>
              </div>
              <div className="flex-1 flex flex-col">
                {/* Enlazamos el onChange con 'handleFileChange' directamente */}
                <ModernImageUpload
                  value={formData.logo}
                  height="h-full flex-1"
                  onChange={(file) => {
                    handleFileChange({ target: { files: [file] } });
                  }}
                />
              </div>
            </div>

            {/* FORM FIELDS COLUMN */}
            <div className="space-y-5">
              {/* BASIC INFO */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Información General</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Datos principales de identificación (algunos valores no son editables).
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Empresa SAC"
                    icon={Building2}
                    required
                  />
                  {/* Campo Slug bloqueado () */}
                  <Input
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="empresa-sac"
                    icon={ShieldCheck}
                    required
                    disabled
                  />
                  {/* Campo RUC bloqueado () */}
                  <Input
                    label="RUC"
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleChange}
                    placeholder="20123456789"
                    icon={ReceiptText}
                    disabled
                  />
                  {/* Campo Tax ID bloqueado ()*/}
                  <Input
                    label="Tax ID"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="TAX-001"
                    icon={ShieldCheck}
                    disabled
                  />
                </div>
              </div>

              {/* CONTACT INFO */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-900/30">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Contacto y Dirección</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Información pública de contacto.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Correo"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="empresa@email.com"
                    icon={Mail}
                  />
                  <Input
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 999 999 999"
                    icon={Phone}
                  />
                  <Input
                    label="Sitio Web"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://empresa.com"
                    icon={Globe}
                  />
                  <Input
                    label="Representante Legal"
                    name="legalRepresentative"
                    value={formData.legalRepresentative}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    icon={User2}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Av. Principal 123"
                    icon={MapPin}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER - Fijo en la parte inferior */}
        <FooterModal>
          <div className="flex w-full items-center justify-between gap-4">
            <div className="hidden text-xs text-slate-500 sm:block">
              Los cambios se guardarán automáticamente en la empresa.
            </div>
            <div className="ml-auto flex items-center gap-3">
              <ModernButton type="button" text="Cancelar" variant="outline" onClick={onClose} />
              <SubmitButton text="Guardar Cambios" loading={loading} />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
