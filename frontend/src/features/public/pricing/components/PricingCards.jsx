import { ModernButton } from "@/components/buttons";
import { isAuthenticated } from "@/features/auth/services/session.service";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { plans } from "../constants/plans";

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { setOpenLogin, setOpenRegister } = useOutletContext() || {};
  const isLogged = isAuthenticated();

  return (
    <div className="w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Selector de periodo Facturación */}
      <div className="flex justify-center items-center gap-4 mb-16 bg-transparent">
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${!isAnnual ? "text-slate-900 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
        >
          Mensual
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="w-12 h-6 bg-slate-200 dark:bg-slate-800 rounded-full p-1 relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
          aria-label="Cambiar periodo de facturación"
        >
          <div
            className="w-4 h-4 bg-slate-700 dark:bg-slate-300 rounded-full transition-transform duration-200 ease-out"
            style={{ transform: `translateX(${isAnnual ? "24px" : "0px"})` }}
          />
        </button>
        <span
          className={`text-sm font-semibold flex items-center gap-1.5 transition-colors duration-200 ${isAnnual ? "text-slate-900 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
        >
          Anual{" "}
          <span className="text-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-2 py-0.5 rounded-full font-bold">
            Ahorra 20%
          </span>
        </span>
      </div>

      {/* Contenedor Grid transparente */}
      <div className="grid gap-8 lg:grid-cols-3 items-center max-w-none bg-transparent">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const currentPrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;
          const isFree = plan.id === "FREE";

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ease-out transform hover:-translate-y-2 ${plan.isPopular ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-xl lg:py-12 border border-slate-800 dark:border-slate-200 z-10 scale-100 lg:scale-105 hover:shadow-2xl" : "bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-900 dark:text-slate-50 lg:py-6 scale-100 lg:scale-95 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"}`}
            >
              {/* Distintivo flotante para el plan central */}
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black tracking-widest uppercase px-3.5 py-1 rounded-full shadow-md flex items-center gap-1 z-20 border border-slate-800 dark:border-slate-200">
                  <Sparkles size={10} className="text-amber-400 dark:text-amber-500" /> Más Recomendado
                </span>
              )}

              <div className="bg-transparent">
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-center gap-3 mb-4 bg-transparent">
                  <div
                    className={`p-2 rounded-xl transition-colors duration-200 ${plan.isPopular ? "bg-slate-800 text-slate-300 dark:bg-slate-200 dark:text-slate-800" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="bg-transparent">
                    <h3 className="text-lg font-bold tracking-tight">{plan.name}</h3>
                    <p
                      className={`text-xs transition-colors duration-200 ${plan.isPopular ? "text-slate-400 dark:text-slate-500 font-semibold" : "text-slate-500 dark:text-slate-400 font-medium"}`}
                    >
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm mt-2 leading-relaxed transition-colors duration-200 ${plan.isPopular ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {plan.description}
                </p>

                {/* Precios */}
                <div className="mt-6 flex items-baseline gap-1 overflow-hidden h-10 bg-transparent">
                  {isFree ? (
                    <span className="text-4xl font-black tracking-tight block">Gratis</span>
                  ) : (
                    <div className="flex items-baseline gap-1 bg-transparent">
                      <span className="text-4xl font-black tracking-tight">S/ {currentPrice}</span>
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">/mes</span>
                    </div>
                  )}
                </div>

                {/* Nota de facturación */}
                <div className="h-5 mt-1 overflow-hidden bg-transparent">
                  {isAnnual && !isFree && (
                    <p
                      className={`text-xs font-semibold ${plan.isPopular ? "text-slate-400 dark:text-slate-500" : "text-emerald-500 dark:text-emerald-600"}`}
                    >
                      S/ {currentPrice * 12} facturado al año
                    </p>
                  )}
                  {isFree && (
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Sin tarjeta de crédito</p>
                  )}
                </div>

                <hr
                  className={`my-6 transition-colors duration-200 ${plan.isPopular ? "border-slate-800 dark:border-slate-200" : "border-slate-200 dark:border-slate-800"}`}
                />

                {/* Lista de Características */}
                <ul className="space-y-3 bg-transparent">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-transparent">
                      <Check
                        size={16}
                        className={`shrink-0 mt-0.5 ${plan.isPopular ? "text-slate-200 dark:text-slate-800" : "text-slate-600 dark:text-slate-400"}`}
                      />
                      <span
                        className={`text-sm leading-normal transition-colors duration-200 ${plan.isPopular ? "text-slate-300 dark:text-slate-600" : "text-slate-600 dark:text-slate-400"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón(es) de Acción */}
              <div className="mt-8 relative z-20 bg-transparent">
                {isLogged ? (
                  <ModernButton
                    text={isFree ? "Ir al Dashboard" : `Cambiar al ${plan.name}`}
                    onClick={() => {
                      if (isFree) {
                        window.location.href = "/dashboard";
                      } else if (plan.onSelect) {
                        plan.onSelect();
                      }
                    }}
                    variant={plan.isPopular ? "primary" : "secondary"}
                    size="lg"
                    fullWidth
                  />
                ) : isFree ? (
                  <ModernButton
                    text="Iniciar Sesión Gratis"
                    onClick={() => {
                      if (setOpenRegister) setOpenRegister(false);
                      if (setOpenLogin) setOpenLogin(true);
                    }}
                    variant="secondary"
                    size="lg"
                    fullWidth
                  />
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <ModernButton
                      text="Registrarse"
                      onClick={() => {
                        if (setOpenLogin) setOpenLogin(false);
                        if (setOpenRegister) setOpenRegister(true);
                      }}
                      variant={plan.isPopular ? "primary" : "secondary"}
                      size="lg"
                      fullWidth
                    />
                    <ModernButton
                      text="Identificarse"
                      onClick={() => {
                        if (setOpenRegister) setOpenRegister(false);
                        if (setOpenLogin) setOpenLogin(true);
                      }}
                      variant="secondary"
                      size="lg"
                      fullWidth
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
