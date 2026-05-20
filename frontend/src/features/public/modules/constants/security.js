// models/constants/security.js

import {
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  Eye,
  Database,
} from "lucide-react";

export const security = [
  {
    title: "Autenticación Segura",

    description: "Sistema de acceso protegido mediante JWT y sesiones seguras.",

    icon: ShieldCheck,

    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Control de Roles",

    description: "Gestiona permisos personalizados para cada usuario.",

    icon: Lock,

    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },

  {
    title: "2FA Empresarial",

    description: "Protección adicional mediante autenticación en dos pasos.",

    icon: KeyRound,

    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Biometría y Seguridad",

    description:
      "Compatible con tecnologías modernas de validación biométrica.",

    icon: Fingerprint,

    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
  },

  {
    title: "Auditoría Completa",

    description: "Registra todas las acciones y movimientos del sistema.",

    icon: Eye,

    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
  },

  {
    title: "Protección de Datos",

    description: "Bases de datos protegidas con cifrado y backups automáticos.",

    icon: Database,

    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop",
  },
];
