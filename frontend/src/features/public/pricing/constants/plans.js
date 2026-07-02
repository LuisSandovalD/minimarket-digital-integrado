// plans.config.js o dentro de tu componente de Pricing
import { Cpu, LayoutDashboard, Store } from "lucide-react";

export const plans = [
    {
        id: "FREE",
        name: "Plan FREE",
        tagline: "Digitalización Base",
        priceMonthly: 0, // antes: 10 — un plan FREE no puede cobrar
        priceAnnual: 0, // antes: 8  — idem
        description:
            "Ideal para bodegas independientes y pequeños comercios locales que empiezan.",
        icon: LayoutDashboard,
        features: [
            "1 Sucursal Física única",
            "Punto de Venta POS Esencial",
            "Control de Stock básico",
            "Gestión de Clientes y Proveedores",
            "Alertas de Stock mínimo",
        ],
        buttonText: "Comenzar Gratis",
        isPopular: false,
    },
    {
        id: "BASIC",
        name: "Plan BASIC",
        tagline: "Crecimiento Comercial",
        priceMonthly: 49,
        priceAnnual: 39,
        description:
            "Diseñado para negocios en expansión que manejan múltiples sedes o almacenes.",
        icon: Store,
        features: [
            "Todo lo incluido en el Plan FREE",
            "Sucursales Ilimitadas",
            "Reportes y Exportación (Excel/PDF)",
            "Estadísticas Visuales y Gráficos",
            "Movimientos Kárdex Avanzados",
            "Órdenes de Compra y Proveedores",
            "Generador de Códigos de Barras",
        ],
        buttonText: "Elegir Plan Basic",
        isPopular: true, // El del medio sobresale
    },
    {
        id: "PREMIUM",
        name: "Plan PREMIUM",
        tagline: "Corporativo e Inteligente",
        priceMonthly: 99,
        priceAnnual: 79,
        description:
            "Para empresas exigentes que buscan automatización inteligente y resguardo crítico.",
        icon: Cpu,
        features: [
            "Todo lo incluido en el Plan BASIC",
            "Asistente IA (Gemini integrado)",
            "Analítica de Negocio Avanzada",
            "Copias de Seguridad automáticas",
            "Descarga completa de Base de Datos",
            "Soporte prioritario 24/7",
        ],
        buttonText: "Obtener Todo el Poder",
        isPopular: false,
    },
];
