import { lazy } from "react";
import PublicLayout from "../layout/public/PublicLayout";
import { withSuspense } from "./withSuspense"; // Helper que crearemos abajo

const Home = lazy(() => import("../features/public/home/Home"));
const Features = lazy(() => import("../features/public/features/Features"));
const Inventory = lazy(() => import("../features/public/inventory/Inventory"));
const Pricing = lazy(() => import("../features/public/pricing/Pricing"));
const Modules = lazy(() => import("../features/public/modules/Modules"));
const Contact = lazy(() => import("../features/public/contact/Contact"));

export const publicRoutes = {
  element: <PublicLayout />,
  children: [
    { path: "/", element: withSuspense(Home) },
    { path: "/features", element: withSuspense(Features) },
    { path: "/inventory", element: withSuspense(Inventory) },
    { path: "/pricing", element: withSuspense(Pricing) },
    { path: "/modules", element: withSuspense(Modules) },
    { path: "/contact", element: withSuspense(Contact) },
  ],
};
