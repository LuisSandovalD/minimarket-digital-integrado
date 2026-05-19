import {
  FileText,
  Layers3,
  Tag,
  X,
  FolderTree,
} from "lucide-react";

import {
  Modal,
  HeaderModal,
  FooterModal,
} from "@/components/modals";

import {
  Input,
  Checkbox,
} from "@/components/inputs";

import {Select} from "@/components/selects/"

import {
  ModernButton,
  SubmitButton,
} from "@/components/buttons";

import useCategoryForm
  from "../hooks/useCategoryForm";

export default function CategoryFormModal({
  open,
  onClose,
  onSuccess,
  category = null,
  categories = [],
}) {
  const {
    loading,
    formData,
    isEdit,
    handleChange,
    handleSubmit,
  } = useCategoryForm({
    category,
    onClose,
    onSuccess,
  });

  const handleCheckboxChange = (e) => {
    const isParent = e.target.checked;
    handleChange({
      target: {
        name: "isParent",
        type: "checkbox",
        checked: isParent,
      },
    });
    // Limpiar parentId si se marca como padre
    if (isParent) {
      handleChange({
        target: {
          name: "parentId",
          value: "",
        },
      });
    }
  };

  // Filtrar solo categorías padre (sin parentId)
  const parentCategories = categories.filter(
    (item) => item.id !== category?.id && !item.parentId
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
    >
      <HeaderModal
        title={
          isEdit
            ? "Editar Categoría"
            : "Nueva Categoría"
        }
        subtitle={
          isEdit
            ? "Actualiza la información de la categoría."
            : "Organiza tus productos mediante categorías jerárquicas."
        }
        onClose={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
      >
        <div
          className="
            max-h-[72vh]
            overflow-y-auto
            px-6
            py-6
          "
        >
          <div className="space-y-6">

            {/* ========================================
             * GENERAL
             * ====================================== */}
            <div
              className="
                rounded-3xl
                border border-slate-200/70
                bg-slate-50/50
                p-6
                dark:border-slate-800
                dark:bg-slate-900/30
              "
            >
              <div className="mb-6">
                <div
                  className="
                    mb-3
                    flex items-center gap-3
                  "
                >
                  <div
                    className="
                      flex h-11 w-11 items-center
                      justify-center
                      rounded-2xl
                      border border-slate-200
                      bg-white
                      dark:border-slate-700
                      dark:bg-slate-950
                    "
                  >
                    <FolderTree
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
                        mt-1 text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Los identificadores internos
                      serán generados automáticamente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">

                {/* ========================================
                 * NAME
                 * ====================================== */}
                <Input
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Bebidas"
                  icon={Tag}
                  required
                />

                {/* ========================================
                 * CHECKBOX - IS PARENT
                 * ====================================== */}
                <div className="pt-2">
                  <Checkbox
                    label="Marcar como categoría padre"
                    name="isParent"
                    checked={formData.isParent || false}
                    onChange={handleCheckboxChange}
                  />
                  <p
                    className="
                      mt-2 text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    Las categorías padre pueden contener
                    subcategorías dentro de ellas.
                  </p>
                </div>

                {/* ========================================
                 * PARENT CATEGORY - CONDITIONAL
                 * ====================================== */}
                {!formData.isParent && (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    
                      <Select
                        label="Categoría Padre"
                        name="parentId"
                        value={formData.parentId}
                        onChange={handleChange}
                        icon={Layers3}
                        placeholder="Seleccionar categoría padre..."
                        options={parentCategories.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                      />
                    {parentCategories.length === 0 && (
                      <p
                        className="
                          text-xs
                          text-amber-600
                          dark:text-amber-500
                        "
                      >
                        No hay categorías padre disponibles. Crea una primero.
                      </p>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* ========================================
             * DESCRIPTION
             * ====================================== */}
            <div
              className="
                rounded-3xl
                border border-slate-200/70
                bg-slate-50/50
                p-6
                dark:border-slate-800
                dark:bg-slate-900/30
              "
            >
              <div className="mb-5">
                <h3
                  className="
                    text-sm font-semibold
                    text-slate-900
                    dark:text-slate-100
                  "
                >
                  Descripción
                </h3>
                <p
                  className="
                    mt-1 text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Información complementaria
                  para identificar la categoría.
                </p>
              </div>

              <Input
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe brevemente la categoría..."
                icon={FileText}
              />
            </div>

          </div>
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
                hidden text-xs
                text-slate-500
                sm:block
              "
            >
              Los cambios se aplicarán inmediatamente
              dentro del catálogo.
            </div>

            <div
              className="
                ml-auto
                flex items-center gap-3
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
                  isEdit
                    ? "Guardar Cambios"
                    : "Crear Categoría"
                }
                loading={loading}
              />
            </div>
          </div>
        </FooterModal>
      </form>
    </Modal>
  );
}