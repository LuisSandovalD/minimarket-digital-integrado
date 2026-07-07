// models/constants/dashboards.js
import { Globe, ShieldCheck, TrendingUp, Zap } from "lucide-react";

export const dashboards = [
  {
    icon: TrendingUp,
    subtitle: "Métricas",
    value: "Analíticas",
    description: "Monitoreo en tiempo real de transacciones",
  },
  {
    icon: ShieldCheck,
    subtitle: "Protección",
    value: "Seguridad",
    description: "Cifrado de extremo a extremo y roles",
  },
  {
    icon: Zap,
    subtitle: "Velocidad",
    value: "Rendimiento",
    description: "Optimización de consultas en milisegundos",
  },
  {
    icon: Globe,
    subtitle: "Global",
    value: "Sincronización",
    description: "Múltiples sucursales interconectadas",
  },
];
