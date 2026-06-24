// ========================================
// config/menuByRole.js
// ERP / POS MULTIEMPRESA (MINIMALISTA)
// ========================================

import {
  Activity,
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
  History,
  LayoutDashboard,
  LifeBuoy,
  Package,
  PackageSearch,
  PieChart,
  ScanLine,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  User,
  UserCog,
  Users,
  Wallet,
  Warehouse
} from "lucide-react";

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
          label: "Monitoreo",
          icon: Activity,
          href: "activity",
        },
      ],
    },
    {
      section: "ESTRUCTURA",
      items: [
        {
          id: "companies",
          label: "Empresas",
          icon: Building2,
          href: "companies",
        },
        { id: "branches", label: "Sucursales", icon: Store, href: "branches" },
      ],
    },
    {
      section: "ACCESOS",
      items: [
        { id: "users", label: "Usuarios", icon: Users, href: "users" },
        {
          id: "employees",
          label: "Empleados",
          icon: UserCog,
          href: "employees",
        },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
        { id: "roles", label: "Roles", icon: ShieldCheck, href: "roles" },
      ],
    },
    {
      section: "OPERACIONES",
      items: [
        { id: "purchases", label: "Compras", icon: Truck, href: "purchases" },
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
        { id: "payments", label: "Pagos", icon: CreditCard, href: "payments" },
      ],
    },
    {
      section: "SISTEMA",
      items: [
        {
          id: "notifications",
          label: "Alertas",
          icon: Bell,
          href: "notifications",
        },
        { id: "support", label: "Tickets", icon: LifeBuoy, href: "support" },
        {
          id: "database",
          label: "Base de Datos",
          icon: Database,
          href: "database",
        },
        { id: "automation", label: "IA", icon: Cpu, href: "automation" },
        { id: "audit", label: "Auditoría", icon: History, href: "audit" },
        { id: "settings", label: "Ajustes", icon: Settings, href: "settings" },
      ],
    },
  ],

  // =====================================================
  // SUPPORT
  // =====================================================
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
        {
          id: "ticket-logs",
          label: "Historial",
          icon: ClipboardList,
          href: "support-history",
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
        },
        { id: "barcode", label: "Códigos", icon: ScanLine, href: "barcode" },
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
        },
        { id: "employees", label: "Personal", icon: Users, href: "employees" },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
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
          label: "Inicio",
          icon: LayoutDashboard,
          href: "dashboard",
        },
        { id: "sales", label: "Venta POS", icon: ShoppingCart, href: "sales" },
        { id: "customers", label: "Clientes", icon: User, href: "customers" },
        { id: "payments", label: "Pagos", icon: CreditCard, href: "payments" },
        { id: "cashbox", label: "Caja", icon: Wallet, href: "cashbox" },
        { id: "products", label: "Productos", icon: Package, href: "products" },
        { id: "inventory", label: "Stock", icon: Warehouse, href: "inventory" },
        { id: "barcode", label: "Escáner", icon: ScanLine, href: "barcode" },
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
        { id: "sales", label: "Ventas", icon: ShoppingCart, href: "sales" },
      ],
    },
  ],
};
