import { ModernButton } from "@/components/buttons";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { ArrowRight, LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// IMPORTAMOS LAS FUNCIONES DE SESIÓN
import {
  clearSession,
  getCompany,
  isAuthenticated,
} from "@/features/auth/services/session.service";

export default function NavbarActions({ setOpenLogin, setOpenRegister }) {
  const navigate = useNavigate();

  // Verificamos si el usuario está autenticado
  const isLogged = isAuthenticated();

  // Obtenemos la empresa. Si getCompany() devuelve un objeto, usamos su slug o id.
  const company = getCompany();
  const companySlug =
    typeof company === "object" ? company?.slug || company?.name : company;

  // Construimos la ruta base dinámica usando el parámetro idéntico a tu ruta privada (/:companySlug/dashboard)
  const dashboardPath = companySlug
    ? `/${companySlug}/dashboard`
    : "/dashboard";

  // Función para manejar el cierre de sesión de forma segura
  const handleLogout = () => {
    clearSession();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {/* ACTIONS */}
      <div className="hidden items-center gap-3 lg:flex">
        {isLogged ? (
          /* SI ESTÁ LOGUEADO: Muestra acceso al sistema y salir */
          <>
            <Link to={dashboardPath}>
              <ModernButton
                text="Acceder al sistema"
                icon={LayoutDashboard}
                variant="primary"
              />
            </Link>

            <ModernButton
              text=""
              icon={LogOut}
              variant="danger"
              onClick={handleLogout}
            />
          </>
        ) : (
          /* SI NO ESTÁ LOGUEADO: Muestra los botones clásicos de Auth */
          <>
            <ModernButton
              text="Iniciar Sesión"
              icon={LogIn}
              variant="ghost"
              onClick={() => {
                if (setOpenRegister) setOpenRegister(false);
                if (setOpenLogin) setOpenLogin(true);
              }}
            />

            <ModernButton
              text="Registrarse"
              icon={ArrowRight}
              variant="primary"
              onClick={() => {
                setOpenLogin(false);
                setOpenRegister(true);
              }}
            />
          </>
        )}

        {/* THEME */}
        <ThemeToggle />
      </div>
    </>
  );
}
