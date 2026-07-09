import { Link } from "react-router-dom";

export default function NavbarBrand() {
  return (
    <Link
      to="/"
      aria-label="Ir al inicio"
      className="flex items-center transition-opacity hover:opacity-90"
    >
      <img
        src="https://res.cloudinary.com/dgaq5afjl/image/upload/v1783568897/minimarket_logo_noc7b3.svg"
        alt="Minimarket Digital Integrado"
        className="h-12 w-auto"
      />
    </Link>
  );
}
