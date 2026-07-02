import { Navigate } from "react-router-dom";
import { getCompany } from "../services/session.service";
import { hasTierAccess } from "../utils/subscription"; // Asegúrate de ajustar la ruta relativa según tu proyecto

/**
 * Guardián de rutas que restringe el acceso según el plan de suscripción de la empresa.
 * * @param {string} requiredTier - El nivel mínimo requerido ("FREE", "BASIC", "PREMIUM")
 * @param {React.ReactNode} children - Componente o ruta protegida
 */
export default function SubscriptionGuard({ requiredTier, children }) {
  const company = getCompany();

  // Si no hay compañía en sesión, fallback seguro a "FREE"
  const currentTier = company?.subscriptionTier || "FREE";

  // Evaluamos usando la función centralizada de utilidades
  const hasAccess = hasTierAccess(currentTier, requiredTier);

  if (!hasAccess) {
    // Si la empresa tiene un slug asignado redirige a su dashboard, de lo contrario al home base
    const redirectPath = company?.slug
      ? `/${company.slug}/dashboard`
      : "/dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
