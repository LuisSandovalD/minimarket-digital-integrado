// ========================================
// features/purchase/components/PurchaseStepper.jsx
// ========================================

import { Building2, CheckCircle, ClipboardList, Package } from "lucide-react";

export default function PurchaseStepper({ currentStep }) {
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
    {
      label: "Confirmar",
      icon: CheckCircle,
    },
  ];

  return (
    <div
      className="
        px-6
        py-5
      "
    >
      <div className="flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isCompleted = stepNumber < currentStep;

          const isActive = stepNumber === currentStep;

          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="
                flex
                items-center
                flex-1
                last:flex-none
              "
            >
              <div
                className="
                  flex
                  flex-col
                  items-center
                "
              >
                {/* STEP */}

                <div
                  className={`
                    relative

                    flex
                    items-center
                    justify-center

                    h-11
                    w-11

                    rounded-2xl

                    border

                    transition-all
                    duration-300

                    ${
                      isCompleted
                        ? `
                          bg-emerald-500/10
                          border-emerald-500/20

                          text-emerald-600
                          dark:text-emerald-400
                        `
                        : isActive
                          ? `
                            bg-blue-500/10
                            border-blue-500/20

                            text-blue-600
                            dark:text-blue-400

                            shadow-lg
                            shadow-blue-500/10
                          `
                          : `
                            bg-white/60
                            dark:bg-slate-900/60

                            border-slate-200
                            dark:border-slate-800

                            text-slate-400
                            dark:text-slate-600
                          `
                    }
                  `}
                >
                  {isCompleted ? <CheckCircle size={18} /> : <Icon size={18} />}
                </div>

                {/* LABEL */}

                <span
                  className={`
                    mt-3

                    text-[11px]
                    font-medium

                    tracking-wide

                    transition-colors

                    ${
                      isActive
                        ? `
                          text-blue-600
                          dark:text-blue-400
                        `
                        : isCompleted
                          ? `
                            text-slate-800
                            dark:text-slate-200
                          `
                          : `
                            text-slate-400
                            dark:text-slate-600
                          `
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* CONNECTOR */}

              {index < steps.length - 1 && (
                <div className="flex-1 px-3">
                  <div
                    className={`
                      h-px
                      w-full

                      transition-all
                      duration-300

                      ${
                        isCompleted
                          ? "bg-emerald-500/40"
                          : "bg-slate-200 dark:bg-slate-800"
                      }
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
