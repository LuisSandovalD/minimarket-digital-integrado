import { ModernButton } from "@/components/buttons";
import { MetricCard } from "@/components/card";
import {
  defaultViewport,
  fadeScale,
  fadeUp,
  hoverLift,
  smoothTransition,
  springTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, MapPin, Plus, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLatestTestimonials, getTestimonials } from "../services/testimonial.service";

// Genera iniciales a partir del nombre del usuario (ej. "Claudio Rossi" -> "CR")
const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export default function TestimonialsSection() {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchInitialTestimonials = async () => {
      setLoading(true);
      const data = await getLatestTestimonials(10);
      setTestimonials(data || []);
      setLoading(false);
    };
    fetchInitialTestimonials();
  }, []);

  // EFECTO DE AUTOPLAY (SCROLL AUTOMÁTICO CÍCLICO)
  useEffect(() => {
    if (loading || testimonials.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/immutability
      scroll("right");
    }, 4000);

    return () => clearInterval(interval);
  }, [loading, testimonials, isHovered]);

  // FUNCIÓN RESTAURADA Y PROTEGIDA
  const handleLoadAll = async () => {
    setLoadingMore(true);
    const data = await getTestimonials();
    setTestimonials(data || []);
    setIsShowingAll(true);
    setLoadingMore(false);
  };

  // LÓGICA DE SCROLL CÍCLICO INFINITO
  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const el = sliderRef.current;
    const scrollAmount = 380;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    if (direction === "left") {
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else {
      if (el.scrollLeft >= maxScrollLeft - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 py-24 sm:px-6 md:px-8 lg:px-10 z-10">
      <div className="mx-auto  w-full flex flex-col items-center">
        {/* ENCABEZADO TOTALMENTE CENTRADO */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ ...defaultViewport, once: true }}
          className="flex flex-col items-center text-center gap-4 max-w-3xl transform-gpu"
        >
          {/* Badge Dinámico */}
          <motion.div
            variants={fadeScale}
            transition={springTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1] backdrop-blur-xl shadow-inner"
          >
            <BadgeCheck size={14} />
            Clientes satisfechos
          </motion.div>

          {/* Título Estilizado Centrado */}
          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="text-balance text-3xl font-black tracking-tight text-[#0f172a] dark:text-white sm:text-4xl lg:text-5xl"
          >
            Empresas que ya{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              optimizan su negocio
            </span>
          </motion.h2>

          {/* Descripción Centrada */}
          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="text-pretty text-base leading-relaxed text-slate-600 dark:text-[#cbd5e1] max-w-2xl"
          >
            Controla inventario, ventas, reportes y múltiples sucursales desde una sola plataforma.
          </motion.p>

          {/* BOTONES DE NAVEGACIÓN CENTRADOS ABAJO DEL ENCABEZADO */}
          {testimonials.length > 0 && (
            <motion.div variants={fadeScale} transition={springTransition} className="flex items-center gap-2 mt-4">
              <ModernButton
                variant="outline"
                size="md"
                text=""
                icon={ChevronLeft}
                onClick={() => scroll("left")}
                className="!border-slate-200 bg-slate-50 text-[#0f172a] hover:bg-slate-100 dark:!border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              />
              <ModernButton
                variant="outline"
                size="md"
                text=""
                icon={ChevronRight}
                onClick={() => scroll("right")}
                className="!border-slate-200 bg-slate-50 text-[#0f172a] hover:bg-slate-100 dark:!border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              />
            </motion.div>
          )}
        </motion.div>

        {/* ZONA DE CONTENIDO DINÁMICO */}
        {loading ? (
          <div className="mt-12 flex h-40 items-center justify-center">
            <span className="animate-pulse text-sm font-bold text-[#274c77] dark:text-[#6096ba]">
              Cargando testimonios...
            </span>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mt-12 flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-400 dark:border-white/10 dark:text-dark-foreground/50">
            No hay testimonios disponibles en este momento.
          </div>
        ) : (
          /* SLIDER HORIZONTAL CON ANCHO COMPLETO Y MÁSCARA PREMIUM */
          <div
            ref={sliderRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-12 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-4 transform-gpu [&::-webkit-scrollbar]:hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_4%,_black_96%,transparent_100%)]"
          >
            {testimonials.map((item, index) => (
              <motion.article
                key={item.id || index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...smoothTransition,
                  delay: Math.min(index * 0.05, 0.3),
                }}
                whileHover={hoverLift}
                className="min-w-[300px] max-w-[300px] snap-center sm:min-w-[350px] sm:max-w-[350px] transform-gpu will-change-transform"
              >
                <MetricCard
                  variant="transparent"
                  icon={Quote}
                  label={item.user?.name || "Usuario del Sistema"}
                  className="h-full border border-slate-200/70 bg-slate-50/40 backdrop-blur-md !p-6 rounded-2xl transition-all duration-300 hover:bg-slate-50/80 hover:border-[#6096ba]/30 shadow-sm hover:shadow-md dark:!border-white/5 dark:bg-white/[0.01] dark:hover:bg-white/[0.03] dark:hover:border-white/10"
                >
                  <div className="-mt-6 text-left">
                    {/* CALIFICACIÓN DE ESTRELLAS */}
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: Number(item.rating) || 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>

                    {/* TEXTO DEL COMENTARIO */}
                    <p className="line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-[#cbd5e1]">
                      “{item.comment}”
                    </p>

                    {/* METADATA E IDENTIDAD DEL USUARIO */}
                    <div className="mt-5 flex items-center gap-3 border-t border-slate-100 dark:border-white/5 pt-4">
                      {item.user?.avatar ? (
                        <img
                          src={item.user.avatar}
                          alt={item.user?.name || "Usuario"}
                          className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-white/10"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200/60 text-xs font-bold text-[#274c77] dark:bg-white/5 dark:border-white/5 dark:text-[#a3cef1]">
                          {getInitials(item.user?.name)}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <span className="block text-xs font-bold text-slate-900 dark:text-white">
                          {item.user?.name || "Usuario del Sistema"}
                        </span>
                        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 dark:text-dark-foreground/40">
                          <MapPin size={11} className="text-[#274c77] dark:text-[#6096ba]" />
                          <span>Verificado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </MetricCard>
              </motion.article>
            ))}

            {/* BOTÓN EXTRA: VER TODOS */}
            {!isShowingAll && testimonials.length >= 10 && (
              <div className="min-w-[300px] max-w-[300px] snap-center sm:min-w-[350px] sm:max-w-[350px] transform-gpu">
                <ModernButton
                  variant="outline"
                  loading={loadingMore}
                  onClick={handleLoadAll}
                  icon={Plus}
                  text="Ver todos"
                  className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border-dashed border-slate-200 bg-slate-50/30 p-5 hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.01] dark:hover:border-white/20 dark:hover:bg-white/[0.03]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
