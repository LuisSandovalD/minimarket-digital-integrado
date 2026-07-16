import { BellRing, CalendarClock, Cpu, Mail, PackageX, ShieldCheck } from "lucide-react";

// 1. AUTOMATIZACIÓN DE CORREOS (Balanceado: 3 Features + 1 Analítica en Stats = 4)
export const EMAIL_FLOW = {
  id: "email",
  icon: Mail,
  title: "Automatización de Correos",
  description: "Envía mensajes personalizados automáticamente durante todo el ciclo de vida del cliente.",

  features: {
    onboarding: [
      "Correos de bienvenida automáticos",
      "Activación instantánea de cuentas",
      "Verificación de correo electrónico",
      "Tutoriales de inicio rápido y onboarding guiado",
      "Flujos de reactivación para usuarios inactivos",
    ],
    transaccional: [
      "Recuperación de contraseña",
      "Confirmaciones de pago",
      "Recordatorios automáticos",
      "Facturas electrónicas y recibos adjuntos",
      "Notificaciones de cambios en la cuenta (email, password)",
      "Alertas de intentos de inicio de sesión",
    ],
    personalizacion_marketing: [
      "Notificaciones personalizadas con tags dinámicos",
      "Plantillas profesionales con editor Drag & Drop",
      "Campañas automatizadas por comportamiento de compra",
      "Pruebas A/B integradas para optimizar aperturas",
      "Segmentación avanzada de audiencias",
    ],
  },

  stats: [
    { value: "Real Time", label: "Tasa de apertura y clics" },
    { value: "0% Spam", label: "Reportes de rebote (Bounce)" },
    { value: "Métricas", label: "Seguimiento de enlaces de baja" },
    { value: "24/7", label: "Envío automático" },
  ],
};

// 2. SEGURIDAD (Balanceado: 3 Features + 1 Auditoría en Stats = 4)
export const SECURITY_FLOW = {
  id: "security",
  icon: ShieldCheck,
  title: "Security Inteligente",
  description: "Protege las cuentas de tus usuarios mediante procesos automáticos de validación y recuperación.",

  features: {
    autenticacion: [
      "Autenticación mediante OTP vía SMS/Email",
      "Verificación de identidad (MFA / 2FA)",
      "Tokens temporales seguros (JWT con expiración corta)",
      "Soporte para Autenticación Biométrica (FaceID/Huella)",
      "Integración con Single Sign-On (SSO: Google, Apple)",
    ],
    recuperacion_gestion: [
      "Recuperación segura mediante enlaces encriptados",
      "Validaciones automáticas de robustez de contraseña",
      "Preguntas de seguridad configurables",
      "Historial de contraseñas para evitar reutilización",
    ],
    proteccion_perimetral: [
      "Bloqueo de accesos sospechosos por geolocalización o IP anómala",
      "Notificaciones de seguridad instantáneas",
      "Protección contra accesos no autorizados y fuerza bruta",
      "Cifrado de datos en reposo y tránsito (AES-256 / TLS 1.3)",
    ],
  },

  stats: [
    { value: "Logs", label: "Auditorías inmutables de acción" },
    { value: "256-bit", label: "Cifrado de grado militar" },
    { value: "100%", label: "Validaciones automáticas" },
    { value: "24/7", label: "Protección perimetral" },
  ],
};

// 3. SUSCRIPCIONES (Balanceado: 3 Features + 1 Métricas de Negocio en Stats = 4)
export const SUBSCRIPTION_FLOW = {
  id: "subscription",
  icon: CalendarClock,
  title: "Gestión de Suscripciones",
  description: "Automatiza renovaciones, pagos recurrentes y comunicaciones para maximizar la retención de clientes.",

  features: {
    pagos_facturacion: [
      "Cobros recurrentes programados (SaaS, membresías)",
      "Confirmaciones de pago inmediatas",
      "Comprobantes digitales y facturación electrónica",
      "Soporte multi-moneda y pasarelas globales (Stripe, PayPal)",
      "Gestión de periodos de prueba y cupones de descuento",
    ],
    renovaciones_reintentos: [
      "Renovaciones automáticas de contratos",
      "Recordatorios automáticos de vencimiento antes del cobro",
      "Sistema de dunning (reintentos ante tarjetas rechazadas)",
      "Actualización inteligente de tarjetas de crédito expiradas",
    ],
    gestion_retencion: [
      "Notificaciones por correo sobre cambios de estado",
      "Seguimiento del estado (Activa, Pausada, Cancelada, Mora)",
      "Portal de autogestión para actualización de datos",
    ],
  },

  stats: [
    { value: "KPIs", label: "Métricas de MRR, ARR y Churn Rate" },
    { value: "Historial", label: "Detalle de transacciones pasadas" },
    { value: "-80%", label: "Reducción de tareas manuales" },
    { value: "100%", label: "Automatización de cobros" },
  ],
};

// 4. INVENTARIO (Balanceado: 3 Features + 1 Analítica/Reportes en Stats = 4)
export const STOCK_FLOW = {
  id: "stock",
  icon: PackageX,
  title: "Control Inteligente de Inventario",
  description: "Supervisa existencias en tiempo real y evita pérdidas por falta de stock mediante alertas automáticas.",

  features: {
    monitoreo_trazabilidad: [
      "Monitoreo en tiempo real de existencias",
      "Control avanzado por sucursales y múltiples almacenes",
      "Historial de movimientos completo (entradas, salidas)",
      "Trazabilidad por número de serie, lote y caducidad",
      "Escaneo e integración con códigos de barra y QR",
    ],
    alertas_criticas: [
      "Alertas de stock mínimo y desabastecimiento",
      "Notificaciones automáticas al equipo de compras",
      "Seguimiento de productos críticos o de alta rotación",
      "Predicción de quiebre de stock basada en tendencias",
    ],
    abastecimiento_logistica: [
      "Reposición programada con órdenes de compra automáticas",
      "Gestión de proveedores y tiempos de entrega (Lead time)",
      "Ajustes de inventario manuales justificados con permisos",
    ],
  },

  stats: [
    { value: "Auditorías", label: "Reportes automáticos de stock" },
    { value: "Valoración", label: "Cálculo de costo de inventario" },
    { value: "Live", label: "Actualización en tiempo real" },
    { value: "-90%", label: "Riesgo de quiebre de stock" },
  ],
};

// 5. ALERTAS Y NOTIFICACIONES (Balanceado: 3 Features + 1 Historial en Stats = 4)
export const ALERTS_FLOW = {
  id: "alerts",
  icon: BellRing,
  title: "Alertas Inteligentes",
  description: "Mantén informado a tu equipo con notificaciones automáticas sobre eventos importantes del negocio.",

  features: {
    tipos_alerta: [
      "Alertas de inventario (Stock bajo, productos vencidos)",
      "Avisos de pagos pendientes o suscripciones vencidas",
      "Notificaciones de suscripciones nuevas o canceladas",
      "Alertas de seguridad (Bloqueos, accesos anómalos)",
      "Eventos críticos del sistema (Caídas, fallas de API)",
    ],
    canales_omnichannel: [
      "Notificaciones push en tiempo real dentro de la app",
      "Correos automáticos de alerta inmediata",
      "Integración con webhooks (Slack, Discord, Teams)",
      "Alertas SMS urgentes para eventos críticos",
    ],
    gestion_resolucion: [
      "Seguimiento y asignación de incidencias al equipo",
      "Panel de control centralizado para mitigar alertas",
      "Configuración de niveles de prioridad (Baja a Crítica)",
    ],
  },

  stats: [
    { value: "Logs", label: "Historial y tiempos de resolución" },
    { value: "< 1 min", label: "Tiempo estimado de aviso" },
    { value: "24/7", label: "Monitoreo constante" },
    { value: "100%", label: "Procesamiento automatizado" },
  ],
};

// 6. MOTOR DE AUTOMATIZACIONES (Balanceado: 3 Features + 1 Rendimiento en Stats = 4)
export const AUTOMATIONS_FLOW = {
  id: "automations",
  icon: Cpu,
  title: "Motor de Automatizaciones",
  description: "Diseña, conecta y ejecuta flujos de trabajo personalizados basados en eventos y condiciones complejas.",

  features: {
    disparadores_y_triggers: [
      "Triggers basados en eventos (registro, pago fallido)",
      "Disparadores programados por tiempo (Cron jobs)",
      "Monitoreo de Webhooks entrantes de apps externas",
      "Condicionales avanzados mediante operadores lógicos",
    ],
    constructor_flujos: [
      "Editor visual de flujos de trabajo interactivo",
      "Manejo de retrasos y esperas temporales",
      "Ejecución multi-acción consecutiva o paralela",
      "Plantillas preconfiguradas para flujos comunes",
    ],
    monitoreo_ejecucion: [
      "Historial detallado de ejecuciones y tareas",
      "Manejo automático de reintentos en pasos fallidos",
    ],
  },

  stats: [
    { value: "Performance", label: "Métricas de tiempo de ejecución" },
    { value: "Alertas", label: "Avisos ante fallas en los flujos" },
    { value: "Instant", label: "Tiempo real de respuesta" },
    { value: "10k+", label: "Tareas procesadas por minuto" },
  ],
};

// TODOS LOS FLUJOS ACTUALIZADOS
export const FLOWS = [EMAIL_FLOW, SECURITY_FLOW, SUBSCRIPTION_FLOW, STOCK_FLOW, ALERTS_FLOW, AUTOMATIONS_FLOW];
