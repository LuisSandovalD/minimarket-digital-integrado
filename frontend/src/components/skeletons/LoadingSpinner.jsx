// ========================================
// components/LoadingSpinner.jsx
// ========================================
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = "md",
  text = "Cargando...",
  fullScreen = false,
  variant = "primary",
}) {
  // Configuración de tamaños para el icono
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  // Configuración de tamaños para el texto
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  // Colores de la marca basados en tu paleta de Login
  const colors = {
    primary: "text-[#274c77] dark:text-[#a3cef1]",
    blue: "text-blue-600 dark:text-blue-400",
    slate: "text-slate-600 dark:text-slate-400",
    white: "text-white",
  };

  // Estructura base del componente
  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3 p-4 animate-fadeIn">
      {/* El truco de la vuelta está en la clase "animate-spin" de Tailwind */}
      <Loader2
        className={`${sizeClasses[size]} ${colors[variant]} animate-spin shrink-0`}
      />
      {text && (
        <p
          className={`${textSizes[size]} font-semibold tracking-wide text-slate-500 dark:text-slate-400 animate-pulse`}
        >
          {text}
        </p>
      )}
    </div>
  );

  // Si se pide pantalla completa (por ejemplo para bloqueos de rutas o cargas iniciales)
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-slate-950/70">
        {spinnerContent}
      </div>
    );
  }

  // De lo contrario, se renderiza normal en el contenedor donde lo metas
  return spinnerContent;
}
