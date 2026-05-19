// models/constants/modules.js

import {
  Boxes,
  ShoppingCart,
  Warehouse,
  Users,
  BadgeDollarSign,
  Receipt,
} from "lucide-react";

export const modules = [
  {
    title: "Inventario Inteligente",

    description:
      "Controla stock, movimientos, alertas y almacenes en tiempo real.",

    icon: Boxes,

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Ventas y POS",

    description:
      "Procesa ventas rápidas con tickets, códigos QR y múltiples cajas.",

    icon: ShoppingCart,

    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Gestión de Almacenes",

    description:
      "Administra múltiples almacenes y controla transferencias internas.",

    icon: Warehouse,

    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Gestión de Clientes",

    description:
      "Organiza clientes, historial de compras y programas de fidelización.",

    icon: Users,

    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Finanzas Empresariales",

    description:
      "Visualiza ingresos, egresos, balances y flujo financiero.",

    icon: BadgeDollarSign,

    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Facturación Inteligente",

    description:
      "Emite comprobantes electrónicos y administra documentos fiscales.",

    icon: Receipt,

    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=2070&auto=format&fit=crop",
  },
];