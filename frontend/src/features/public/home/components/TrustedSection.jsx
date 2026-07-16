import { fadeUp, hoverLift, smoothTransition, staggerContainer } from "@/components/effects";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Sparkles } from "lucide-react";
import { SECTOR_GALLERY, TRUSTED_LOGOS } from "../constants/homeData.js";

export default function TrustedSection() {
  // Duplicamos el array para lograr el bucle infinito horizontal sin saltos ópticos
  const duplicatedLogos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS];

  return (
    <section className="relative overflow-hidden bg-dark text-dark-foreground px-4 py-24 sm:px-6 md:px-8 lg:px-10 z-10">
      {/* Luz ambiental de fondo reactiva al tema */}
      <div className="pointer-events-none absolute inset-0 -z-10 transform-gpu opacity-40 dark:opacity-25 transition-opacity">
        <div className="absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#6096ba]/10 dark:bg-primary/10 blur-[150px]" />
        <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-[#274c77]/10 blur-[120px]" />
      </div>

      <div className="mx-auto  w-full flex-1 flex flex-col justify-between gap-16">
        {/* ================= HEADER CENTRADO PREMIUM ================= */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center transform-gpu"
        >
          {/* Badge Adaptable */}
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="inline-flex items-center gap-2 rounded-full border border-[#274c77]/10 bg-[#274c77]/5 px-3 py-1 text-xs font-semibold text-[#274c77] dark:border-white/10 dark:bg-white/5 dark:text-[#a3cef1] backdrop-blur-xl shadow-inner"
          >
            <Sparkles size={14} />
            Validación Comercial & Confianza
          </motion.div>

          {/* Título */}
          <motion.h2
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] dark:text-white md:text-4xl lg:text-5xl"
          >
            Empresas en Crecimiento{" "}
            <span className="mt-1 block bg-gradient-to-r from-[#274c77] via-[#6096ba] to-[#a3cef1] bg-clip-text text-transparent">
              que Respaldan Nuestra Plataforma
            </span>
          </motion.h2>

          {/* Descripción */}
          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-dark-foreground/70"
          >
            Desde minimarkets locales hasta redes de distribución multiempresa. Optimizando operaciones en tiempo real
            día tras día.
          </motion.p>
        </motion.div>

        {/* ================= MARQUESINA INFINITA (INFINITE MARQUEE) ================= */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
          <motion.div
            className="flex w-max gap-12 pr-12 raw-marquee"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 28,
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo}-${index}`}
                className="flex items-center gap-3 text-slate-400 hover:text-slate-800 dark:text-white/30 dark:hover:text-white/80 transition-colors duration-300 select-none cursor-default py-2 group"
              >
                {/* Logo Estilizado */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/60 shadow-sm dark:bg-white/5 dark:border-white/5 dark:shadow-inner group-hover:border-[#6096ba]/40 dark:group-hover:border-white/20 transition-all">
                  <Building2 className="h-4 w-4 text-[#274c77] dark:text-[#6096ba] group-hover:text-[#6096ba] dark:group-hover:text-[#a3cef1] transition-colors" />
                </div>
                {/* Nombre de la Empresa */}
                <span className="text-base font-extrabold tracking-tight whitespace-nowrap">{logo}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= GALERÍA DE SECTORES (BENTO GRID VISUAL) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={smoothTransition}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full"
        >
          {SECTOR_GALLERY.map((sector, index) => (
            <motion.div
              key={index}
              whileHover={hoverLift}
              className="relative group h-64 w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 flex flex-col justify-end transform-gpu shadow-md dark:shadow-xl transition-all duration-300 dark:border-white/5 dark:bg-white/[0.01] hover:border-[#6096ba]/30 dark:hover:border-white/10 hover:shadow-lg"
            >
              {/* Imagen de Fondo Reutilizable con filtros duales */}
              <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="h-full w-full object-cover opacity-60 dark:opacity-35 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                  loading="lazy"
                />
                {/* Degradados adaptables para garantizar contraste de texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10 dark:from-[#020617] dark:via-[#020617]/80 dark:to-transparent" />
                <div className="absolute inset-0 bg-slate-100/10 dark:bg-dark/20 mix-blend-multiply" />
              </div>

              {/* Botón Flotante con Icono de Esquina */}
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 shadow-sm">
                <ArrowUpRight size={14} className="text-[#274c77] dark:text-[#a3cef1]" />
              </div>

              {/* Textos del Sector */}
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#274c77] dark:group-hover:text-[#a3cef1] transition-colors duration-200">
                  {sector.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-dark-foreground/60 group-hover:text-slate-800 dark:group-hover:text-dark-foreground/80 transition-colors duration-200">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
