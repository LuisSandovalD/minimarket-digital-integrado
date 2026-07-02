import {
  Archive,
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  Cpu,
  CreditCard,
  Database,
  FileBarChart,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Package,
  PackageSearch,
  PieChart,
  ScanLine,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  User,
  Users,
  Warehouse,
} from "lucide-react";

export const menuByRole = {
  ADMIN: [
    {
      section: "GENERAL",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "dashboard",
          // Sin tier = Acceso total (FREE, BASIC, PREMIUM)
        },
        {
          id: "analytics",
          label: "Analítica de Negocio",
          icon: BarChart3,
          href: "analytics",
          tier: "PREMIUM", // Procesamiento de datos pesado e IA
        },
        {
          id: "reports",
          label: "Reportes y Exportación",
          icon: FileBarChart,
          href: "reports",
          tier: "BASIC", // Reportes detallados para negocios en crecimiento
        },
        {
          id: "statistics",
          label: "Estadísticas Visuales",
          icon: PieChart,
          href: "statistics",
          tier: "BASIC", // Gráficas e históricos de rendimiento
        },
      ],
    },
    {
      section: "ESTRUCTURA",
      items: [
        {
          id: "companies",
          label: "Datos Empresa",
          icon: Building2,
          href: "companies",
        },
        {
          id: "branches",
          label: "Sucursales",
          icon: Store,
          href: "branches",
          tier: "BASIC", // FREE incluye 1 sola sucursal. Multisucursal requiere BASIC+
        },
      ],
    },
    {
      section: "ACCESOS",
      items: [
        { id: "users", label: "Usuarios Sistema", icon: Users, href: "users" },
        {
          id: "employees",
          label: "Personal / Cajeros",
          icon: Users,
          href: "employees",
        },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
      ],
    },
    {
      section: "COMERCIO Y VENTAS",
      items: [
        { id: "sales", label: "Venta POS", icon: ShoppingCart, href: "sales" }, // Esencial para el día a día
        {
          id: "sale-details",
          label: "Historial de Ventas",
          icon: ClipboardList,
          href: "sale-details",
        },
        {
          id: "payments",
          label: "Caja y Métodos de Pago",
          icon: CreditCard,
          href: "payments",
        },
      ],
    },
    {
      section: "OPERACIONES Y STOCK",
      items: [
        { id: "products", label: "Productos", icon: Package, href: "products" },
        {
          id: "categories",
          label: "Categorías",
          icon: FileText,
          href: "categories",
        },
        {
          id: "units",
          label: "Unidades de Medida",
          icon: PackageSearch,
          href: "units",
        },
        {
          id: "inventory",
          label: "Inventario (Stock)",
          icon: Warehouse,
          href: "inventory",
        },
        {
          id: "inventory-history",
          label: "Movimientos Kárdex",
          icon: Archive,
          href: "inventory-history",
          tier: "BASIC", // Auditoría de stock avanzada requiere almacenamiento extra
        },
        {
          id: "suppliers",
          label: "Proveedores",
          icon: Truck,
          href: "suppliers",
        },
        {
          id: "purchases",
          label: "Órdenes de Compra",
          icon: ClipboardList,
          href: "purchases",
          tier: "BASIC", // Flujo logístico avanzado de abastecimiento
        },
        {
          id: "barcode",
          label: "Generador de Código de Barras",
          icon: ScanLine,
          href: "barcode",
          tier: "BASIC", // Herramienta utilitaria de organización pro
        },
      ],
    },
    {
      section: "SISTEMA",
      items: [
        {
          id: "notifications",
          label: "Alertas de Stock",
          icon: Bell,
          href: "notifications",
        },
        {
          id: "support",
          label: "Soporte (Tickets)",
          icon: LifeBuoy,
          href: "support",
        },
        {
          id: "database",
          label: "Copia de Seguridad / DB",
          icon: Database,
          href: "database",
          tier: "PREMIUM", // Infraestructura crítica de resguardo de datos
        },
        {
          id: "automation",
          label: "Asistente IA (Gemini)",
          icon: Cpu,
          href: "automation",
          tier: "PREMIUM", // Consumo de tokens de pago real de API
        },
        {
          id: "settings",
          label: "Ajustes Generales",
          icon: Settings,
          href: "settings",
        },
      ],
    },
  ],

  MANAGER: [
    {
      section: "GENERAL",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "dashboard",
        },
        {
          id: "analytics",
          label: "Analítica",
          icon: BarChart3,
          href: "analytics",
          tier: "PREMIUM",
        },
        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
          tier: "BASIC",
        },
        {
          id: "statistics",
          label: "Estadísticas",
          icon: PieChart,
          href: "statistics",
          tier: "BASIC",
        },
      ],
    },
    {
      section: "VENTAS",
      items: [
        { id: "sales", label: "Ventas", icon: ShoppingCart, href: "sales" },
        {
          id: "sale-details",
          label: "Detalles",
          icon: ClipboardList,
          href: "sale-details",
        },
      ],
    },
    {
      section: "STOCK",
      items: [
        { id: "products", label: "Productos", icon: Package, href: "products" },
        {
          id: "inventory",
          label: "Inventario",
          icon: Warehouse,
          href: "inventory",
        },
        {
          id: "inventory-history",
          label: "Movimientos",
          icon: Archive,
          href: "inventory-history",
          tier: "BASIC",
        },
        {
          id: "barcode",
          label: "Códigos",
          icon: ScanLine,
          href: "barcode",
          tier: "BASIC",
        },
      ],
    },
    {
      section: "COMPRAS",
      items: [
        {
          id: "suppliers",
          label: "Proveedores",
          icon: Truck,
          href: "suppliers",
        },
        {
          id: "purchases",
          label: "Órdenes",
          icon: ClipboardList,
          href: "purchases",
          tier: "BASIC",
        },
      ],
    },
    {
      section: "CATÁLOGOS",
      items: [
        {
          id: "categories",
          label: "Categorías",
          icon: FileText,
          href: "categories",
        },
        { id: "units", label: "Unidades", icon: PackageSearch, href: "units" },
      ],
    },
    {
      section: "PERSONAL",
      items: [
        { id: "employees", label: "Empleados", icon: Users, href: "employees" },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
        {
          id: "notifications",
          label: "Alertas",
          icon: Bell,
          href: "notifications",
        },
      ],
    },
  ],

  SUPERVISOR: [
    {
      section: "OPERACIONES",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "dashboard",
        },
        { id: "sales", label: "Ventas", icon: ShoppingCart, href: "sales" },
        {
          id: "inventory",
          label: "Inventario",
          icon: Warehouse,
          href: "inventory",
        },
        {
          id: "inventory-history",
          label: "Movimientos",
          icon: Archive,
          href: "inventory-history",
          tier: "BASIC",
        },
        { id: "employees", label: "Personal", icon: Users, href: "employees" },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
          tier: "BASIC",
        },
      ],
    },
  ],

  EMPLOYEE: [
    {
      section: "PUNTO DE VENTA",
      items: [
        {
          id: "dashboard",
          label: "Inicio",
          icon: LayoutDashboard,
          href: "dashboard",
        },
        { id: "sales", label: "Venta POS", icon: ShoppingCart, href: "sales" },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
        { id: "payments", label: "Pagos", icon: CreditCard, href: "payments" },
        { id: "products", label: "Productos", icon: Package, href: "products" },
        { id: "inventory", label: "Stock", icon: Warehouse, href: "inventory" },
      ],
    },
  ],

  SUPPORT: [
    {
      section: "GENERAL",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "dashboard",
        },
      ],
    },
    {
      section: "MESA DE AYUDA",
      items: [
        { id: "support", label: "Tickets", icon: LifeBuoy, href: "support" },
      ],
    },
  ],

  VIEWER: [
    {
      section: "CONSULTAS",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "dashboard",
        },
        {
          id: "analytics",
          label: "Analítica",
          icon: BarChart3,
          href: "analytics",
          tier: "PREMIUM",
        },
        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
          tier: "BASIC",
        },
        {
          id: "inventory",
          label: "Inventario",
          icon: Warehouse,
          href: "inventory",
        },
        { id: "sales", label: "Ventas", icon: ShoppingCart, href: "sales" },
      ],
    },
  ],
};
