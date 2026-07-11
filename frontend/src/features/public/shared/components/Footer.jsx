import { Link } from "react-router-dom";
import { Boxes, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS, BRAND } from "../constants/navigation.js";

const PRODUCT_LINKS = NAV_LINKS.filter((l) => l.to !== "/");

const RESOURCE_LINKS = [
  { label: "Centro de ayuda", to: "/contacto" },
  { label: "Documentacion", to: "/funcionalidades" },
  { label: "Estado del servicio", to: "/contacto" },
  { label: "Novedades", to: "/automatizaciones" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-dark text-dark-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Boxes className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold tracking-tight text-white">
                {BRAND.name}
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-dark-foreground/70">
              {BRAND.tagline} para inventarios, ventas, compras, sucursales y
              analitica empresarial.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Producto</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-dark-foreground/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Recursos</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-dark-foreground/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-2.5 text-sm text-dark-foreground/70">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                hola@nexora.app
              </li>
              <li className="flex items-center gap-2.5 text-sm text-dark-foreground/70">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                +51 987 654 321
              </li>
              <li className="flex items-center gap-2.5 text-sm text-dark-foreground/70">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                Lima, Peru
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-dark-foreground/60">
            {"\u00A9"} {new Date().getFullYear()} {BRAND.name}. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              to="/contacto"
              className="text-xs text-dark-foreground/60 hover:text-white"
            >
              Terminos
            </Link>
            <Link
              to="/contacto"
              className="text-xs text-dark-foreground/60 hover:text-white"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
