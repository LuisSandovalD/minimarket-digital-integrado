import {
  BadgeDollarSign,
  Boxes,
  Receipt,
  ShoppingCart,
  Users,
  Warehouse,
} from "lucide-react";

export const modulesFeatures = [
  {
    title: "Inventario Inteligente",
    tagline: "Optimización de stock automatizada",
    description:
      "Controla stock, movimientos, alertas y almacenes en tiempo real.",
    icon: Boxes, // Ícono inyectado
    benefit:
      "Reduce pérdidas por productos vencidos o quiebres de stock innecesarios.",
    impact: "-25% en costos de almacenamiento",
    features: [
      "Alertas automáticas de stock mínimo y crítico.",
      "Trazabilidad completa por lotes y fechas de vencimiento.",
      "Valorización de inventario instantánea (FIFO/Promedio Ponderado).",
      "Historial detallado de movimientos por usuario.",
    ],
  },
  {
    title: "Ventas y POS",
    tagline: "Agilidad en el punto de venta",
    description:
      "Procesa ventas rápidas con tickets, códigos QR y múltiples cajas.",
    icon: ShoppingCart, // Ícono inyectado
    benefit:
      "Atiende a tus clientes en segundos con una interfaz intuitiva y offline-first.",
    impact: "Ventas 3x más rápidas en caja",
    features: [
      "Compatibilidad con lector de barras y pantallas táctiles.",
      "Soporte para múltiples métodos de pago (Efectivo, Tarjetas, QR).",
      "Cierre de caja (Arqueos Z y X) blindado con roles de seguridad.",
      "Modo contingencia (Sigue vendiendo incluso sin internet).",
    ],
  },
  {
    title: "Gestión de Almacenes",
    tagline: "Control multisede unificado",
    description:
      "Administra múltiples almacenes y controla transferencias internas.",
    icon: Warehouse, // Ícono inyectado
    benefit:
      "Monitorea y mueve mercancía entre sucursales sin perder el rastro de una sola unidad.",
    impact: "100% de visibilidad entre sucursales",
    features: [
      "Transferencias internas con doble validación (Salida/Entrada).",
      "Asignación de stock específico por zonas o estantes.",
      "Auditorías e inventarios físicos parciales mediante app móvil.",
      "Consolidación de requerimientos de compra automáticos.",
    ],
  },
  {
    title: "Gestión de Clientes",
    tagline: "Fidelización basada en datos",
    description:
      "Organiza clientes, historial de compras y programas de fidelización.",
    icon: Users, // Ícono inyectado
    benefit:
      "Conoce el comportamiento de tus compradores para diseñar ofertas irresistibles.",
    impact: "+18% en retención de clientes",
    features: [
      "Líneas de crédito autorizadas con alertas de morosidad.",
      "Acumulación de puntos personalizable por compras.",
      "Segmentación de clientes según volumen y frecuencia de compra.",
      "Historial unificado de cotizaciones, pedidos y notas de crédito.",
    ],
  },
  {
    title: "Finanzas Empresariales",
    tagline: "Salud financiera bajo control",
    description: "Visualiza ingresos, egresos, balances y flujo financiero.",
    icon: BadgeDollarSign, // Ícono inyectado
    benefit:
      "Toma decisiones estratégicas con reportes de pérdidas y ganancias en tiempo real.",
    impact: "Control absoluto del flujo de caja",
    features: [
      "Cuentas por cobrar y pagar automatizadas con recordatorios.",
      "Registro express de gastos operativos y caja chica.",
      "Conciliación bancaria rápida y visual.",
      "Proyecciones de flujo de efectivo automatizadas.",
    ],
  },
  {
    title: "Facturación Inteligente",
    tagline: "Cumplimiento fiscal sin fricciones",
    description:
      "Emite comprobantes electrónicos y administra documentos fiscales.",
    icon: Receipt, // Ícono inyectado
    benefit:
      "Emite tus comprobantes de pago autorizados por la entidad fiscal sin retrasos.",
    impact: "0 errores en reportes tributarios",
    features: [
      "Envío directo y automático a los servidores fiscales.",
      "Generación instantánea de XML, CDR y PDF optimizado.",
      "Automatización de retenciones, percepciones y detracciones.",
      "Soporte completo para Notas de Débito, Crédito y Guías de Remisión.",
    ],
  },
];
