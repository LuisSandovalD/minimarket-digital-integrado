export default function FooterBottom() {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-medium text-slate-400 dark:text-slate-500 w-full transform-gpu">
      {/* Copyright de Marca */}
      <p className="transition-colors duration-200 hover:text-slate-500 dark:hover:text-slate-400">
        &copy; {new Date().getFullYear()} Minimarket Digital Integrado. Todos
        los derechos reservados.
      </p>

      {/* Enlaces Legales Fluyentes Opocionales (Consistencia Corporativa) */}
      <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
        <a
          href="#privacidad"
          className="hover:text-[#274c77] dark:hover:text-[#a3cef1] transition-colors duration-200"
        >
          Política de Privacidad
        </a>
        <span className="text-slate-200 dark:text-white/5">•</span>
        <a
          href="#terminos"
          className="hover:text-[#274c77] dark:hover:text-[#a3cef1] transition-colors duration-200"
        >
          Términos de Servicio
        </a>
      </div>
    </div>
  );
}
