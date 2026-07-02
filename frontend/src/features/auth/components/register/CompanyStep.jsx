// ========================================
// components/auth/CompanyStep.jsx
// ========================================

import { Input } from "@/components/forms";
import {
  Building2,
  Check,
  CreditCard,
  Globe,
  Info,
  MapPin,
  ReceiptText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { plans } from "../../constants/plans";
import PlanComparisonModal from "./PlanComparisonModal";

export default function CompanyStep({ form, handleChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentTier = form.subscriptionTier || "FREE";

  useEffect(() => {
    if (!form.subscriptionTier) {
      handleChange({
        target: {
          name: "subscriptionTier",
          value: "FREE",
        },
      });
    }
  }, [form.subscriptionTier, handleChange]);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Razón Social y RUC */}
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Empresa / Razón Social"
          name="companyName"
          placeholder="Mi Empresa SAC"
          value={form.companyName || ""}
          onChange={handleChange}
          icon={Building2}
          required
        />

        <Input
          label="RUC (Opcional)"
          name="companyRuc"
          placeholder="12345678901"
          value={form.companyRuc || ""}
          onChange={handleChange}
          icon={ReceiptText}
        />
      </div>

      {/* Dirección Fiscal */}
      <Input
        label="Dirección Fiscal / Legal"
        name="companyAddress"
        placeholder="Av. Principal 123"
        value={form.companyAddress || ""}
        onChange={handleChange}
        icon={MapPin}
      />

      {/* Sitio Web */}
      <Input
        label="Sitio Web Comercial"
        name="companyWebsite"
        placeholder="https://empresa.com"
        value={form.companyWebsite || ""}
        onChange={handleChange}
        icon={Globe}
      />

      {/* ======================================
          PLAN DE SUSCRIPCIÓN
      ====================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-200">
            Plan de Suscripción Comercial
          </label>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors focus:outline-none"
          >
            <Info className="w-3.5 h-3.5" />
            Comparar características
          </button>
        </div>

        {/* Rejilla de Tarjetas de Planes */}
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = currentTier === plan.value;
            const isPaidPlan = plan.value !== "FREE";

            return (
              <button
                key={plan.value}
                type="button"
                onClick={() =>
                  handleChange({
                    target: {
                      name: "subscriptionTier",
                      value: plan.value,
                    },
                  })
                }
                className={`
                  relative rounded-2xl border p-5 text-left transition-all duration-200 outline-none flex flex-col justify-between min-h-[145px] w-full group
                  ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg ring-2 ring-slate-950 ring-offset-2 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-950 dark:ring-offset-slate-900"
                      : "border-slate-200 bg-white/50 text-slate-700 hover:border-slate-400 dark:border-white/10 dark:bg-white/[0.02] dark:text-slate-300 dark:hover:border-white/30"
                  }
                `}
              >
                <div className="w-full flex flex-col justify-between h-full space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base leading-tight">
                        {plan.label}
                      </h3>
                      {isPaidPlan && (
                        <span
                          className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase ${
                            isSelected
                              ? "bg-indigo-500/30 text-indigo-200 dark:bg-indigo-100 dark:text-indigo-600"
                              : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                          }`}
                        >
                          30 días gratis
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 dark:bg-slate-950 dark:text-white shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected
                        ? "text-slate-300 dark:text-slate-600"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================
            🌟 MODIFICACIÓN COMPLETA DE BANNERS INFORMATIVOS
           ========================================================= */}
        <div
          className={`mt-3 p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
            currentTier !== "FREE"
              ? "border-indigo-100 bg-indigo-50/50 text-indigo-900 dark:border-indigo-950/30 dark:bg-indigo-950/10 dark:text-indigo-300"
              : "border-slate-100 bg-slate-50/50 text-slate-600 dark:border-slate-800/50 dark:bg-slate-900/20 dark:text-slate-400"
          }`}
        >
          {currentTier !== "FREE" ? (
            <>
              <CreditCard className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
              <p className="text-xs leading-normal">
                ¡Has seleccionado una prueba de{" "}
                <strong>30 días sin tarjeta</strong>! Al completar tu registro,
                se activará tu acceso inmediato al Plan{" "}
                <strong>{currentTier}</strong>. Podrás utilizar todas las
                herramientas del sistema sin restricciones. No se requiere
                ninguna pasarela de pago hoy; podrás decidir si continuar al
                finalizar tu periodo de prueba.
              </p>
            </>
          ) : (
            <>
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
              <p className="text-xs leading-normal">
                Estás seleccionando nuestro <strong>Plan Gratuito</strong>. No
                requiere tarjetas ni renovaciones obligatorias. Podrás utilizar
                el sistema de forma indefinida inmediatamente tras completar tu
                registro.
              </p>
            </>
          )}
        </div>
      </div>

      <PlanComparisonModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
