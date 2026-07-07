import logo from "@/assets/logos/minimarket_logo.svg";
import { Link } from "react-router-dom";

export default function NavbarBrand() {
  return (
    <Link
      to="/"
      aria-label="Ir al inicio"
      className="flex items-center transition-opacity hover:opacity-90"
    >
      <img
        src={logo}
        alt="Minimarket Digital Integrado"
        className="h-12 w-auto"
      />
    </Link>
  );
}
