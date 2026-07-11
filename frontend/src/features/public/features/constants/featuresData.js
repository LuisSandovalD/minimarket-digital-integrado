import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Boxes,
  Brain,
  Building2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileBarChart,
  History,
  Layers,
  LineChart,
  PackageCheck,
  Percent,
  QrCode,
  Receipt,
  Scale,
  ScanLine,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Tags,
  Terminal,
  TrendingDown,
  TrendingUp,
  Truck,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

// =========================================================================
// 1. CONSTANTES PARA: InventoryFeatures (Balance: 4-3-3-4)
// =========================================================================
export const INVENTORY_FEATURES = [
  {
    id: "inventory",
    eyebrow: "Inventario",
    icon: Boxes,
    title: "Control total de tu inventario",
    description:
      "Administra productos, lotes, vencimientos y stock por sucursal en tiempo real.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: PackageCheck,
        title: "Stock en tiempo real",
        text: "Actualización automática con cada venta o compra.",
      },
      {
        icon: Boxes,
        title: "Multialmacén",
        text: "Controla existencias por sucursal y ubicación.",
      },
      {
        icon: Bell,
        title: "Alertas de stock",
        text: "Recibe avisos cuando un producto llega al mínimo.",
      },
      {
        icon: ClipboardCheck,
        title: "Auditorías",
        text: "Conteos cíclicos automáticos sin detener operaciones.",
      },
    ],
  },
  {
    id: "barcode",
    eyebrow: "Código de Barras",
    icon: ScanLine,
    title: "Gestión con código de barras",
    description:
      "Genera, imprime y escanea códigos para agilizar toda tu operación.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: QrCode,
        title: "Generación de códigos",
        text: "Crea códigos para productos sin código propio.",
      },
      {
        icon: ScanLine,
        title: "Escaneo veloz",
        text: "Compatible con lectores USB y cámaras.",
      },
      {
        icon: Tags,
        title: "Etiquetas",
        text: "Imprime etiquetas con precio y descripción.",
      },
    ],
  },
  {
    id: "traceability",
    eyebrow: "Trazabilidad",
    icon: History,
    title: "Kárdex e historial de movimientos",
    description:
      "Audita el ciclo de vida de cada producto con un registro inmutable de ingresos, salidas y ajustes.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: History,
        title: "Kárdex valorizado",
        text: "Historial quirúrgico detallado por cada artículo.",
      },
      {
        icon: ArrowLeftRight,
        title: "Transferencias internas",
        text: "Mueve mercancía entre sucursales de forma segura.",
      },
      {
        icon: ShieldAlert,
        title: "Control de mermas",
        text: "Registra pérdidas, productos dañados o vencidos.",
      },
    ],
  },
  {
    id: "batches",
    eyebrow: "Lotes y Almacenamiento",
    icon: Layers,
    title: "Control de lotes y caducidad",
    description:
      "Garantiza la rotación correcta de productos perecederos o con fecha de vencimiento crítica.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: TrendingDown,
        title: "Alertas de vencimiento",
        text: "Notificaciones preventivas antes de la fecha límite.",
      },
      {
        icon: Layers,
        title: "Gestión por lotes",
        text: "Clasifica y rastrea producciones específicas fácilmente.",
      },
      {
        icon: ClipboardCheck,
        title: "Método PEPS / FIFO",
        text: "Asegura que lo primero en entrar sea lo primero en salir.",
      },
      {
        icon: Boxes,
        title: "Zonificación",
        text: "Asigna pasillos y estantes para optimizar picking.",
      },
    ],
  },
];

// =========================================================================
// 2. CONSTANTES PARA: SalesFeatures (Balance: 3-4-3-4)
// =========================================================================
export const SALES_FEATURES = [
  {
    id: "sales",
    eyebrow: "Ventas POS",
    icon: ShoppingCart,
    title: "Punto de venta rápido y confiable",
    description:
      "Cobra en segundos con múltiples métodos de pago y facturación electrónica.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: CreditCard,
        title: "Multipago",
        text: "Efectivo, tarjeta, yape, transferencia y más.",
      },
      {
        icon: Receipt,
        title: "Facturación electrónica",
        text: "Emite boletas y facturas cumpliendo la normativa.",
      },
      {
        icon: ScanLine,
        title: "Venta con lector",
        text: "Escanea productos y agiliza la caja.",
      },
    ],
  },
  {
    id: "analytics",
    eyebrow: "Analítica",
    icon: BarChart3,
    title: "Reportes y analítica que impulsan decisiones",
    description:
      "Visualiza el rendimiento de tu negocio con reportes claros y en vivo.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: FileBarChart,
        title: "Reportes de ventas",
        text: "Por producto, categoría, sucursal y vendedor.",
      },
      {
        icon: LineChart,
        title: "Tendencias",
        text: "Identifica productos estrella y temporadas.",
      },
      {
        icon: Building2,
        title: "Comparativo de sucursales",
        text: "Mide y compara el desempeño de cada local.",
      },
      {
        icon: TrendingUp,
        title: "Márgenes brutos",
        text: "Evalúa la rentabilidad pura de tus operaciones financieras.",
      },
    ],
  },
  {
    id: "discounts",
    eyebrow: "Promociones",
    icon: Percent,
    title: "Campañas y reglas de descuento",
    description:
      "Automatiza promociones complejas, ofertas flash y cupones de fidelización.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: Receipt,
        title: "Ofertas cruzadas",
        text: "Configura promociones como 2x1 o combos integrados.",
      },
      {
        icon: Tags,
        title: "Precios mayoristas",
        text: "Cambia tarifas automáticamente según el volumen de compra.",
      },
      {
        icon: ChevronRight,
        title: "Cupones dinámicos",
        text: "Genera códigos de descuento temporales para tus campañas.",
      },
    ],
  },
  {
    id: "customers",
    eyebrow: "Fidelización",
    icon: UserCheck,
    title: "Gestión avanzada de clientes",
    description:
      "Registra historiales de consumo, asigna líneas de crédito y mejora la retención.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: Users,
        title: "Perfiles de compra",
        text: "Conoce las preferencias y frecuencias de tus clientes.",
      },
      {
        icon: Wallet,
        title: "Crédito corporativo",
        text: "Controla saldos pendientes y fechas de pago asignadas.",
      },
      {
        icon: Sparkles,
        title: "Sistema de puntos",
        text: "Premia la lealtad acumulando beneficios por cada compra.",
      },
      {
        icon: Bell,
        title: "Recordatorios de cobranza",
        text: "Envía alertas automáticas de saldos vencidos.",
      },
    ],
  },
];

// =========================================================================
// 3. CONSTANTES PARA: PurchaseFeatures (Balance: 3-4-3-4)
// =========================================================================
export const PURCHASE_FEATURES = [
  {
    id: "purchase",
    eyebrow: "Compras",
    icon: Truck,
    title: "Compras y proveedores organizados",
    description:
      "Genera órdenes de compra, recibe mercadería y controla tus cuentas por pagar.",
    image:
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: Truck,
        title: "Órdenes de compra",
        text: "Crea y envía órdenes a tus proveedores.",
      },
      {
        icon: PackageCheck,
        title: "Recepción de mercadería",
        text: "Actualiza el stock al recibir productos.",
      },
      {
        icon: Users,
        title: "Proveedores",
        text: "Historial de compras y saldos por proveedor.",
      },
    ],
  },
  {
    id: "ai",
    eyebrow: "IA Empresarial",
    icon: Sparkles,
    title: "Inteligencia artificial para tu negocio",
    description:
      "Predice demanda, evita quiebres de stock y recibe recomendaciones inteligentes.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: Brain,
        title: "Predicción de demanda",
        text: "Anticipa cuánto vas a vender y cuánto comprar.",
      },
      {
        icon: Sparkles,
        title: "Recomendaciones",
        text: "Sugerencias de reposición y precios óptimos.",
      },
      {
        icon: Bell,
        title: "Detección de anomalías",
        text: "Alertas ante ventas o mermas inusuales.",
      },
      {
        icon: BarChart3,
        title: "Optimización de Mix",
        text: "Identifica qué combinación de stock rinde mejor.",
      },
    ],
  },
  {
    id: "expenses",
    eyebrow: "Finanzas",
    icon: Scale,
    title: "Cuentas por pagar y gastos",
    description:
      "Mantén al día tus flujos de caja registrando costos operativos y obligaciones financieras.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: Wallet,
        title: "Gestión de deuda",
        text: "Calendario de vencimientos de pagos a proveedores.",
      },
      {
        icon: TrendingUp,
        title: "Costos fijos y variables",
        text: "Clasifica alquileres, servicios públicos y nóminas.",
      },
      {
        icon: FileBarChart,
        title: "Margen de utilidad",
        text: "Calcula tus ganancias netas deduciendo costos de adquisición.",
      },
    ],
  },
  {
    id: "supply-chain",
    eyebrow: "Logística",
    icon: Terminal,
    title: "Evaluación y cadena de abastecimiento",
    description:
      "Califica el cumplimiento de tus proveedores y automatiza solicitudes basados en históricos.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    items: [
      {
        icon: UserCheck,
        title: "Desempeño de proveedor",
        text: "Mide tiempos de entrega y tasa de productos defectuosos.",
      },
      {
        icon: ClipboardCheck,
        title: "Reordenamiento automático",
        text: "Genera borradores de compra cuando el inventario esté crítico.",
      },
      {
        icon: Boxes,
        title: "Consolidación de carga",
        text: "Agrupa múltiples órdenes para optimizar gastos de envío.",
      },
      {
        icon: Truck,
        title: "Rutas de Despacho",
        text: "Coordina envíos eficientes de forma centralizada.",
      },
    ],
  },
];

export const FEATURE_TAGS = [
  "Inventario",
  "Ventas POS",
  "Compras",
  "Clientes",
  "Proveedores",
  "Reportes",
  "Analítica",
  "IA Empresarial",
  "Código de Barras",
];
