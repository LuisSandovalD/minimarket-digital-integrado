// ========================================
// components/categories/CategoryHeader.jsx
// ========================================

import { Archive, FolderTree, Layers3, Plus } from "lucide-react";

import { PageHeader } from "@/components/data-display/";

export default function CategoryHeader({
  categories = [],

  onCreate,
}) {
  // ========================================
  // STATS
  // ========================================

  const rootCategories = categories.filter((category) => !category.parentId).length;

  const childCategories = categories.filter((category) => category.parentId).length;

  return (
    <PageHeader
      icon={FolderTree}
      badge="Catálogo"
      title="Categorías"
      description="
        Administra las categorías
        y subcategorías utilizadas
        para organizar productos
        dentro del sistema.
      "
      action={{
        label: "Nueva categoría",

        icon: Plus,

        onClick: onCreate,

        variant: "primary",
      }}
      stats={[
        {
          icon: Layers3,
          label: "Total categorías",
          value: categories.length,
        },

        {
          icon: FolderTree,
          label: "Principales",
          value: rootCategories,
        },

        {
          icon: Archive,
          label: "Subcategorías",
          value: childCategories,
        },
      ]}
    />
  );
}
