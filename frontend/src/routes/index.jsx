import { Navigate } from "react-router-dom";
import { privateRoutes } from "./private.routes";
import { publicRoutes } from "./public.routes";

export const routes = [
  // 1. Acoplamos todo el bloque de rutas públicas
  publicRoutes,

  // 2. Acoplamos todo el bloque de la app privada con sus guards
  privateRoutes,

  // 3. Comodín para páginas no encontradas (404 / Fallback)
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
