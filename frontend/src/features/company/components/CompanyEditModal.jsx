import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  User2,
  ImagePlus,
} from "lucide-react";

import {
  Modal,
  HeaderModal,
  FooterModal,
} from "@/components/modals";

import { Input }
  from "@/components/inputs";

import {
  ModernButton,
  SubmitButton,
} from "@/components/buttons";

import useCompanyEdit
  from "../hooks/useCompanyEdit";

import ModernImageUpload
  from "@/components/ui/ModernImageUpload";

export default function CompanyEditModal({
  open,
  onClose,

  companyId,

  onSuccess,
}) {

  const {
    loading,
    formData,

    handleChange,
    handleSubmit,
  } = useCompanyEdit({
    open,
    companyId,
    onClose,
    onSuccess,
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="2xl"
    >
      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title="Editar Empresa"
        subtitle="
          Actualiza la información
          principal de la empresa.
        "
        onClose={onClose}
      />

      {/* ========================================
       * FORM
       * ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
        "
      >
        {/* BODY */}

        <div
          className="
            max-h-[75vh]
            overflow-y-auto
            px-6
            py-5
          "
        >
          <div
            className="
              grid
              gap-5

              xl:grid-cols-[400px_1fr]
            "
          >
            {/* ========================================
             * IMAGE
             * ====================================== */}

            <div className="space-y-4">

              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                    dark:text-slate-100
                  "
                >
                  Imagen de la Empresa
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Sube un logo o imagen
                  representativa.
                </p>
              </div>

              <ModernImageUpload
                value={formData.logo}
                height="h-137"
                onChange={(file) =>
                  handleChange({
                    target: {
                      name: "logo",
                      value: file,
                    },
                  })
                }
              />
            </div>

            {/* ========================================
             * FORM FIELDS
             * ====================================== */}

            <div className="space-y-6">

              {/* BASIC INFO */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  bg-slate-50/70
                  dark:bg-slate-900/40
                  p-5
                "
              >
                <div className="mb-5">

                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                      dark:text-slate-100
                    "
                  >
                    Información General
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Datos principales de
                    identificación.
                  </p>
                </div>

                <div
                  className="
                    grid
                    gap-5

                    md:grid-cols-2
                  "
                >
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Empresa SAC"
                    icon={Building2}
                    required
                  />

                  <Input
                    label="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="empresa-sac"
                    icon={ShieldCheck}
                    required
                  />

                  <Input
                    label="RUC"
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleChange}
                    placeholder="20123456789"
                    icon={ReceiptText}
                  />

                  <Input
                    label="Tax ID"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="TAX-001"
                    icon={ShieldCheck}
                  />
                </div>
              </div>

              {/* CONTACT INFO */}

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-800
                  bg-slate-50/70
                  dark:bg-slate-900/40
                  p-5
                "
              >
                <div className="mb-5">

                  <h3
                    className="
                      text-sm
                      font-semibold
                      text-slate-800
                      dark:text-slate-100
                    "
                  >
                    Contacto y Dirección
                  </h3>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Información pública de
                    contacto.
                  </p>
                </div>

                <div
                  className="
                    grid
                    gap-5

                    md:grid-cols-2
                  "
                >
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
                    value={
                      formData.legalRepresentative
                    }
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    icon={User2}
                  />
                </div>

                <div className="mt-5">
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

        {/* ========================================
         * FOOTER
         * ====================================== */}

        <FooterModal>

          <div
            className="
              flex
              w-full
              items-center
              justify-between
              gap-4
              pb-5
            "
          >
            <div
              className="
                hidden
                text-xs
                text-slate-500

                sm:block
              "
            >
              Los cambios se guardarán
              automáticamente en la empresa.
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                ml-auto
              "
            >
              <ModernButton
                type="button"
                text="Cancelar"
                variant="outline"
                onClick={onClose}
              />

              <SubmitButton
                text="Guardar Cambios"
                loading={loading}
              />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}