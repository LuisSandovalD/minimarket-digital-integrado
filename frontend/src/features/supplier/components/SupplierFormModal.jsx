// ========================================
// features/supplier/components/SupplierFormModal.jsx
// ========================================

import {
  Truck,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  ShieldCheck,
  X,
  Building2,
} from "lucide-react";

import Modal
  from "@/components/modals/Modal";

import HeaderModal
  from "@/components/modals/HeaderModal";

import FooterModal
  from "@/components/modals/FooterModal";

import {
  ModernButton,
  SubmitButton,
} from "@/components/buttons";

import Input
  from "@/components/inputs/Input";

import Select
  from "@/components/selects/Select";

export default function SupplierFormModal({

  open,
  onClose,
  onSubmit,

  form,
  onChange,

  loading = false,
  isEdit = false,

}) {

  return (

    <Modal
      open={open}
      onClose={onClose}
      size="lg"
    >

      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title={
          isEdit
            ? "Editar Proveedor"
            : "Nuevo Proveedor"
        }
        subtitle="
          Configura toda la
          información del proveedor.
        "
        onClose={onClose}
      />

      {/* ========================================
       * FORM
       * ====================================== */}

      <form
        onSubmit={(e) => {

          e.preventDefault()

          onSubmit()

        }}
        className="flex flex-col"
      >

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
           * GENERAL INFO
           * ====================================== */}

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

                <Truck
                  size={20}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />

              </div>

              <div>

                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  Información General
                </h3>

                <p
                  className="
                    text-xs text-slate-500
                    dark:text-slate-400
                  "
                >
                  Datos principales del proveedor
                </p>

              </div>

            </div>

            <div
              className="
                grid gap-5
                md:grid-cols-2
              "
            >

              <Input
                label="Nombre"
                name="name"
                value={form?.name || ""}
                onChange={onChange}
                required
                icon={Building2}
                placeholder="Ej: Alicorp"
              />

              <Input
                label="RUC"
                name="ruc"
                value={form?.ruc || ""}
                onChange={onChange}
                icon={FileText}
                placeholder="20123456789"
              />

            </div>

          </section>

          {/* ========================================
           * CONTACT INFO
           * ====================================== */}

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

                <User
                  size={20}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />

              </div>

              <div>

                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  Contacto
                </h3>

                <p
                  className="
                    text-xs text-slate-500
                    dark:text-slate-400
                  "
                >
                  Información de contacto del proveedor
                </p>

              </div>

            </div>

            <div
              className="
                grid gap-5
                md:grid-cols-2
              "
            >

              <Input
                label="Persona de Contacto"
                name="contactPerson"
                value={form?.contactPerson || ""}
                onChange={onChange}
                icon={User}
                placeholder="Juan Pérez"
              />

              <Input
                label="Teléfono"
                name="phone"
                value={form?.phone || ""}
                onChange={onChange}
                icon={Phone}
                placeholder="999999999"
              />

              <Input
                label="Correo"
                name="email"
                type="email"
                value={form?.email || ""}
                onChange={onChange}
                icon={Mail}
                placeholder="proveedor@email.com"
              />

              <Input
                label="Website"
                name="website"
                value={form?.website || ""}
                onChange={onChange}
                icon={Globe}
                placeholder="https://empresa.com"
              />

            </div>

          </section>

          {/* ========================================
           * EXTRA INFO
           * ====================================== */}

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

                <MapPin
                  size={20}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />

              </div>

              <div>

                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  Información Extra
                </h3>

                <p
                  className="
                    text-xs text-slate-500
                    dark:text-slate-400
                  "
                >
                  Datos complementarios
                </p>

              </div>

            </div>

            <div
              className="
                grid gap-5
                md:grid-cols-2
              "
            >

              <Input
                label="Dirección"
                name="address"
                value={form?.address || ""}
                onChange={onChange}
                icon={MapPin}
                placeholder="Lima, Perú"
              />

              <Select
                label="Estado"
                name="isActive"
                value={String(form?.isActive ?? true)}
                onChange={onChange}
                icon={ShieldCheck}
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

          {/* ========================================
           * NOTES
           * ====================================== */}

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

                <FileText
                  size={20}
                  className="
                    text-slate-600
                    dark:text-slate-300
                  "
                />

              </div>

              <div>

                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  Notas
                </h3>

              </div>

            </div>

            <textarea
              name="notes"
              value={form?.notes || ""}
              onChange={onChange}
              rows={5}
              placeholder="
                Escribe observaciones
                sobre el proveedor...
              "
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

          <div
            className="
              flex w-full items-center
              justify-between gap-4 pb-5
            "
          >

            <div
              className="
                hidden sm:block
                text-xs text-slate-500
              "
            >
              {
                isEdit
                  ? "Los cambios serán actualizados inmediatamente."
                  : "El proveedor será registrado en el sistema."
              }
            </div>

            <div
              className="
                ml-auto flex
                items-center gap-3
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
                text={
                  loading
                    ? "Guardando..."
                    : isEdit
                      ? "Actualizar Proveedor"
                      : "Guardar Proveedor"
                }
                loading={loading}
              />

            </div>

          </div>

        </FooterModal>

      </form>

    </Modal>

  )

}