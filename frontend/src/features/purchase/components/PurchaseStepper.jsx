// ============================================================================
// features/purchase/components/PurchaseStepper.jsx
// MODERNO Y ESTANDARIZADO: Indicador de progreso secuencial (3 Pasos de Compra)
// ============================================================================

import { Building2, Check, ClipboardList, Package } from "lucide-react";

export default function PurchaseStepper({ currentStep = 1 }) {
  // Reducido a los 3 pasos reales del ciclo de compras unificado con Ventas
  const steps = [
    {
      label: "Proveedor",
      icon: Building2,
    },
    {
      label: "Productos",
      icon: Package,
    },
    {
      label: "Resumen",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              {/* NODE WRAPPER */}
              <div className="flex flex-col items-center relative z-10">
                {/* ICON CONTAINER CARD */}
                <div
                  className={`
                    flex
                    items-center
                    justify-center
                    h-10
                    w-10
                    rounded-xl
                    border
                    transition-all
                    duration-300
                    ${
                      isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : isActive
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={3} className="animate-in fade-in zoom-in duration-200" />
                  ) : (
                    <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  )}
                </div>

                {/* TEXT LABEL */}
                <span
                  className={`
                    mt-2.5
                    text-[11px]
                    font-semibold
                    tracking-wide
                    transition-colors
                    duration-200
                    ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : isCompleted
                          ? "text-slate-800 dark:text-slate-200"
                          : "text-slate-400 dark:text-slate-500"
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* DYNAMIC CONNECTOR LINE */}
              {index < steps.length - 1 && (
                <div className="flex-1 px-4 -mt-6">
                  <div className="h-[2px] w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`
                        h-full
                        transition-all
                        duration-500
                        ease-out
                        ${
                          isCompleted
                            ? "w-full bg-emerald-500"
                            : currentStep === stepNumber + 1
                              ? "w-full bg-blue-600"
                              : "w-0 bg-transparent"
                        }
                      `}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
