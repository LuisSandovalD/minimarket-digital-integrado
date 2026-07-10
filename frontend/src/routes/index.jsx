import { Navigate } from "react-router-dom";
import { privateRoutes } from "./private.routes";
import { publicRoutes } from "./public.routes";

export const routes = [
  publicRoutes,
  privateRoutes,
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
