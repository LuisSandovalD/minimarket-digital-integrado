// ========================================
// components/BranchModal.jsx
// ========================================

import { FileText, Globe, Mail, MapPin, Phone, Store, X } from "lucide-react";

import { FooterModal, HeaderModal, Modal } from "@/components/overlays/";

import { Input } from "@/components/forms/";

import { ModernButton, SubmitButton } from "@/components/buttons/";

import { ModernImageUpload } from "@/components/media/";

import useBranchForm from "../hooks/useBranchForm";

export default function BranchModal({
  open,
  onClose,
  onSuccess,
  branch = null,
}) {
  const {
    loading,

    formData,

    isEdit,

    handleChange,

    handleSubmit,
  } = useBranchForm({
    branch,
    onClose,
    onSuccess,
  });

  return (
    <Modal open={open} onClose={onClose} size="full">
      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title={isEdit ? "Editar Sucursal" : "Nueva Sucursal"}
        subtitle={
          isEdit
            ? "Actualiza la información de la sucursal."
            : "Crea y registra una nueva sucursal."
        }
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
              gap-6

              xl:grid-cols-[340px_1fr]
            "
          >
            {/* ========================================
             * IMAGE SECTION
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
                  Logo de la Sucursal
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Sube una imagen representativa de la sucursal.
                </p>
              </div>

              <ModernImageUpload
                value={formData.logo}
                onChange={(file) =>
                  handleChange({
                    target: {
                      name: "logo",
                      value: file,
                    },
                  })
                }
                height="h-90"
              />
            </div>

            {/* ========================================
             * FORM SECTION
             * ====================================== */}

            <div className="space-y-6">
              {/* ========================================
               * GENERAL INFO
               * ====================================== */}

              <div
                className="
                  rounded-3xl
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
                    Datos principales de identificación.
                  </p>
                </div>

                <div
                  className="
                    grid
                    gap-5
                    lg:grid-cols-3
                    md:grid-cols-2
                  "
                >
                  <Input
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sucursal Central"
                    icon={Store}
                    required
                  />

                  <Input
                    label="Correo"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@sucursal.com"
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
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Lima"
                    icon={MapPin}
                  />

                  <Input
                    label="Departamento"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Lima"
                    icon={MapPin}
                  />

                  <Input
                    label="País"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Perú"
                    icon={Globe}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2">
                {/* ========================================
                 * DESCRIPTION
                 * ====================================== */}
                <div
                  className="
                    rounded-3xl
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
                      Descripción
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Información adicional sobre la sucursal.
                    </p>
                  </div>

                  <Input
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripción breve"
                    icon={FileText}
                  />
                </div>

                {/* ========================================
                 * ADDRESS
                 * ====================================== */}

                <div
                  className="
                    rounded-3xl
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
                      Ubicación
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Dirección principal de la sucursal.
                    </p>
                  </div>

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
              La información será guardada automáticamente en la sucursal.
            </div>

            <div
              className="
                ml-auto
                flex
                items-center
                gap-3
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
                text={isEdit ? "Guardar Cambios" : "Crear Sucursal"}
                loading={loading}
              />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
