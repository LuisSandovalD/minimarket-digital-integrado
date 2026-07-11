import {
  BarChart3,
  Boxes,
  Building2,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";

// 1. ESTADÍSTICAS (Balanceado: Ya tiene 4 elementos - Perfecto para 2 o 4 columnas)
export const STATS = [
  { value: "+12K", label: "Negocios activos" },
  { value: "99.9%", label: "Disponibilidad" },
  { value: "+3M", label: "Ventas procesadas al mes" },
  { value: "24/7", label: "Soporte técnico" },
];

// 2. HERO HIGHLIGHTS (Balanceado: Ya tiene 4 elementos - Perfecto para 2 o 4 columnas)
export const HERO_HIGHLIGHTS = [
  { icon: Boxes, label: "Inventario" },
  { icon: ShoppingCart, label: "Ventas POS" },
  { icon: BarChart3, label: "Analítica" },
  { icon: Sparkles, label: "IA empresarial" },
];

// 3. LOGOS DE CONFIANZA (Balanceado: Cambiado de 6 a 8 marcas para un grid perfecto de 2, 4 u 8 columnas sin huecos)
export const TRUSTED_LOGOS = [
  "Minimarket Sol",
  "Bodega Central",
  "TiendaExpress",
  "GrupoAndes",
  "DistriPeru",
  "MercadoFacil",
  "FarmaNorte",
  "MegaAbastos",
];

// 4. HOME HIGHLIGHTS (Balanceado: Ya tiene 4 elementos - Perfecto para 2 o 4 columnas)
export const HOME_HIGHLIGHTS = [
  {
    icon: Boxes,
    title: "Inventario en tiempo real",
    description:
      "Controla stock por sucursal, lotes y vencimientos con actualizaciones al instante.",
  },
  {
    icon: ShoppingCart,
    title: "Punto de venta veloz",
    description:
      "POS optimizado para caja rápida, múltiples métodos de pago y facturación electrónica.",
  },
  {
    icon: Truck,
    title: "Compras y proveedores",
    description:
      "Órdenes de compra, recepciones y cuentas por pagar organizadas en un solo lugar.",
  },
  {
    icon: Sparkles,
    title: "Decisiones con IA",
    description:
      "Predice demanda, detecta quiebres de stock y recibe recomendaciones automáticas.",
  },
];

// 5. ÍCONOS POR SECTORES (Balanceado: Subió de 7 a 8 llaves lógicas agregando 'seguridad', ideal si renderizas este diccionario en grids pares)
export const SECTOR_ICONS = {
  minimarket: ShoppingBag,
  bodega: Boxes,
  tienda: ShoppingCart,
  empresa: Building2,
  distribuidor: Truck,
  crecimiento: BarChart3,
  barcode: ScanLine,
  seguridad: ShieldCheck, // Complemento par
};

// 6. NUEVA GALERÍA DE SECTORES (Balanceado: 3 elementos ideales para el Bento Grid visual de TrustedSection)
export const SECTOR_GALLERY = [
  {
    title: "Minimarkets y Retail",
    description:
      "Control de pasillos, múltiples cajas POS en simultáneo, vencimientos rápidos y reposición inteligente automatizada.",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Centros de Distribución",
    description:
      "Gestión avanzada de almacenes múltiples, movimientos entre sucursales, control estricto de lotes y despacho logístico.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Franquicias y Multiempresas",
    description:
      "Consolidación de reportes globales, centralización de catálogos y analítica predictiva corporativa mediante IA.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
  },
];
