import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const FORM_FIELDS = [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    placeholder: "Tu nombre completo",
    required: true,
  },
  {
    name: "correo",
    label: "Correo",
    type: "email",
    placeholder: "tucorreo@empresa.com",
    required: true,
  },
  {
    name: "empresa",
    label: "Empresa",
    type: "text",
    placeholder: "Nombre de tu negocio",
    required: false,
  },
  {
    name: "telefono",
    label: "Telefono",
    type: "tel",
    placeholder: "+51 999 999 999",
    required: false,
  },
];

export const CONTACT_INFO = [
  { icon: Mail, label: "Correo", value: "hola@nexora.app" },
  { icon: Phone, label: "Telefono", value: "+51 987 654 321" },
  { icon: MapPin, label: "Oficina", value: "Av. Javier Prado 123, Lima" },
  { icon: Clock, label: "Horario", value: "Lun a Vie · 9:00 - 18:00" },
];
