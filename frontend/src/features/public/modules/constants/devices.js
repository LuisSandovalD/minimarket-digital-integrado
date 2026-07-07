// models/constants/devices.js
import { Monitor, Smartphone, Tablet } from "lucide-react";

export const devices = [
  {
    title: "Desktop Empresarial",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2070&auto=format&fit=crop",
    description:
      "Optimizado para la administración central, reportes avanzados y cajas principales de alta demanda.",
    icon: Monitor,
  },
  {
    title: "Tablet Comercial",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1974&auto=format&fit=crop",
    description:
      "Ideal para la toma de pedidos en mesas, inventarios rápidos y atención dinámica en piso de venta.",
    icon: Tablet,
  },
  {
    title: "Smartphone",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
    description:
      "Control total en tu bolsillo. Revisa ventas en tiempo real, reportes ejecutivos y alertas del sistema.",
    icon: Smartphone,
  },
];
