export default function FooterBrand() {
  return (
    <div className="flex flex-col gap-4 max-w-md text-left">
      {/* Contenedor del Logo optimizado para cambios de contraste */}
      <div className="flex items-center gap-3.5">
        <img
          src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568897/minimarket_logo_noc7b3.svg"
          alt="Minimarket Digital Integrado"
          // Si el logo es oscuro por defecto, dark:invert-0 dark:brightness-200 o dark:invert te ayudará si requiere adaptación total
          className="h-12 w-auto select-none object-contain transition-all duration-300 transform-gpu dark:brightness-110 dark:contrast-115"
          loading="lazy"
        />
      </div>

      {/* Descripción con balance de contraste perfecto entre modos */}
      <p className="text-sm leading-relaxed text-slate-500 hover:text-slate-600 dark:text-[#cbd5e1]/70 dark:hover:text-[#cbd5e1]/90 transition-colors duration-200">
        Plataforma moderna para la gestión empresarial, inventario, ventas y operaciones avanzadas en tiempo real.
      </p>
    </div>
  );
}
