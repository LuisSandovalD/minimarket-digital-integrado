// ========================================
// PRODUCT STATUS
// ========================================

export const PRODUCT_STATUS = {
  ACTIVE: "ACTIVE",

  INACTIVE: "INACTIVE",

  LOW_STOCK: "LOW_STOCK",

  OUT_OF_STOCK: "OUT_OF_STOCK",
};

// ========================================
// DEFAULT FILTERS
// ========================================

export const DEFAULT_PRODUCT_FILTERS = {
  search: "",

  category: "",

  featured: false,
};

// ========================================
// PRODUCT SORT OPTIONS
// ========================================

export const PRODUCT_SORT_OPTIONS = [
  {
    label: "Más recientes",
    value: "newest",
  },

  {
    label: "Más antiguos",
    value: "oldest",
  },

  {
    label: "Nombre A-Z",
    value: "name_asc",
  },

  {
    label: "Nombre Z-A",
    value: "name_desc",
  },

  {
    label: "Mayor precio",
    value: "price_desc",
  },

  {
    label: "Menor precio",
    value: "price_asc",
  },
];

// ========================================
// STATUS COLORS
// ========================================

export const PRODUCT_STATUS_COLORS = {
  ACTIVE: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20",

  INACTIVE: "bg-slate-500/15 text-slate-400 border-slate-500/20",

  LOW_STOCK: "bg-amber-500/15 text-amber-500 border-amber-500/20",

  OUT_OF_STOCK: "bg-red-500/15 text-red-500 border-red-500/20",
};
