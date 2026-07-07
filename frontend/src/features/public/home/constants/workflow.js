import {
  BarChart3,
  BellRing,
  Boxes,
  Building2,
  CreditCard,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

export const workflow = [
  {
    step: "01",
    title: "Configura tu empresa",
    description:
      "Crea tu empresa, sucursales y usuarios con permisos personalizados en pocos minutos.",
    icon: Building2,
    highlight: "Multiempresa",
  },
  {
    step: "02",
    title: "Registra productos e inventario",
    description:
      "Administra categorías, stock, códigos SKU, unidades de medida y alertas automáticas.",
    icon: Boxes,
    highlight: "Inventario inteligente",
  },
  {
    step: "03",
    title: "Realiza ventas en tiempo real",
    description:
      "Procesa ventas rápidas, múltiples métodos de pago y control de caja desde cualquier sucursal.",
    icon: ShoppingCart,
    highlight: "POS moderno",
  },
  {
    step: "04",
    title: "Monitorea reportes y analíticas",
    description:
      "Visualiza ingresos, productos más vendidos, movimientos y métricas clave del negocio.",
    icon: BarChart3,
    highlight: "Estadísticas avanzadas",
  },
  {
    step: "05",
    title: "Automatiza alertas y seguridad",
    description:
      "Recibe notificaciones de bajo stock, vencimientos y protege el sistema con acceso seguro.",
    icon: ShieldCheck,
    highlight: "Seguridad avanzada",
  },
  {
    step: "06",
    title: "Escala tu negocio",
    description:
      "Gestiona múltiples sucursales, empleados y operaciones desde un único panel centralizado.",
    icon: PackageCheck,
    highlight: "Escalable",
  },
  {
    step: "07",
    title: "Gestiona pagos y finanzas",
    description:
      "Controla ingresos, pagos pendientes, transferencias y movimientos financieros fácilmente.",
    icon: CreditCard,
    highlight: "Control financiero",
  },
  {
    step: "08",
    title: "Recibe alertas inteligentes",
    description:
      "Mantente informado con notificaciones automáticas sobre inventario, ventas y actividad.",
    icon: BellRing,
    highlight: "Alertas en tiempo real",
  },
];
