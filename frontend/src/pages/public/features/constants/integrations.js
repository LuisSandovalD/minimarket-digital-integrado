import {
  Globe,
  CreditCard,
  QrCode,
  Printer,
  ArrowUpRight,
} from "lucide-react";

export const integrations = [
    {
      icon: CreditCard,
      title: "Pagos digitales",
      description:
        "Compatible con múltiples métodos de pago modernos y seguros.",
    },

    {
      icon: QrCode,
      title: "QR y facturación",
      description:
        "Generación automática de comprobantes y códigos QR.",
    },

    {
      icon: Printer,
      title: "Impresoras POS",
      description:
        "Integración rápida con tickets e impresoras térmicas.",
    },

    {
      icon: Globe,
      title: "APIs externas",
      description:
        "Conecta servicios empresariales y plataformas modernas.",
    },
  ];