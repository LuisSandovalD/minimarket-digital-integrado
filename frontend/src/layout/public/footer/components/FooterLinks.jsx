export default function FooterLinks({ title = "Navegación", links }) {
  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Título de la sección con contraste y jerarquía */}
      <h3 className="text-xs font-bold tracking-wider uppercase text-[#0f172a] dark:text-white/90">
        {title}
      </h3>

      {/* Lista lineal de navegación optimizada en cuadrícula fluida o fila adaptable */}
      <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6 text-sm font-medium text-slate-500 dark:text-[#cbd5e1]/60">
        {links?.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-block transition-all duration-200 transform-gpu hover:text-[#274c77] hover:translate-x-0.5 sm:hover:translate-x-0 sm:hover:-translate-y-0.5 dark:hover:text-[#a3cef1]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
