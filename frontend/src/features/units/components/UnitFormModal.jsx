import { Scale, Hash, Package, Calculator, X, Ruler } from "lucide-react";

import { Modal, HeaderModal, FooterModal } from "@/components/modals";

import { Input } from "@/components/inputs";

import { ModernButton, SubmitButton } from "@/components/buttons";

import { Select } from "@/components/selects";

import { UNIT_OPTIONS } from "../utils/unitTypes";

import { createUnit, updateUnit } from "../services/unit.service";

import { useEffect, useState } from "react";

const initialState = {
  name: "",
  abbreviation: "",
  type: "",
  conversionFactor: 1,
};

export default function UnitFormModal({ open, onClose, reload, selectedUnit }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const isEdit = !!selectedUnit;

  useEffect(() => {
    if (selectedUnit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: selectedUnit.name || "",

        abbreviation: selectedUnit.abbreviation || "",

        type: selectedUnit.type || "",

        conversionFactor: selectedUnit.conversionFactor || 1,
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedUnit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await updateUnit(selectedUnit.id, formData);
      } else {
        await createUnit(formData);
      }

      reload();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="xl">
      {/* ========================================
       * HEADER
       * ====================================== */}

      <HeaderModal
        title={isEdit ? "Editar Unidad" : "Nueva Unidad"}
        subtitle={
          isEdit
            ? "Actualiza la información de la unidad."
            : "Registra una nueva unidad para tus productos."
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
                  Configura la información principal de la unidad.
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
                  placeholder="Litro"
                  icon={Package}
                  required
                />

                <Input
                  label="Abreviación"
                  name="abbreviation"
                  value={formData.abbreviation}
                  onChange={handleChange}
                  placeholder="L"
                  icon={Hash}
                  required
                />

                <Select
                  label="Tipo"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={UNIT_OPTIONS}
                  placeholder="Seleccione"
                  icon={Scale}
                  required
                />

                <Input
                  label="Factor Conversión"
                  type="number"
                  step="0.0001"
                  name="conversionFactor"
                  value={formData.conversionFactor}
                  onChange={handleChange}
                  placeholder="1.0000"
                  icon={Calculator}
                  required
                />
              </div>
            </div>

            {/* ========================================
             * EXTRA INFO
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
                  Información Adicional
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Define correctamente la estructura y conversión de la unidad.
                </p>
              </div>

              <div
                className="
                  flex
                  items-start
                  gap-4

                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700

                  bg-white
                  dark:bg-slate-950

                  p-4
                "
              >
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-2xl

                    bg-slate-100
                    dark:bg-slate-800
                  "
                >
                  <Ruler
                    className="
                      h-5
                      w-5
                    "
                  />
                </div>

                <div>
                  <h4
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Conversión
                  </h4>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    El factor de conversión permite transformar cantidades entre
                    unidades relacionadas.
                  </p>
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
              Los cambios serán guardados automáticamente en el sistema.
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
                text={isEdit ? "Guardar Cambios" : "Crear Unidad"}
                loading={loading}
              />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}
