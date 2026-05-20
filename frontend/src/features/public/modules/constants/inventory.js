// models/constants/inventory.js

import {
  Package,
  Boxes,
  ScanLine,
  BellRing,
  Archive,
  Truck,
} from "lucide-react";

export const inventory = [
  {
    title: "Control de Stock",

    description: "Gestiona existencias y movimientos en tiempo real.",

    icon: Package,

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Almacenes Inteligentes",

    description: "Organiza múltiples almacenes y transferencias internas.",

    icon: Boxes,

    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Escaneo de Productos",

    description: "Compatible con lectores de código de barras y QR.",

    icon: ScanLine,

    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Alertas Automáticas",

    description: "Recibe notificaciones de stock mínimo y vencimientos.",

    icon: BellRing,

    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Historial de Movimientos",

    description: "Audita entradas, salidas y modificaciones de inventario.",

    icon: Archive,

    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Logística y Distribución",

    description: "Gestiona envíos, rutas y entregas empresariales.",

    icon: Truck,

    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  },
];
