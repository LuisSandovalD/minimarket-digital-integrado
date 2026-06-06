// ========================================
// config/menuByRole.js
// ERP / POS MULTIEMPRESA
// ========================================

import {
  Activity,
  Archive,
  BarChart3,
  // SYSTEM
  Bell,
  // BUSINESS
  Building2,
  ClipboardList,
  Cpu,
  CreditCard,
  Database,
  FileBarChart,
  // EXTRA
  FileText,
  History,
  // GENERAL
  LayoutDashboard,
  LifeBuoy,
  // INVENTORY
  Package,
  PackageSearch,
  PieChart,
  Receipt,
  ScanLine,
  Settings,
  ShieldCheck,
  // SALES
  ShoppingCart,
  Store,
  TrendingUp,
  Truck,
  User,
  UserCog,
  // USERS
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";

// ========================================
// MENU
// ========================================

export const menuByRole = {
  // =====================================================
  // ADMIN
  // =====================================================

  ADMIN: [
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
        },

        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
        },

        {
          id: "activity",
          label: "Actividad",
          icon: Activity,
          href: "activity",
        },
      ],
    },

    {
      section: "EMPRESAS",

      items: [
        {
          id: "companies",
          label: "Empresas",
          icon: Building2,
          href: "companies",
        },

        {
          id: "branches",
          label: "Sucursales",
          icon: Store,
          href: "branches",
        },
      ],
    },

    {
      section: "USUARIOS",

      items: [
        {
          id: "users",
          label: "Usuarios",
          icon: Users,
          href: "users",
        },

        {
          id: "employees",
          label: "Empleados",
          icon: UserCog,
          href: "employees",
        },

        {
          id: "customers",
          label: "Clientes",
          icon: User,
          href: "customers",
        },

        {
          id: "roles",
          label: "Roles",
          icon: ShieldCheck,
          href: "roles",
        },

        {
          id: "audit",
          label: "Auditoría",
          icon: History,
          href: "audit",
        },
      ],
    },

    {
      section: "OPERACIONES",

      items: [
        {
          id: "purchases",
          label: "Compras",
          icon: Truck,
          href: "purchases",
        },

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
        },

        {
          id: "payments",
          label: "Pagos",
          icon: CreditCard,
          href: "payments",
        },
      ],
    },

    {
      section: "SISTEMA",

      items: [
        {
          id: "notifications",
          label: "Notificaciones",
          icon: Bell,
          href: "notifications",
        },

        {
          id: "support",
          label: "Soporte",
          icon: LifeBuoy,
          href: "support",
        },

        {
          id: "database",
          label: "Base de datos",
          icon: Database,
          href: "database",
        },

        {
          id: "automation",
          label: "IA",
          icon: Cpu,
          href: "automation",
        },

        {
          id: "settings",
          label: "Configuración",
          icon: Settings,
          href: "settings",
        },
      ],
    },
  ],

  // =====================================================
  // MANAGER
  // =====================================================

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
        },

        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
        },

        {
          id: "statistics",
          label: "Estadísticas",
          icon: PieChart,
          href: "statistics",
        },
      ],
    },

    {
      section: "VENTAS",

      items: [
        {
          id: "sales",
          label: "Ventas",
          icon: ShoppingCart,
          href: "sales",
        },

        {
          id: "sale-details",
          label: "Detalle ventas",
          icon: ClipboardList,
          href: "sale-details",
        },

        {
          id: "payments",
          label: "Pagos",
          icon: CreditCard,
          href: "payments",
        },

        {
          id: "cashbox",
          label: "Caja",
          icon: Wallet,
          href: "cashbox",
        },

        {
          id: "finance",
          label: "Finanzas",
          icon: TrendingUp,
          href: "finance",
        },

        {
          id: "invoices",
          label: "Facturación",
          icon: Receipt,
          href: "invoices",
        },
      ],
    },

    {
      section: "INVENTARIO",

      items: [
        {
          id: "products",
          label: "Productos",
          icon: Package,
          href: "products",
        },

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
        },

        {
          id: "barcode",
          label: "Código barras",
          icon: ScanLine,
          href: "barcode",
        },
      ],
    },

    {
      section: "COMPRAS",

      items: [
        {
          id: "purchases",
          label: "Compras",
          icon: Truck,
          href: "purchases",
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

        {
          id: "units",
          label: "Unidades",
          icon: PackageSearch,
          href: "units",
        },
      ],
    },

    {
      section: "PERSONAL",

      items: [
        {
          id: "employees",
          label: "Empleados",
          icon: Users,
          href: "employees",
        },

        {
          id: "customers",
          label: "Clientes",
          icon: User,
          href: "customers",
        },

        {
          id: "notifications",
          label: "Notificaciones",
          icon: Bell,
          href: "notifications",
        },
      ],
    },
  ],

  // =====================================================
  // SUPERVISOR
  // =====================================================

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

        {
          id: "sales",
          label: "Ventas",
          icon: ShoppingCart,
          href: "sales",
        },

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
        },

        {
          id: "employees",
          label: "Personal",
          icon: Users,
          href: "employees",
        },

        {
          id: "customers",
          label: "Clientes",
          icon: User,
          href: "customers",
        },

        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
        },
      ],
    },
  ],

  // =====================================================
  // EMPLOYEE
  // =====================================================

  EMPLOYEE: [
    {
      section: "PUNTO DE VENTA",

      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "dashboard",
        },

        {
          id: "sales",
          label: "Ventas",
          icon: ShoppingCart,
          href: "sales",
        },

        {
          id: "customers",
          label: "Clientes",
          icon: User,
          href: "customers",
        },

        {
          id: "payments",
          label: "Pagos",
          icon: CreditCard,
          href: "payments",
        },

        {
          id: "cashbox",
          label: "Caja",
          icon: Wallet,
          href: "cashbox",
        },

        {
          id: "products",
          label: "Productos",
          icon: Package,
          href: "products",
        },

        {
          id: "inventory",
          label: "Consultar stock",
          icon: Warehouse,
          href: "inventory",
        },

        {
          id: "barcode",
          label: "Escáner",
          icon: ScanLine,
          href: "barcode",
        },
      ],
    },
  ],

  // =====================================================
  // VIEWER
  // =====================================================

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
        },

        {
          id: "reports",
          label: "Reportes",
          icon: FileBarChart,
          href: "reports",
        },

        {
          id: "inventory",
          label: "Inventario",
          icon: Warehouse,
          href: "inventory",
        },

        {
          id: "sales",
          label: "Ventas",
          icon: ShoppingCart,
          href: "sales",
        },
      ],
    },
  ],
};
