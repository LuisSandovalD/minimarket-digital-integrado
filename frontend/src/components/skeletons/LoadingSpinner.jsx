// ========================================
// components/LoadingSpinner.jsx
// ========================================

import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "md", text = "Cargando...", fullScreen = false, variant = "primary" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const colors = {
    primary: "text-[#274c77] dark:text-[#a3cef1]",
    blue: "text-blue-600 dark:text-blue-400",
    slate: "text-slate-600 dark:text-slate-400",
    white: "text-white",
  };

  // Contenido base sin contenedores, bordes, padding ni fondos intermedios
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <Loader2
        className={`
          ${sizeClasses[size]}
          ${colors[variant]}
          animate-spin
          shrink-0
        `}
        strokeWidth={2.5}
      />

      {text && (
        <p
          className={`
            ${textSizes[size]}
            font-medium
            text-slate-600
            dark:text-slate-300
          `}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Si es fullScreen, se expande en toda la pantalla de forma transparente
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent backdrop-blur-sm">
        {spinnerContent}
      </div>
    );
  }

  // Si no es fullScreen, se adapta al contenedor padre ocupando todo su espacio de manera transparente
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      {spinnerContent}
    </div>
  );
}
