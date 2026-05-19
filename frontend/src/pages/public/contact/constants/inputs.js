import {
  Send,
  User,
  Mail,
  MessageSquare,
  Building2,
  Phone,
  Sparkles,
  ShieldCheck,
  Clock3,
} from "lucide-react";
export const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Nombre completo",
      label: "Nombre",
      icon: User,
    },

    {
      name: "email",
      type: "email",
      placeholder:
        "correo@empresa.com",
      label: "Correo electrónico",
      icon: Mail,
    },

    {
      name: "company",
      type: "text",
      placeholder:
        "Nombre de la empresa",
      label: "Empresa",
      icon: Building2,
    },

    {
      name: "phone",
      type: "text",
      placeholder: "+51 999 999 999",
      label: "Teléfono",
      icon: Phone,
    },
  ];