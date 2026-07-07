// constants/pos.js
import { CreditCard, QrCode, ShieldCheck, Zap } from "lucide-react";

export const posFeatures = [
    {
        title: "Pagos digitales",
        description: "Tarjetas y billeteras.",
        icon: CreditCard,
        color: "bg-[#274c77]",
    },
    {
        title: "QR y tickets",
        description: "Cobros rápidos.",
        icon: QrCode,
        color: "bg-[#6096ba]",
    },
    {
        title: "Transacciones seguras",
        description: "Cifrado de extremo a extremo.",
        icon: ShieldCheck,
        color: "bg-[#274c77]",
    },
    {
        title: "Alta velocidad",
        description: "Procesamiento en milisegundos.",
        icon: Zap,
        color: "bg-[#6096ba]",
    },
];
