// ========================================
// components/categories/CategoriesTable.jsx
// ========================================

import {
  FolderTree,
  CalendarDays,
  Layers3,
  Pencil,
  Trash2,
  CornerDownRight,
} from "lucide-react";

import { Table, THead, TFooter } from "@/components/table/";

import ModernButton from "@/components/buttons/ModernButton";

export default function CategoriesTable({
  categories = [],

  page = 1,

  totalPages = 1,

  onPrev,

  onNext,

  onEdit,

  onDelete,
}) {
  // ========================================
  // PARENT CATEGORIES
  // ========================================

  const parentCategories = categories.filter((category) => !category.parentId);

  // ========================================
  // CHILD CATEGORIES
  // ========================================

  const childCategories = categories.filter((category) => category.parentId);

  const columns = [
    {
      key: "name",
      label: "Categoría",
    },

    {
      key: "description",
      label: "Descripción",
    },

    {
      key: "parent",
      label: "Padre",
    },

    {
      key: "createdAt",
      label: "Creado",
    },

    {
      key: "actions",
      label: "Acciones",
    },
  ];

  const renderRows = (data = [], isChild = false) => (
    <>
      {data.map((category) => (
        <tr
          key={category.id}
          className="
            border-b
            border-slate-200/60

            transition-all
            duration-200

            hover:bg-slate-50/70

            dark:border-slate-800
            dark:hover:bg-slate-900/40
          "
        >
          {/* ========================================
           * CATEGORY
           * ====================================== */}

          <td className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  border
                  border-slate-200

                  bg-slate-100

                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                {isChild ? (
                  <CornerDownRight
                    size={20}
                    className="
                      text-slate-500
                    "
                  />
                ) : (
                  <FolderTree
                    size={20}
                    className="
                      text-slate-600
                      dark:text-slate-300
                    "
                  />
                )}
              </div>

              <div>
                <h3
                  className="
                    text-sm
                    font-semibold

                    text-slate-800
                    dark:text-slate-100
                  "
                >
                  {category.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs

                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  ID #{category.id}
                </p>
              </div>
            </div>
          </td>

          {/* ========================================
           * DESCRIPTION
           * ====================================== */}

          <td className="px-6 py-5">
            <p
              className="
                max-w-[280px]

                text-sm
                leading-relaxed

                text-slate-600
                dark:text-slate-300
              "
            >
              {category.description || "Sin descripción"}
            </p>
          </td>

          {/* ========================================
           * PARENT
           * ====================================== */}

          <td className="px-6 py-5">
            {category.parent ? (
              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-2xl

                  border
                  border-slate-200

                  bg-slate-100

                  px-3
                  py-2

                  dark:border-slate-800
                  dark:bg-slate-900
                "
              >
                <Layers3
                  size={16}
                  className="
                    text-slate-500
                  "
                />

                <span
                  className="
                    text-xs
                    font-medium

                    text-slate-700
                    dark:text-slate-200
                  "
                >
                  {category.parent.name}
                </span>
              </div>
            ) : (
              <span
                className="
                  inline-flex

                  rounded-xl

                  border
                  border-dashed
                  border-emerald-300

                  bg-emerald-50

                  px-3
                  py-2

                  text-xs
                  font-semibold

                  text-emerald-700

                  dark:border-emerald-900
                  dark:bg-emerald-950/30
                  dark:text-emerald-400
                "
              >
                Categoría Principal
              </span>
            )}
          </td>

          {/* ========================================
           * CREATED
           * ====================================== */}

          <td className="px-6 py-5">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={16}
                className="
                  text-slate-400
                "
              />

              <span
                className="
                  text-sm

                  text-slate-600
                  dark:text-slate-300
                "
              >
                {new Date(category.createdAt).toLocaleDateString()}
              </span>
            </div>
          </td>

          {/* ========================================
           * ACTIONS
           * ====================================== */}

          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <ModernButton
                text="Editar"
                size="sm"
                variant="secondary"
                icon={Pencil}
                onClick={() => onEdit?.(category)}
              />

              <ModernButton
                text="Eliminar"
                size="sm"
                variant="danger"
                icon={Trash2}
                onClick={() => onDelete?.(category)}
              />
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="space-y-8">
      {/* ========================================
       * PARENT CATEGORIES
       * ====================================== */}

      <div>
        <div className="mb-4">
          <h2
            className="
              text-lg
              font-bold

              text-slate-800
              dark:text-slate-100
            "
          >
            Categorías Principales
          </h2>

          <p
            className="
              mt-1
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Categorías raíz utilizadas para organizar el catálogo.
          </p>
        </div>

        <Table>
          <THead columns={columns} />

          <tbody>
            {parentCategories.length > 0 ? (
              renderRows(parentCategories)
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="
                    px-6
                    py-12
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  No existen categorías principales.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ========================================
       * CHILD CATEGORIES
       * ====================================== */}

      <div>
        <div className="mb-4">
          <h2
            className="
              text-lg
              font-bold

              text-slate-800
              dark:text-slate-100
            "
          >
            Subcategorías
          </h2>

          <p
            className="
              mt-1
              text-sm

              text-slate-500
              dark:text-slate-400
            "
          >
            Categorías dependientes de una categoría principal.
          </p>
        </div>

        <Table>
          <THead columns={columns} />

          <tbody>
            {childCategories.length > 0 ? (
              renderRows(childCategories, true)
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="
                    px-6
                    py-12
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  No existen subcategorías.
                </td>
              </tr>
            )}
          </tbody>

          <TFooter
            page={page}
            totalPages={totalPages}
            onPrev={onPrev}
            onNext={onNext}
          />
        </Table>
      </div>
    </div>
  );
}
