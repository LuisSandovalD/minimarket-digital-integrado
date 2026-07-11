import { navLinks } from "../navbar/constants/navLinks";
import FooterBottom from "./components/FooterBottom";
import FooterBrand from "./components/FooterBrand";
import FooterLinks from "./components/FooterLinks";
import FooterNewsletter from "./components/FooterNewsletter";
import FooterSocials from "./components/FooterSocials";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-transparent text-[#0f172a] dark:text-[#e7ecef] px-4 pt-24 pb-6 sm:px-6 md:px-8 lg:px-10 z-10">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-8">
        {/* Estructura Modular y Lineal */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-start gap-12 w-full">
          {/* SECCIÓN IZQUIERDA (Identidad y Redes) */}
          <div className="flex flex-col items-start gap-6 w-full max-w-sm">
            <FooterBrand />

            <div className="w-full border-t border-slate-200/40 my-1 dark:border-white/5" />

            <FooterSocials />
          </div>

          {/* SECCIÓN CENTRAL / DERECHA (Enlaces de Navegación del archivo único) */}
          <div className="flex-1 min-w-[240px]">
            {/* Llamamos directamente al componente pasándole la lista entera, sin .map adicional */}
            <FooterLinks title="Navegación" links={navLinks} />
          </div>

          {/* SECCIÓN BOLETÍN (Newsletter) */}
          <div className="w-full max-w-sm">
            <FooterNewsletter />
          </div>
        </div>

        {/* Separador inferior lineal */}
        <div className="mt-12 w-full border-t border-slate-200/60 dark:border-white/5" />

        {/* Cierre de Copyright y Legales */}
        <FooterBottom />
      </div>
    </footer>
  );
}
