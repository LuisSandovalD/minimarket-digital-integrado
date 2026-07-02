import { ModernButton } from "@/components/buttons";
import { isAuthenticated } from "@/features/auth/services/session.service";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { plans } from "../constants/plans";

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Consumimos las funciones del PublicLayout para abrir los modales correspondientes
  const { setOpenLogin, setOpenRegister } = useOutletContext() || {};
  const isLogged = isAuthenticated();

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      {/* Selector de periodo Facturación */}
      <div className="flex justify-center items-center gap-4 mb-16 bg-transparent">
        <span
          className={`text-sm font-semibold transition-colors duration-300 ${!isAnnual ? "text-slate-900 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
        >
          Mensual
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="w-12 h-6 bg-slate-200 dark:bg-slate-800 rounded-full p-1 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
          aria-label="Cambiar periodo de facturación"
        >
          <motion.div
            className="w-4 h-4 bg-slate-700 dark:bg-slate-300 rounded-full"
            animate={{ x: isAnnual ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span
          className={`text-sm font-semibold flex items-center gap-1.5 transition-colors duration-300 ${isAnnual ? "text-slate-900 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}`}
        >
          Anual{" "}
          <span className="text-xs bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-2 py-0.5 rounded-full font-bold shadow-sm backdrop-blur-md">
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
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{
                y: -8,
                scale: plan.isPopular ? 1.05 : 0.98,
                boxShadow: plan.isPopular
                  ? "0 30px 60px -15px rgba(0,0,0,0.3)"
                  : "0 20px 40px -15px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`relative flex flex-col justify-between rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 ${plan.isPopular ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-2xl lg:py-12 border border-slate-800 dark:border-slate-200 z-10 scale-100 lg:scale-105" : "bg-slate-50/90 border border-slate-200 dark:bg-slate-900/40 dark:border-slate-800 text-slate-900 dark:text-slate-50 lg:py-6 scale-100 lg:scale-95 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"}`}
            >
              {/* Distintivo flotante para el plan central */}
              {plan.isPopular && (
                <motion.span
                  initial={{ opacity: 0, y: -10, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  className="absolute -top-3.5 left-1/2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black tracking-widest uppercase px-3.5 py-1 rounded-full shadow-md flex items-center gap-1 z-20 border border-slate-800 dark:border-slate-200"
                >
                  <Sparkles
                    size={10}
                    className="text-amber-400 dark:text-amber-500"
                  />{" "}
                  Más Recomendado
                </motion.span>
              )}

              {plan.isPopular && (
                <div className="absolute inset-0 -z-20 bg-slate-500/5 dark:bg-slate-400/5 rounded-3xl blur-2xl pointer-events-none" />
              )}

              <div className="bg-transparent">
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-center gap-3 mb-4 bg-transparent">
                  <div
                    className={`p-2 rounded-xl transition-colors duration-300 ${plan.isPopular ? "bg-slate-800 text-slate-300 dark:bg-slate-200 dark:text-slate-800" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="bg-transparent">
                    <h3 className="text-lg font-bold tracking-tight">
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs transition-colors duration-300 ${plan.isPopular ? "text-slate-400 dark:text-slate-500 font-semibold" : "text-slate-500 dark:text-slate-400 font-medium"}`}
                    >
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm mt-2 leading-relaxed transition-colors duration-300 ${plan.isPopular ? "text-slate-300 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {plan.description}
                </p>

                {/* Precios */}
                <div className="mt-6 flex items-baseline gap-1 overflow-hidden h-10 bg-transparent">
                  <AnimatePresence mode="wait">
                    {isFree ? (
                      <motion.span
                        key="free"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.15 }}
                        className="text-4xl font-black tracking-tight block"
                      >
                        Gratis
                      </motion.span>
                    ) : (
                      <motion.div
                        key={currentPrice}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-baseline gap-1 bg-transparent"
                      >
                        <span className="text-4xl font-black tracking-tight">
                          S/ {currentPrice}
                        </span>
                        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                          /mes
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nota de facturación */}
                <div className="h-5 mt-1 overflow-hidden bg-transparent">
                  <AnimatePresence mode="wait">
                    {isAnnual && !isFree && (
                      <motion.p
                        key="annual-billing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className={`text-xs font-semibold ${plan.isPopular ? "text-slate-400 dark:text-slate-500" : "text-emerald-500 dark:text-emerald-600"}`}
                      >
                        S/ {currentPrice * 12} facturado al año
                      </motion.p>
                    )}
                    {isFree && (
                      <motion.p
                        key="free-billing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs font-semibold text-slate-400 dark:text-slate-500"
                      >
                        Sin tarjeta de crédito
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <hr
                  className={`my-6 transition-colors duration-300 ${plan.isPopular ? "border-slate-800 dark:border-slate-200" : "border-slate-200 dark:border-slate-800"}`}
                />

                {/* Lista de Características */}
                <ul className="space-y-3 bg-transparent">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 bg-transparent"
                    >
                      <Check
                        size={16}
                        className={`shrink-0 mt-0.5 ${plan.isPopular ? "text-slate-200 dark:text-slate-800" : "text-slate-600 dark:text-slate-400"}`}
                      />
                      <span
                        className={`text-sm leading-normal transition-colors duration-300 ${plan.isPopular ? "text-slate-300 dark:text-slate-600" : "text-slate-600 dark:text-slate-400"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón(es) de Acción Inteligentes */}
              <div className="mt-8 relative z-20 bg-transparent">
                {isLogged ? (
                  /* CASO 1: EL USUARIO YA ESTÁ LOGUEADO (Cambio de suscripción directo) */
                  <ModernButton
                    text={
                      isFree ? "Ir al Dashboard" : `Cambiar al ${plan.name}`
                    }
                    onClick={() => {
                      if (isFree) {
                        window.location.href = "/dashboard";
                      } else if (plan.onSelect) {
                        plan.onSelect();
                      } else {
                        console.log(
                          `Cambiando sesión actual al plan: ${plan.id}`,
                        );
                      }
                    }}
                    variant={plan.isPopular ? "primary" : "secondary"}
                    size="lg"
                    fullWidth
                  />
                ) : isFree ? (
                  /* CASO 2: PLAN FREE + USUARIO NO LOGUEADO (Solo requiere Iniciar Sesión) */
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
                  /* CASO 3: PLANES DE PAGO + USUARIO NO LOGUEADO (Registrarse con Checkout o Loguearse) */
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <ModernButton
                      text="Registrarse"
                      onClick={() => {
                        if (setOpenLogin) setOpenLogin(false);
                        if (setOpenRegister) setOpenRegister(true);
                        console.log(
                          `Flujo de registro para adquirir: ${plan.id}`,
                        );
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
