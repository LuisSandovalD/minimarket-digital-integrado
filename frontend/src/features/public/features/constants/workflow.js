// features/constants/workflow.js

import {
  Boxes,
  ClipboardList,
  FileBarChart2,
  LineChart,
  ShoppingCart,
} from "lucide-react";

export const workflow = [
  {
    step: "01",
    title: "Registrar productos",
    description:
      "Administra productos, categorías, precios y unidades de manera rápida y organizada.",
    icon: Boxes,
  },

  {
    step: "02",
    title: "Gestionar inventario",
    description:
      "Controla stock, movimientos y alertas en tiempo real desde cualquier sucursal.",
    icon: ClipboardList,
  },

  {
    step: "03",
    title: "Procesar ventas",
    description:
      "Realiza ventas rápidas con comprobantes, métodos de pago y control automatizado.",
    icon: ShoppingCart,
  },

  {
    step: "04",
    title: "Generar reportes",
    description:
      "Obtén reportes detallados de ventas, inventario, compras y rendimiento empresarial.",
    icon: FileBarChart2,
  },

  {
    step: "05",
    title: "Analizar métricas",
    description:
      "Visualiza estadísticas y métricas clave para tomar mejores decisiones estratégicas.",
    icon: LineChart,
  },
];
